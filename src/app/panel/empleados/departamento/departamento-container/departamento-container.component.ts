import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Observable, PartialObserver } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { Departamento } from '@models/departamento.model';
import { Resultado } from '@models/resultados/resultado.model';
import { DepartamentoService } from '@global-services/departamento.service';

import { IData } from '@tool-interfaces/DataInterface';
import { DialogSpinnerComponent } from '@tool-components/dialog-spinner/dialog-spinner.component';
import { DepartamentoFormComponent } from '../components/departamento-form/departamento-form.component';
import { DepartamentoConfirmationDialogComponent } from '../components/departamento-confirmation-dialog/departamento-confirmation-dialog.component';
import { DepartamentoDetailsComponent } from '../components/departamento-details/departamento-details.component';

@Component({
  selector: 'app-departamento-container',
  templateUrl: './departamento-container.component.html',
  styleUrls: ['./departamento-container.component.scss']
})
export class DepartamentoContainerComponent implements OnInit {
  @ViewChild('paginator') paginator!: MatPaginator;
  //objeto que almacenara la respuesta
  respuesta?: Resultado<Departamento>;
  //cantidad de datos
  dataLength: number = 0;
  //ref que almacena las acciones del dialogo loading
  cargandoDialogRef? : MatDialogRef<DialogSpinnerComponent> = undefined;

  //===observadores===
  private getObserver : PartialObserver<Resultado<Departamento>> = {
    next: (respuesta : Resultado<Departamento>) => {
      this.respuesta = respuesta;
      this.dataLength = respuesta.total;
      console.log(this.respuesta);
    },
    error: () => {},
    complete: () => this.cargandoDialogRef?.close(),
  }

  constructor(
    private departamentoService: DepartamentoService,
    private formDialog : MatDialog,
    private loadingDialog : MatDialog,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.getDepartamentos(1);
  }


  getDepartamentos(pagina : PageEvent | number){
    this.cargandoDialogRef = this.loadingDialog.open(DialogSpinnerComponent);
    //obtener el numero de pagina segun el tipo del parametro
    const numeroDePagina = (typeof pagina === "number" ? pagina : pagina.pageIndex + 1)
    //obtener el tamano de pagina
    let pageSize = 10;
    if(typeof pagina !== "number") pageSize = pagina.pageSize;
    //obtener las categorias
    this.departamentoService.getObjects(numeroDePagina, pageSize).subscribe(this.getObserver);
  }

  getDepartamentosObservable(pagina : PageEvent | number): Observable<Resultado<Departamento>>{
    //obtener el numero de pagina segun el tipo del parametro
    const numeroDePagina = (typeof pagina === "number" ? pagina : pagina.pageIndex + 1)
    //obtener el tamano de pagina
    let pageSize = 10;
    if(typeof pagina !== "number") pageSize = pagina.pageSize;
    return this.departamentoService.getObjects(numeroDePagina, pageSize);
  }

  openDepartamentoDetail(departamento : Departamento){
    let dialogoFormRef = this.formDialog.open(
      DepartamentoDetailsComponent,
      {
        data:{
          data: departamento,
          paramsText: ['Nombre', 'Descripcion']
        },
        width: '75vw',
      }//config dialog
    );
  }

  //===metodos que manejan los dialogos===
  openForm(departamento? : Departamento){
    const dialogoFormRef = this.formDialog.open(
      DepartamentoFormComponent,
      {data:departamento}//config dialog
    )
    dialogoFormRef.afterClosed().subscribe({
      //departamento obtenida del dialogo
      next: (departamentoDialogo? : Departamento)=>{
        //si la departamento viene
        if(departamentoDialogo){
          //si ya existe
          if(departamentoDialogo.id){
            //actualizarlo
            this.departamentoService.updateObject(departamentoDialogo).subscribe({
              //luego de actualizarlo
              next:({resultado:boolean,mensaje:string})=>{
                //obtener el indice
                const index = this.respuesta ? this.respuesta.data.findIndex(
                  //donde el id corresponda al de la departamento actualizada
                  (departamentoABuscar : Departamento)=> departamentoABuscar.id === departamentoDialogo.id
                //si el indice no esta, retornar -1
                ) : -1
                //si el objeto se encontro
                if(index >= 0) {
                  //actualizar el arreglo de categorias en la respuesta
                  if(this.respuesta) this.respuesta.data[index] = departamentoDialogo;
                }
              },
              //complete:()=> this.getDepartamentos(this.paginator.pageIndex)
            })
          //si no esta, entonces hay que guardarlo
          } else {
            //post a la api
            this.departamentoService.postObject(departamentoDialogo).subscribe({
              //Meter la departamento que se creo, al arreglo de categorias de la respuesta
              next:(response:any)=> {
                this.snackBar.open(response.mensaje, 'Cerrar',{duration: 3000});

              },
              complete:()=> {
                if(this.paginator.hasNextPage())
                  this.paginator.lastPage();
                else
                  this.getDepartamentos(this.respuesta!.last_page);
              }
            });
          }
        }
      },
      error: ()=>{},
      complete: ()=>{}
    })
  }

  openConfirmation(departamento : Departamento){
    const dialogText = `Se procederá a eliminar el departamento: `;
    let data: IData<Departamento> = {data: departamento, paramsText: [dialogText]} as IData<Departamento>;
    //abrir dialogo con componente de confirmacion de borrado de departamento
    const dialogoFormRef = this.formDialog.open(DepartamentoConfirmationDialogComponent, {
      data: data,
    });
    //subscribirse al observable obtenido de cerrar el dialogo
    dialogoFormRef.afterClosed().subscribe((id? : number) => {
        //si el id no es undefined
        if(id) {
          //subscribirse al servicio de eliminacion de departamento
          this.departamentoService.deleteObject(id).subscribe(
            {
              //caso exito
              next: (response: HttpResponse<never>) => {
                //si el result existe
                if(this.respuesta){
                  //destructura results, de array result, en variable results
                  const { data } = this.respuesta;
                  //asigna a result.results, un arreglo tal que ninguno de sus elementos contiene id
                  this.respuesta.data = data.filter((departamento: Departamento) => departamento.id !== id);
                }
              },
              //caso error
              error: () => {},
              complete:()=> this.getDepartamentos(this.paginator.pageIndex)
            }
          )
        }
     });
    }

}
