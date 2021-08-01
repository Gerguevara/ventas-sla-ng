import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categoria } from '@models/categoria.model';

@Component({
  selector: 'app-delete-categoria',
  templateUrl: './delete-categoria.component.html',
  styleUrls: ['./delete-categoria.component.scss']
})
export class DeleteCategoriaComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public categoria : Categoria) { }

  ngOnInit(): void {
  }

}
