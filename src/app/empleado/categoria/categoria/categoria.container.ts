import { DialogSpinnerComponent } from 'src/app/tools/components/dialog-spinner/dialog-spinner.component';
import { Component, OnInit } from '@angular/core';
import { PartialObserver } from 'rxjs';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

import { Resultado } from './../../../core/Models/resultado.model';
import { Categoria } from './../../../core/Models/categoria.model';
import { CategoriaService } from './../../../core/services/categoria.service';
import { FormCategoriaComponent } from './../components/form-categoria/form-categoria.component';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.container.html',
  styleUrls: ['./categoria.container.scss']
})
export class CategoriaContainer implements OnInit {
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
    complete: () => {this.cargandoDialogRef?.close()},
  }
  private detailObserver : PartialObserver<Categoria> = {
    next: () => {},
    error: () => {},
    complete: () => {},
  }
  private updateObserver : PartialObserver<Categoria> = {
    next: () => {},
    error: () => {},
    complete: () => {},
  }

  constructor(private categoriaService : CategoriaService,
    private formDialog : MatDialog) { }

  ngOnInit(): void {
    this.getCategorias(1)
  }

  getCategorias(pagina : PageEvent | number){
    this.cargandoDialogRef = this.formDialog.open(DialogSpinnerComponent);
    //obtener el numero de pagina segun el tipo del parametro
    const numeroDePagina = (typeof pagina === "number" ? pagina : pagina.pageIndex + 1)
    //obtener el tamano de pagina
    let pageSize = 10;
    if(typeof pagina !== "number") pageSize = pagina.pageSize;
    //obtener las categorias
    this.categoriaService.getObjects(numeroDePagina, pageSize).subscribe(this.getObserver);

  }

  //===metodos que manejan los dialogos===
  openForm(categoria? : Categoria){
    const dialogoFormRef = this.formDialog.open(
      FormCategoriaComponent,
      {data:categoria}//config dialog
    )
    dialogoFormRef.afterClosed().subscribe({
      //categoria obtenida del dialogo
      next: (categoriaDialogo?)=>{
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
              }
            })
          //si no esta, entonces hay que guardarlo
          } else {
            //post a la api
            this.categoriaService.postObject(categoriaDialogo).subscribe({
              //Meter la categoria que se creo, al arreglo de categorias de la respuesta
              next:(categoriaNueva : Categoria)=> this.respuesta?.data.push(categoriaNueva)
            })
          }
        }
      },
      error: ()=>{},
      complete: ()=>{}
    })
  }

}
