import { Component, OnInit, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PagoService } from '../../../../core/services/pago.service';
import { environment } from '../../../../../environments/environment';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogSpinnerComponent } from '../../../../tools/components/dialog-spinner/dialog-spinner.component';

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

  dialogRef: any;

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
  /* ----------------------------------------------------------------------------------------- */
  get nombresTarjetaNoValido(): boolean | undefined {
    return this.pagoForm.get('nombres')?.invalid && this.pagoForm.get('nombres')?.touched;
  }
  get apellidosTarjetaNoValido(): boolean | undefined {
    return this.pagoForm.get('apellidos')?.invalid && this.pagoForm.get('apellidos')?.touched;
  }
  get numeroTarjetaNoValido(): boolean | undefined {
    return this.pagoForm.get('tarjeta')?.invalid && this.pagoForm.get('tarjeta')?.touched;
  }
  get mesTarjetaNoValido(): boolean | undefined {
    return this.pagoForm.get('mes')?.invalid && this.pagoForm.get('mes')?.touched;
  }
  get anioTarjetaNoValido(): boolean | undefined {
    return this.pagoForm.get('anio')?.invalid && this.pagoForm.get('anio')?.touched;
  }
  get cvvTarjetaNoValido(): boolean | undefined {
    return this.pagoForm.get('cvv')?.invalid && this.pagoForm.get('cvv')?.touched;
  }
  get duiNoValido(): boolean | undefined {
    return this.pagoForm.get('dui')?.invalid && this.pagoForm.get('dui')?.touched;
  }
  get nitNoValido(): boolean | undefined {
    return this.pagoForm.get('nit')?.invalid && this.pagoForm.get('nit')?.touched;
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
              private router: Router,
              private snackBar: MatSnackBar,
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
                  metodo: ['pago_en_linea', Validators.required],
                  nombres: ['', Validators.required],
                  apellidos: ['', Validators.required],
                  mes: ['', [Validators.required, Validators.min(1), Validators.max(12), Validators.maxLength(2)]],
                  anio: ['', [Validators.required, Validators.min(1), Validators.max(99), Validators.maxLength(2)]],
                  tarjeta: ['', [Validators.required, Validators.pattern(environment.patterns.tarjetaBanco)]],
                  cvv: ['', [Validators.required, Validators.pattern(environment.patterns.cvv)]],
                  dui: ['', [Validators.required, Validators.pattern(environment.patterns.dui)]],
                  nit: ['', [Validators.required, Validators.pattern(environment.patterns.nit)]],
                });
                this.municipiosArray = this.pagoService.municipios;
                this.selectMunicipiosArray = this.municipiosArray.filter((item: any) => item.departamento === 'San Salvador');
              }

  ngAfterViewInit(): void {
    this.dialogRef = this.dialog.open(this.formPagoDialogContent, { width: '70vw' });
    this.dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.envioForm.get('departamento')?.valueChanges.subscribe((value: string) => {
      this.selectMunicipiosArray = this.municipiosArray.filter((item: any) => item.departamento === value);
    });
  }

  enviarDatos(): void {
    const spinnerRef = this.dialog.open( DialogSpinnerComponent );
    const infoEnvio = this.envioForm.value;
    const infoPago = this.pagoForm.value;
    this.pagoService.enviarDatosPago(infoEnvio, infoPago).subscribe((response: any) => {
      console.log(response);
      this.snackBar.open('Su compra ha sido completada exitósamente', 'Cerrar', { duration: 5000 });
      spinnerRef.close();
      this.cerrarDialogo();
    }, (error: any) => {
      console.log(error);
      this.snackBar.open('Ah ocurrido un error!', 'Cerrar', { duration: 5000 });
      spinnerRef.close();
    });
  }

  cerrarDialogo(): void {
    this.dialogRef.close();
    this.router.navigate(['/shopping-cart']);
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
    } else if (this.envioForm.get('email')?.hasError('email')) {
      return 'Correo electrónico no válido';
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

  getErrorMunicipioMessage(): string {
    if (this.envioForm.get('municipio')?.hasError('required')) {
      return 'Debe seleccionar un municipio';
    }
    else {
      return '';
    }
  }
  /*---------------------------------------------------------------------------------------------*/
  getErrorNombresTarjetaMessage(): string {
    if (this.pagoForm.get('nombres')?.hasError('required')) {
      return 'Debe ingresar sus nombres';
    }
    else {
      return '';
    }
  }

  getErrorApellidosTarjetaMessage(): string {
    if (this.pagoForm.get('apellidos')?.hasError('required')) {
      return 'Debe ingresar sus apellidos';
    }
    else {
      return '';
    }
  }

  getErrorTarjetaMessage(): string {
    if (this.pagoForm.get('tarjeta')?.hasError('required')) {
      return 'Debe ingresar su número de tarjeta';
    } else if (this.pagoForm.get('tarjeta')?.hasError('pattern')) {
      return 'Número de tarjeta no válido';
    }
    else {
      return '';
    }
  }

  getErrorMesTarjetaMessage(): string {
    if (this.pagoForm.get('mes')?.hasError('required')) {
      return 'Debe ingresar el mes de vencimiento';
    } else if (this.pagoForm.get('mes')?.hasError('maxLength') || this.pagoForm.get('mes')?.hasError('max')) {
      return 'Mes no válido';
    }
    else {
      return '';
    }
  }

  getErrorAnioTarjetaMessage(): string {
    if (this.pagoForm.get('anio')?.hasError('required') || this.pagoForm.get('anio')?.hasError('max')) {
      return 'Debe ingresar el año de vencimiento';
    } else if (this.pagoForm.get('anio')?.hasError('maxLength')) {
      return 'Año no válido';
    }
    else {
      return '';
    }
  }

  getErrorCodigoTarjetaMessage(): string {
    if (this.pagoForm.get('cvv')?.hasError('required')) {
      return 'Debe ingresar el código de seguirdad';
    } else if (this.pagoForm.get('cvv')?.hasError('pattern')) {
      return 'Código no válido';
    }
    else {
      return '';
    }
  }

  getErrorDuiMessage(): string {
    if (this.pagoForm.get('dui')?.hasError('required')) {
      return 'Debe ingresar su documento de identidad';
    } else if (this.pagoForm.get('dui')?.hasError('pattern')) {
      return 'Número de DUI no válido';
    }
    else {
      return '';
    }
  }

  getErrorNitMessage(): string {
    if (this.pagoForm.get('nit')?.hasError('required')) {
      return 'Debe ingresar su NIT';
    } else if (this.pagoForm.get('nit')?.hasError('pattern')) {
      return 'Número de NIT no válido';
    }
    else {
      return '';
    }
  }

}
