import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Departamento } from 'src/app/core/Models/departamento.model';
import { IData } from 'src/app/tools/Interfaces/DataInterface';

@Component({
  selector: 'app-departamento-confirmation-dialog',
  templateUrl: './departamento-confirmation-dialog.component.html',
  styleUrls: ['./departamento-confirmation-dialog.component.scss']
})
export class DepartamentoConfirmationDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public context : IData<Departamento>) { }

  ngOnInit(): void {
  }

}
