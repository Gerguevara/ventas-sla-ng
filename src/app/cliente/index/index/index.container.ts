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

  constructor(private categoriaService : CategoriaService) { }

  ngOnInit(): void {
    this.categoriaService.getObjects(undefined,undefined,true).subscribe(
      (result : Resultado<Categoria>) => { //seria bueno tener un parametro que permita obtener solo las que tienen mas de cero productos
        if(result.total>0){
          this.categorias=new Set<Categoria>(result.data);
        }
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
