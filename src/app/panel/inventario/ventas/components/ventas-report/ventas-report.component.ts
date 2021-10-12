import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { VentasService } from '../../../../../core/services/ventas.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogSpinnerComponent } from '../../../../../tools/components/dialog-spinner/dialog-spinner.component';
import { formatDate } from '@angular/common';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'sla-ventas-report',
  templateUrl: './ventas-report.component.html',
  styleUrls: ['./ventas-report.component.scss']
})
export class VentasReportComponent implements OnInit {

  productosVendidosForm!: FormGroup;

  listaProductos: any;
  imagen: any;
  baseUrl = environment.baseApiUrl;

  constructor( private ventasService: VentasService, private formBuilder: FormBuilder,
               private dialog: MatDialog,
               @Inject(LOCALE_ID) public locale: string ) {
    this.productosVendidosForm = this.formBuilder.group({
      cantidad: [3, Validators.required],
      fecha: ['']
    });
  }

  ngOnInit(): void {
    this.ventasService.obtenerMasVendidos(3).subscribe((response: any) => {
      this.listaProductos = response;
    }, (error: any) => {
      console.log(error);
    });
  }

  obtenerProductos(): void {
    this.dialog.open( DialogSpinnerComponent );
    const cantidad = this.productosVendidosForm.get('cantidad')?.value;
    let date = this.productosVendidosForm.get('fecha')?.value;
    if ( date ) {
      date = formatDate( date, 'yyyy-MM-dd', this.locale );
    }
    this.ventasService.obtenerMasVendidos(cantidad, date).subscribe((response: any) => {
      this.listaProductos = response;
      this.dialog.closeAll();
    }, (error: any) => {
      console.log(error);
      this.dialog.closeAll();
    });
  }

  descargarPdf(): void {
    this.dialog.open( DialogSpinnerComponent );
    const cantidad = this.productosVendidosForm.get('cantidad')?.value;
    let date = this.productosVendidosForm.get('fecha')?.value;
    if ( date ) {
      date = formatDate( date, 'yyyy-MM-dd', this.locale );
    }
    this.ventasService.obtenerReportePdf(cantidad, date).subscribe((response: any) => {
      const file = new Blob([response], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      this.dialog.closeAll();
    }, (error: any) => {
      console.log(error);
      this.dialog.closeAll();
    });
  }

}
