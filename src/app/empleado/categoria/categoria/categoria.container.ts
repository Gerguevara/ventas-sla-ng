import { DeleteCategoriaComponent } from './../components/delete-categoria/delete-categoria.component';
import { DialogSpinnerComponent } from 'src/app/tools/components/dialog-spinner/dialog-spinner.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PartialObserver } from 'rxjs';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { Resultado } from './../../../core/Models/resultado.model';
import { Categoria } from './../../../core/Models/categoria.model';
import { CategoriaService } from './../../../core/services/categoria.service';
import { FormCategoriaComponent } from './../components/form-categoria/form-categoria.component';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.container.html',
  styleUrls: ['./categoria.container.scss']
})
export class CategoriaContainer implements OnInit {
  @ViewChild('paginator') paginator!: MatPaginator;
  //objeto que almacenara la respuesta
  respuesta? : Resultado<Categoria> = undefined;
  //cantidad de datos
  dataLength : number = 0;
  //ref que almacena las acciones del dialogo loading
  cargandoDialogRef? : MatDialogRef<DialogSpinnerComponent> = undefined;

  //===observadores===
  private getObserver : PartialObserver<Resultado<Categoria>> = {
    next: (respuesta : Resultado<Categoria>) => {
      this.respuesta = respuesta;
      this.dataLength = respuesta.total;
    },
    error: () => {},
    complete: () => this.cargandoDialogRef?.close(),
  }
  private detailObserver : PartialObserver<Categoria> = {
    next: () => {},
    error: () => {},
    complete: () => {},
  }
  private updateObserver : PartialObserver<Categoria> = {
    next: (categoria : Categoria) => this.openForm(categoria),
    error: () => {},
    complete: () => this.cargandoDialogRef?.close(),
  }

  constructor(private categoriaService : CategoriaService,
    private formDialog : MatDialog,
    private loadingDialog : MatDialog) { }

  ngOnInit(): void {
    this.getCategorias(1)
  }

  getCategorias(pagina : PageEvent | number){
    this.cargandoDialogRef = this.loadingDialog.open(DialogSpinnerComponent);
    //obtener el numero de pagina segun el tipo del parametro
    const numeroDePagina = (typeof pagina === "number" ? pagina : pagina.pageIndex + 1)
    //obtener el tamano de pagina
    let pageSize = 10;
    if(typeof pagina !== "number") pageSize = pagina.pageSize;
    //obtener las categorias
    this.categoriaService.getObjects(numeroDePagina, pageSize).subscribe(this.getObserver);
  }

  updateCategoria(id:number){
    this.cargandoDialogRef = this.loadingDialog.open(DialogSpinnerComponent);
    this.categoriaService.getObject(id).subscribe(this.updateObserver);
  }

  //elimina un categoria
  deleteCategoria(categoria: Categoria): void {
    this.openConfirmation(categoria);
  }

  //===metodos que manejan los dialogos===
  openForm(categoria? : Categoria){
    const dialogoFormRef = this.formDialog.open(
      FormCategoriaComponent,
      {data:categoria}//config dialog
    )
    dialogoFormRef.afterClosed().subscribe({
      //categoria obtenida del dialogo
      next: (categoriaDialogo? : Categoria)=>{
        //si la categoria viene
        if(categoriaDialogo){
          //si ya existe
          if(categoriaDialogo.id){
            //actualizarlo
            this.categoriaService.updateObject(categoriaDialogo).subscribe({
              //luego de actualizarlo
              next:(categoriaActualizada : Categoria)=>{
                //obtener el indice
                const index = this.respuesta ? this.respuesta.data.findIndex(
                  //donde el id corresponda al de la categoria actualizada
                  (categoriaABuscar : Categoria)=> categoriaABuscar.id === categoriaActualizada.id 
                //si el indice no esta, retornar -1
                ) : -1
                //si el objeto se encontro 
                if(index >= 0) {
                  //actualizar el arreglo de categorias en la respuesta
                  if(this.respuesta) this.respuesta.data[index] = categoriaActualizada;
                }
              },
              complete:()=> this.getCategorias(this.paginator.pageIndex)
            })
          //si no esta, entonces hay que guardarlo
          } else {
            //post a la api
            this.categoriaService.postObject(categoriaDialogo).subscribe({
              //Meter la categoria que se creo, al arreglo de categorias de la respuesta
              next:(categoriaNueva : Categoria)=> this.respuesta?.data.push(categoriaNueva),
              complete:()=> this.getCategorias(this.paginator.pageIndex)
            })
          }
        }
      },
      error: ()=>{},
      complete: ()=>{}
    })
  }
  openConfirmation(categoria : Categoria){
    //abrir dialogo con componente de confirmacion de borrado de categoria
    const dialogoFormRef = this.formDialog.open(DeleteCategoriaComponent, {
      data: categoria,
    });
    //subscribirse al observable obtenido de cerrar el dialogo
    dialogoFormRef.afterClosed().subscribe((id? : number) => {
        //si el id no es undefined
        if(id) {
          //subscribirse al servicio de eliminacion de categoria
          this.categoriaService.deleteObject(id).subscribe(
            {
              //caso exito
              next: (response: HttpResponse<never>) => {
                //si el result existe
                if(this.respuesta){
                  //destructura results, de array result, en variable results
                  const { data } = this.respuesta;
                  //asigna a result.results, un arreglo tal que ninguno de sus elementos contiene id
                  this.respuesta.data = data.filter((categoria: Categoria) => categoria.id !== id);
                }
              },
              //caso error
              error: () => {},
              complete:()=> this.getCategorias(this.paginator.pageIndex)
            }
          )
        }
     });
    }
}
