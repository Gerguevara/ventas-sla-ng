import { DetailEtiquetaComponent } from './../components/detail-etiqueta/detail-etiqueta.component';
import { DeleteEtiquetaComponent } from './../components/delete-etiqueta/delete-etiqueta.component';
import { FormEtiquetaComponent } from './../components/form-etiqueta/form-etiqueta.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PartialObserver } from 'rxjs';
import { DialogSpinnerComponent } from 'src/app/tools/components/dialog-spinner/dialog-spinner.component';
import { Etiqueta } from './../../../core/Models/etiqueta.model';
import { Resultado } from './../../../core/Models/resultado.model';
import { EtiquetaService } from './../../../core/services/etiqueta.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-etiqueta',
  templateUrl: './etiqueta.container.html',
  styleUrls: ['./etiqueta.container.scss']
})
export class EtiquetaContainer implements OnInit {
  @ViewChild('paginator') paginator!: MatPaginator;
  //objeto que almacenara la respuesta
  respuesta? : Resultado<Etiqueta> = undefined;
  //cantidad de datos
  dataLength : number = 0;
  //ref que almacena las acciones del dialogo loading
  cargandoDialogRef? : MatDialogRef<DialogSpinnerComponent> = undefined;
  
  //===observadores===
  private getObserver : PartialObserver<Resultado<Etiqueta>> = {
    next: (respuesta : Resultado<Etiqueta>) => {
      this.respuesta = respuesta;
      this.dataLength = respuesta.total;
    },
    error: () => {},
    complete: () => this.cargandoDialogRef?.close(),
  }
  private detailObserver : PartialObserver<Etiqueta> = {
    next: (etiqueta:Etiqueta) => {
      //abrir dialogo
      const dialogoDetalleRef = this.formDialog.open(
        //usando componente detalle
        DetailEtiquetaComponent,
        //config
        { data : etiqueta,
          autoFocus: false}
        );
        //luego de cerrar el dialogo, subscribirse
      dialogoDetalleRef.afterClosed().subscribe(
        {
          //la respuesta que reciba, debe ser un objeto con un valor 'editado'
          next: (respuesta: { editado: boolean }) => {
            //si del form se recibe que el usuario quiere editar
            if (respuesta?.editado)
              //abrir form
              this.openForm(etiqueta);
          },
          //caso de error
          error: () => {}
        }
      )    },
    error: () => {},
    complete: () => {},
  }
  private updateObserver : PartialObserver<Etiqueta> = {
    next: (etiqueta : Etiqueta) => this.openForm(etiqueta),
    error: () => {},
    complete: () => this.cargandoDialogRef?.close(),
  }
  
  //===constructor===
  constructor(
    private etiquetaService : EtiquetaService,
    private formDialog : MatDialog,
    private loadingDialog : MatDialog
  ) { }

  ngOnInit(): void {
    this.getEtiquetas(1)
  }

  //===crud===
  getEtiquetas(pagina : PageEvent | number){
    this.cargandoDialogRef = this.loadingDialog.open(DialogSpinnerComponent);
    //obtener el numero de pagina segun el tipo del parametro
    const numeroDePagina = (typeof pagina === "number" ? pagina : pagina.pageIndex + 1)
    //obtener el tamano de pagina
    let pageSize = 10;
    if(typeof pagina !== "number") pageSize = pagina.pageSize;
    //obtener las categorias
    this.etiquetaService.getObjects(numeroDePagina, pageSize).subscribe(this.getObserver);
  }

  //trae un producto
  detailEtiqueta(id: number): void {
    this.cargandoDialogRef = this.loadingDialog.open(DialogSpinnerComponent);
    //subscribirse al servicio que trae un objeto, usa el observador definido al inicio
    this.etiquetaService.getObject(id).subscribe(this.detailObserver);
  }

  updateEtiqueta(id:number){
    this.cargandoDialogRef = this.loadingDialog.open(DialogSpinnerComponent);
    this.etiquetaService.getObject(id).subscribe(this.updateObserver);
  }

  //elimina un etiqueta
  deleteEtiqueta(etiqueta: Etiqueta): void {
    this.openConfirmation(etiqueta);
  }

  //===metodos que manejan los dialogos===
  openForm(etiqueta? : Etiqueta){
    const dialogoFormRef = this.formDialog.open(
      FormEtiquetaComponent,
      {data:etiqueta}//config dialog
    )
    dialogoFormRef.afterClosed().subscribe({
      //etiqueta obtenida del dialogo
      next: (etiquetaDialogo? : Etiqueta)=>{
        //si la etiqueta viene
        if(etiquetaDialogo){
          //si ya existe
          if(etiquetaDialogo.id){
            //actualizarlo
            this.etiquetaService.updateObject(etiquetaDialogo).subscribe({
              //luego de actualizarlo
              next:(etiquetaActualizada : Etiqueta)=>{
                //obtener el indice
                const index = this.respuesta ? this.respuesta.data.findIndex(
                  //donde el id corresponda al de la etiqueta actualizada
                  (etiquetaABuscar : Etiqueta)=> etiquetaABuscar.id === etiquetaActualizada.id 
                //si el indice no esta, retornar -1
                ) : -1
                //si el objeto se encontro 
                if(index >= 0) {
                  //actualizar el arreglo de categorias en la respuesta
                  if(this.respuesta) this.respuesta.data[index] = etiquetaActualizada;
                }
              },
              complete:()=> this.getEtiquetas(this.paginator.pageIndex)
            })
          //si no esta, entonces hay que guardarlo
          } else {
            //post a la api
            this.etiquetaService.postObject(etiquetaDialogo).subscribe({
              //Meter la etiqueta que se creo, al arreglo de categorias de la respuesta
              next:(categoriaNueva : Etiqueta)=> this.respuesta?.data.push(categoriaNueva),
              complete:()=> this.getEtiquetas(this.paginator.pageIndex)
            })
          }
        }
      },
      error: ()=>{},
      complete: ()=>{}
    })
  }

  openConfirmation(etiqueta : Etiqueta){
    //abrir dialogo con componente de confirmacion de borrado de etiqueta
    const dialogoFormRef = this.formDialog.open(DeleteEtiquetaComponent, {
      data: etiqueta,
    });
    //subscribirse al observable obtenido de cerrar el dialogo
    dialogoFormRef.afterClosed().subscribe((id? : number) => {
        //si el id no es undefined
        if(id) {
          //subscribirse al servicio de eliminacion de etiqueta
          this.etiquetaService.deleteObject(id).subscribe(
            {
              //caso exito
              next: (response: HttpResponse<never>) => {
                //si el result existe
                if(this.respuesta){
                  //destructura results, de array result, en variable results
                  const { data } = this.respuesta;
                  //asigna a result.results, un arreglo tal que ninguno de sus elementos contiene id
                  this.respuesta.data = data.filter((etiqueta: Etiqueta) => etiqueta.id !== id);
                }
              },
              //caso error
              error: () => {},
              complete:()=> this.getEtiquetas(this.paginator.pageIndex)
            }
          )
        }
     });
    }

}
