import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/core/Models/categoria.model';
import { Resultado } from 'src/app/core/Models/resultado.model';
import { CategoriaService } from 'src/app/core/services/categoria.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.container.html',
  styleUrls: ['./index.container.scss']
})
export class IndexContainer implements OnInit {
  categorias : Categoria[] = [];

  constructor(private categoriaService : CategoriaService) { }

  ngOnInit(): void {
    this.categoriaService.getObjects().subscribe(
      (result : Resultado<Categoria>) => this.categorias=result.data,
    )
  }

}
