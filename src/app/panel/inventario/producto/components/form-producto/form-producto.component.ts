import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormProductoContainerComponent } from './components/form-producto-container/form-producto-container.component';
import { ProductoService } from '../../../../../core/services/producto.service';
import { Producto } from '@core/models/producto.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.scss'],
})
export class FormProductoComponent implements OnInit {

  constructor( private dialog: MatDialog,
               private router: Router,
               private productoService: ProductoService ) {
  }

  ngOnInit(): void {
    const data = this.productoService.productoChange;
    if ( data ) {
      this.dialog.open( FormProductoContainerComponent, { width: '80vw' } );
    } else {
      this.router.navigate(['/panel/inventario/productos']);
    }
  }

}
