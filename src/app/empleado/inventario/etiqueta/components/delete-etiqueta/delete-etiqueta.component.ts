import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Etiqueta } from '@models/etiqueta.model';

@Component({
  selector: 'app-delete-etiqueta',
  templateUrl: './delete-etiqueta.component.html',
  styleUrls: ['./delete-etiqueta.component.scss']
})
export class DeleteEtiquetaComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public etiqueta : Etiqueta) { }

  ngOnInit(): void {
  }

}
