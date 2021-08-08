import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LineaPlanilla } from '@core/Models/linea.planilla.model';

@Component({
  selector: 'app-planillas-form',
  templateUrl: './planillas-form.component.html',
  styleUrls: ['./planillas-form.component.scss']
})
export class PlanillasFormComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<PlanillasFormComponent>,
               @Inject(MAT_DIALOG_DATA) public planilla: LineaPlanilla, ) { }

  ngOnInit(): void {
  }

}
