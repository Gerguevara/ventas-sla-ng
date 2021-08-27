import { FormControl } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { PartialObserver } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';

import { Rol } from '@models/rol.model';
import { PerfilEmpleado } from '@models/perfil.empleado.model';
import { Resultado } from '@models/resultados/resultado.model';
import { ResultadoEmpleado } from '@models/resultados/resultado-empleado.model';

import { EmpleadoService } from '@global-services/empleado.service';
import { RolesService } from '@global-services/roles.service';

import { EmpleadoDetailComponent } from '../empleado-detail/empleado-detail.component';
import { EmpleadoConfirmationDialogComponent } from './../empleado-confirmation-dialog/empleado-confirmation-dialog.component';
import { MatSelect } from '@angular/material/select';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatFormField } from '@angular/material/form-field';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-empleado-index',
  templateUrl: './empleado-index.component.html',
  styleUrls: ['./empleado-index.component.scss']
})
export class EmpleadoIndexComponent implements OnInit {
  empleados: PerfilEmpleado[] = [];
  roles: Rol[] = [];
  @ViewChild('search') search!: MatInput;
  @ViewChild('filter') filter!: MatSelect;
  @ViewChild('paginator') paginator!: MatPaginator;
  currentPage: number = 0;
  currentPageSize: number = 0;
  dataLength : number = 0;
  searching: boolean = false;
  filtering: boolean = false;
  searchingValue: string = '';

  listObserver: PartialObserver<Resultado<PerfilEmpleado>> = {
    next:(resultado: Resultado<PerfilEmpleado>)=>{
      this.empleados = resultado.data;
      this.dataLength = resultado.total;
    },
    error: (error: any)=>{
      console.error('error occurred retrieving empleados, please check log: ');
      console.error(error);
    },
  }

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
    private rolesService: RolesService,
    private formDialog : MatDialog,
    private loadingDialog : MatDialog,
    private changeDetectorRefs: ChangeDetectorRef
    ) {
  }

  ngOnInit(): void {
    this.getEmpleados(1);
    this.rolesService.getObjects(0, 0, undefined, true).subscribe({
      next: (result: Resultado<Rol>)=>{
        this.roles = result.data;
      }
    })
  }

  ngAfterViewInit(){
    this.filter.optionSelectionChanges.subscribe({
      next: (change: MatOptionSelectionChange)=> {
        const value = (change.source.value);
        if(value){
          if(typeof value === 'string'){
            //caso en el que solo se busca empleados
            this.empleadoService.searchEmpleados(this.searchingValue, this.currentPage, this.currentPageSize).subscribe(this.listObserver);
          } else {
            this.filtering = true;
            if(this.searching){
              //caso cuando se filtra y busca
              this.empleadoService.getEmpleadosByRole(value.id,this.searchingValue,this.currentPage,this.currentPage).subscribe(this.listObserver);
            } else {
              //caso cuando solo se filtra
              this.empleadoService.getEmpleadosByRole(value.id,undefined,this.currentPage,this.currentPageSize).subscribe(this.listObserver);
            }
          }
        } else {
          this.filtering = false;
        }
      }
    })
  }

  getEmpleados(pagina : PageEvent | number){
    //obtener el numero de pagina segun el tipo del parametro
    const numeroDePagina = (typeof pagina === "number" ? pagina : pagina.pageIndex + 1)
    //obtener el tamano de pagina
    let pageSize = 10;
    if(typeof pagina !== "number") {
      pageSize = pagina.pageSize;
      this.currentPage = pagina.pageIndex;
    } else {
      this.currentPage = pagina;
    }
    this.currentPageSize = pageSize
    //obtener las categorias
    this.empleadoService.getEmpleados(numeroDePagina, pageSize).subscribe(this.listObserver);
  }

  filterEmpleados(target: EventTarget | null){
    if(target) {
      const value = (target as HTMLInputElement).value;
      if(value){
        this.searching=true;
        this.searchingValue = value;
        if(this.filtering){
          //caso en el que se busca y filtran empleados
          this.empleadoService.getEmpleadosByRole(this.filter.value.id,value,this.currentPage, this.currentPageSize).subscribe(this.listObserver);

        } else {
          //caso en el que solo se busca empleados
          this.empleadoService.searchEmpleados(value, this.currentPage, this.currentPageSize).subscribe(this.listObserver);
        }
      } else {
        this.searching=false;
        this.searchingValue='';
      }
    }
  }

  empleadoView(id: number){
    this.empleadoService.getObject(id).subscribe(this.viewObserver);
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
    dialogoDetalleRef.componentInstance.empleadoEdited.subscribe({
        next: (empleado: PerfilEmpleado) => {
          const index = this.empleados.findIndex((empleadoBuscar:PerfilEmpleado)=>empleadoBuscar.id == empleado.id);
          this.empleados[index]=empleado as PerfilEmpleado;
          this.getEmpleados(this.paginator.pageIndex + 1);
        },
        //caso de error
        error: (error:any) => {console.error(error)}
    });
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
