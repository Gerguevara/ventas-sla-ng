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
  categorias? : Set<Categoria>;
  categoriasRemover? : Set<Categoria>;

  constructor(private categoriaService : CategoriaService) { }

  ngOnInit(): void {
    this.categoriaService.getObjects().subscribe(
      (result : Resultado<Categoria>) => {
        this.categorias=new Set<Categoria>(result.data);
        this.categoriasRemover?.forEach(
          (categoriaQuitar : Categoria) => {
            this.categorias?.delete(categoriaQuitar);
          }
        )
      },
    )
  }
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
