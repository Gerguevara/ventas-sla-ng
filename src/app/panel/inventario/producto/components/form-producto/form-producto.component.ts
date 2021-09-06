import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormProductoContainerComponent } from './components/form-producto-container/form-producto-container.component';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.scss'],
})
export class FormProductoComponent implements OnInit {

  constructor( private dialog: MatDialog ) {
    this.dialog.open( FormProductoContainerComponent, { width: '80vw' } );
  }

  ngOnInit(): void { }

}
