import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Departamento } from '@models/departamento.model';
import { Data } from '@tools/models/Data';

@Component({
  selector: 'app-departamento-confirmation-dialog',
  templateUrl: './departamento-confirmation-dialog.component.html',
  styleUrls: ['./departamento-confirmation-dialog.component.scss']
})
export class DepartamentoConfirmationDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public context : Data<Departamento>) { }

  ngOnInit(): void {
  }

}
