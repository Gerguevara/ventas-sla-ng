import { EmpleadoConfirmationDialogComponent } from './../empleado-confirmation-dialog/empleado-confirmation-dialog.component';
import { ResultadoEmpleado } from '@core/models/resultados/resultado-empleado.model';
import { map, startWith } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Observable, of, PartialObserver } from 'rxjs';
import { Resultado } from '@models/resultados/resultado.model';
import { PerfilEmpleado } from '@models/perfil.empleado.model';
import { EmpleadoService } from '@global-services/empleado.service';
import { MatDialog } from '@angular/material/dialog';
import { EmpleadoDetailComponent } from '../empleado-detail/empleado-detail.component';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-empleado-index',
  templateUrl: './empleado-index.component.html',
  styleUrls: ['./empleado-index.component.scss']
})
export class EmpleadoIndexComponent implements OnInit {
  empleados: PerfilEmpleado[] = [];

  viewObserver: PartialObserver<PerfilEmpleado> ={
    next:(resultado: PerfilEmpleado)=>{
      this.openViewDialog(resultado);
    },
    error: ()=>console.log('couldnt retrieve empleado'),
  }

  updateObserver: PartialObserver<{ resultado: boolean; mensaje: string; }> = {
    next:(resultado: { resultado: boolean; mensaje: string; })=>{
    },
    error: ()=>console.log('couldnt update empleado'),
  }

  constructor(
    private empleadoService: EmpleadoService,
    private formDialog : MatDialog,
    private loadingDialog : MatDialog
    ) {
  }

  ngOnInit(): void {
    this.empleadoService.getObjects().subscribe({
      next:(resultado: Resultado<PerfilEmpleado>)=>{
        this.empleados = resultado.data;
      },
      error: (error: any)=>{
        console.error('error occurred retrieving empleados, please check log: ');
        console.error(error);
      }
    })
  }

  empleadoView(id: number){
    this.empleadoService.getEmpleado(id).subscribe(this.viewObserver);
  }

  empleadoUpdate(empleado: PerfilEmpleado){
    this.empleadoService.updateObject(empleado).subscribe(this.updateObserver);
  }

  empleadoDelete(empleado: PerfilEmpleado){
    this.openConfirmationDialog(empleado);
  }

  openViewDialog(empleado: PerfilEmpleado){
    //abrir dialogo
    const dialogoDetalleRef = this.formDialog.open(
      //usando componente detalle
      EmpleadoDetailComponent,
      //config
      {
        data: empleado,
        autoFocus: false
      }
    );
      //luego de cerrar el dialogo, subscribirse
    dialogoDetalleRef.afterClosed().subscribe(
      {
        //la respuesta que reciba, debe ser un booleano como parametro 'editado'
        next: (respuesta: { editado: boolean }) => {
          //si del form se recibe que el usuario quiere editar
          if (respuesta?.editado)
            //abrir form
            this.openForm(empleado);
        },
        //caso de error
        error: () => {}
      }
    )
  }

  openForm(empleado?: PerfilEmpleado){
    //abrir dialogo
    const dialogoDetalleRef = this.formDialog.open(
      //usando componente detalle
      EmpleadoDetailComponent,
      //config
      {
        data: empleado,
        autoFocus: false
      }
    );
      //luego de cerrar el dialogo, subscribirse
    dialogoDetalleRef.afterClosed().subscribe(
      {
        //la respuesta que reciba, debe ser un booleano como parametro 'editado'
        next: (respuesta?: ResultadoEmpleado) => {
          //si del form se recibe que el usuario quiere editar
          if (respuesta)
            //abrir form
            this.openForm(empleado);
        },
        //caso de error
        error: () => {}
      }
    )

  }

  openConfirmationDialog(empleado: PerfilEmpleado){
    //abrir dialogo con componente de confirmacion de borrado de categoria
    const dialogoFormRef = this.formDialog.open(EmpleadoConfirmationDialogComponent, {
      data: empleado,
    });
    //subscribirse al observable obtenido de cerrar el dialogo
    dialogoFormRef.afterClosed().subscribe((id? : number) => {
        //si el id no es undefined
        if(id) {
          //subscribirse al servicio de eliminacion de categoria
          this.empleadoService.deleteObject(id).subscribe(
            {
              //caso exito
              next: (response: HttpResponse<never>) => {
                //si el result existe
                if(this.empleados){
                  //asigna a result.results, un arreglo tal que ninguno de sus elementos contiene id
                  this.empleados = this.empleados.filter((empleado: PerfilEmpleado) => empleado.id !== id);
                }
              },
              //caso error
              error: () => {},
              complete:()=> {},
            }
          )
        }
     });
  }

}
