import { Categoria } from 'src/app/core/Models/categoria.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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
