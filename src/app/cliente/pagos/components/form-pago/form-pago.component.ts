import { Component, OnInit, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'sla-form-pago',
  templateUrl: './form-pago.component.html',
  styleUrls: ['./form-pago.component.scss']
})
export class FormPagoComponent implements OnInit, AfterViewInit {

  @ViewChild('formPago', { read: TemplateRef }) formPagoDialogContent!: TemplateRef<any>;

  formPago!: FormGroup;

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
    'Son Sonate',
    'Usulután',
  ];

  constructor(private dialog: MatDialog,
              private formBuilder: FormBuilder ) {
                this.formPago = this.formBuilder.group({
                });
              }

  ngAfterViewInit(): void {
    this.dialog.open(this.formPagoDialogContent, { width: '70vw' });
  }

  ngOnInit(): void {
  }

}
