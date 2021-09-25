import { Component, OnInit, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PagoService } from '../../../../core/services/pago.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'sla-form-pago',
  templateUrl: './form-pago.component.html',
  styleUrls: ['./form-pago.component.scss']
})
export class FormPagoComponent implements OnInit, AfterViewInit {

  @ViewChild('formPago', { read: TemplateRef }) formPagoDialogContent!: TemplateRef<any>;

  envioForm!: FormGroup;
  pagoForm!: FormGroup;

  municipiosArray!: any[];
  selectMunicipiosArray!: any[];

  // getters para validación de controles
  get nombresNoValido(): boolean | undefined {
    return this.envioForm.get('nombres')?.invalid && this.envioForm.get('nombres')?.touched;
  }
  get apellidosNoValido(): boolean | undefined {
    return this.envioForm.get('apellidos')?.invalid && this.envioForm.get('apellidos')?.touched;
  }
  get telefonoNoValido(): boolean | undefined {
    return this.envioForm.get('telefono')?.invalid && this.envioForm.get('telefono')?.touched;
  }
  get emailNoValido(): boolean | undefined {
    return this.envioForm.get('email')?.invalid && this.envioForm.get('email')?.touched;
  }
  get municipioNoValido(): boolean | undefined {
    return this.envioForm.get('municipio')?.invalid && this.envioForm.get('municipio')?.touched;
  }
  get direccionNoValido(): boolean | undefined {
    return this.envioForm.get('direccion')?.invalid && this.envioForm.get('email')?.touched;
  }

  departamentos = [
    'Ahuachapán',
    'Cabañas',
    'Chalatenango',
    'Cuscatlán',
    'La Libertad',
    'La Paz',
    'La Unión',
    'Morazán',
    'San Miguel',
    'San Salvador',
    'San Vicente',
    'Santa Ana',
    'Sonsonate',
    'Usulután',
  ];

  constructor(private dialog: MatDialog,
              private formBuilder: FormBuilder,
              private pagoService: PagoService ) {
                this.envioForm = this.formBuilder.group({
                  departamento: ['San Salvador', Validators.required],
                  municipio: ['San Salvador', Validators.required],
                  direccion: ['', Validators.required],
                  nombres: ['', Validators.required],
                  apellidos: ['', Validators.required],
                  telefono: ['', [Validators.required, Validators.pattern(environment.patterns.phoneNumber)]],
                  email: ['', Validators.required],
                });
                this.pagoForm = this.formBuilder.group({
                });
                this.municipiosArray = this.pagoService.municipios;
                this.selectMunicipiosArray = this.municipiosArray.filter((item: any) => item.departamento === 'San Salvador');
              }

  ngAfterViewInit(): void {
    this.dialog.open(this.formPagoDialogContent, { width: '70vw' });
  }

  ngOnInit(): void {
    this.envioForm.get('departamento')?.valueChanges.subscribe((value: string) => {
      this.selectMunicipiosArray = this.municipiosArray.filter((item: any) => item.departamento === value);
    });
  }

  // Mensajes de error para validaciones
  getErrorNombresMessage(): string {
    if (this.envioForm.get('nombres')?.hasError('required')) {
      return 'Debe ingresar sus nombres';
    }
    else {
      return '';
    }
  }

  getErrorApellidosMessage(): string {
    if (this.envioForm.get('apellidos')?.hasError('required')) {
      return 'Debe ingresar sus apellidos';
    }
    else {
      return '';
    }
  }

  getErrorTelefonoMessage(): string {
    if (this.envioForm.get('telefono')?.hasError('required')) {
      return 'Debe ingresar un número telefónico';
    } else if (this.envioForm.get('telefono')?.hasError('pattern')) {
      return 'Debe ingresar un número válido';
    }
    else {
      return '';
    }
  }

  getErrorEmailMessage(): string {
    if (this.envioForm.get('email')?.hasError('required')) {
      return 'Debe ingresar un correo electrónico';
    }
    else {
      return '';
    }
  }

  getErrorDireccionMessage(): string {
    if (this.envioForm.get('direccion')?.hasError('required')) {
      return 'Debe ingresar una dirección de entrega';
    }
    else {
      return '';
    }
  }

}
