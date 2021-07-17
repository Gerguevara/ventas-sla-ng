import { DepartamentoFormComponent } from './../components/departamento-form/departamento-form.component';
import { DepartamentoService } from './../../../../core/services/departamento.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Departamento } from 'src/app/core/Models/departamento.model';
import { Resultado } from 'src/app/core/Models/resultado.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { DialogSpinnerComponent } from 'src/app/tools/components/dialog-spinner/dialog-spinner.component';
import { Observable, PartialObserver } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  //===metodos que manejan los dialogos===
  openForm(departamento? : Departamento){
    const dialogoFormRef = this.formDialog.open(
      DepartamentoFormComponent,
      {data:departamento}//config dialog
    )
    dialogoFormRef.afterClosed().subscribe({
      //categoria obtenida del dialogo
      next: (departamentoDialogo? : Departamento)=>{
        //si la categoria viene
        if(departamentoDialogo){
          //si ya existe
          if(departamentoDialogo.id){
            //actualizarlo
            this.departamentoService.updateObject(departamentoDialogo).subscribe({
              //luego de actualizarlo
              next:(departamentoActualizado : Departamento)=>{
                //obtener el indice
                const index = this.respuesta ? this.respuesta.data.findIndex(
                  //donde el id corresponda al de la categoria actualizada
                  (departamentoABuscar : Departamento)=> departamentoABuscar.id === departamentoActualizado.id
                //si el indice no esta, retornar -1
                ) : -1
                //si el objeto se encontro
                if(index >= 0) {
                  //actualizar el arreglo de categorias en la respuesta
                  if(this.respuesta) this.respuesta.data[index] = departamentoActualizado;
                }
              },
              //complete:()=> this.getDepartamentos(this.paginator.pageIndex)
            })
          //si no esta, entonces hay que guardarlo
          } else {
            //post a la api
            this.departamentoService.postObject(departamentoDialogo).subscribe({
              //Meter la categoria que se creo, al arreglo de categorias de la respuesta
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
}
