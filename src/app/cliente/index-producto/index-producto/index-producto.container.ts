import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Producto } from 'src/app/core/Models/producto.model';
import { IndexService } from './../../../core/services/index.service';

@Component({
  selector: 'app-index-producto',
  templateUrl: './index-producto.container.html',
  styleUrls: ['./index-producto.container.scss']
})
export class IndexProductoContainer implements OnInit {
  producto? : Producto;
  constructor(
    private route : ActivatedRoute,
    private indexService : IndexService
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
    {
      next: (params: ParamMap) => {
        let idObtenido = params.get('id')
        let id = 0;
        if(idObtenido) id = Number(idObtenido);
        this.indexService.getObject(id).subscribe({
          next:(producto:Producto)=>{
            this.producto = producto;
          }
        })
      },
    }
    )
  }

}
