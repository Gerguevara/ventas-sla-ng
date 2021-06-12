import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-spinner',
  templateUrl: './dialog-spinner.component.html',
  styleUrls: ['./dialog-spinner.component.scss']
})
export class DialogSpinnerComponent implements OnInit {

  constructor( private dialogRef: MatDialogRef<DialogSpinnerComponent> ) {
    // Evitamos que el dialogo del spinner pueda ser cerrado al hacer click fuera de el
    this.dialogRef.disableClose = true;
  }

  ngOnInit(): void {
  }

}
