import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Categoria } from 'src/app/core/models/categoria.model';
import { ResultadoIndex } from 'src/app/core/models/resultados/resultado-index.model';

@Component({
  selector: 'app-index',
  templateUrl: './index.container.html',
  styleUrls: ['./index.container.scss']
})
export class IndexContainer implements OnInit {
  categorias? : Set<Categoria>;
  categoriasRemover? : Set<Categoria>;
  results! : ResultadoIndex[];

  constructor(
    private route: ActivatedRoute,
    ) {
    this.route.data.subscribe(
      {
        next: (response: any) => {
        this.results = response.resultados;
        this.categorias = response.categorias;
      }
    })
  }

  ngOnInit(): void {}
  //agrega una categoria al conjunto de categorias a remover
  agregarCategoriaRemover(id : number){
    if(!this.categoriasRemover){
      this.categoriasRemover = new Set<Categoria>();
    }
    if(this.categorias)
    {
      let arrCat = Array.from(this.categorias);
      let catAux = arrCat.find((categoria : Categoria) => categoria.id === id)
      if(catAux && this.categoriasRemover)
        this.categoriasRemover.add(catAux);
    }
  }

}
