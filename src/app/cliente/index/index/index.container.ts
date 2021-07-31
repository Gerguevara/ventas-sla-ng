import { ResultadoIndex } from './../../../core/Models/resultado-index.model';
import { IndexService } from 'src/app/core/services/index.service';
import { Component, OnInit } from '@angular/core';
import { Categoria } from '@models/categoria.model';
import { Resultado } from '@models/resultado.model';
import { CategoriaService } from '@global-services/categoria.service';

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
    private categoriaService : CategoriaService,
    private indexService : IndexService
    ) {
    this.indexService.obtenerProductos().subscribe({
      next:(result: ResultadoIndex[])=>{
        if(result.length > 0){
          this.results = result;
          let cats: Categoria[] = [];
          this.results.forEach(resultado => {
            cats.push(resultado.categoria);
          });
          this.categorias=new Set<Categoria>(cats);
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
