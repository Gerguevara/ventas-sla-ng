import { Component, OnInit } from '@angular/core';

import { Categoria } from '@models/categoria.model';
import { ResultadoIndex } from '@models/resultados/resultado-index.model';

import { IndexService } from '@global-services/index.service';

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
    private indexService : IndexService
    ) {
    this.indexService.obtenerCategorias().subscribe({
      next:(result: Categoria[])=>{
        if(result.length > 0){
          this.categorias=new Set<Categoria>(result);
        }
      }
    });
    this.indexService.obtenerProductos().subscribe({
      next:(result: ResultadoIndex[])=>{
        if(result.length > 0){
          this.results=result;
        }
      }
    });
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
