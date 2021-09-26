import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Etiqueta } from '@models/etiqueta.model';
import { Categoria } from '@models/categoria.model';
import { CategoriaService } from '@global-services/categoria.service';

@Component({
  selector: 'app-detail-etiqueta',
  templateUrl: './detail-etiqueta.component.html',
  styleUrls: ['./detail-etiqueta.component.scss']
})
export class DetailEtiquetaComponent implements OnInit {

  categoria="";
  constructor(
    //inyecta el producto desde el dialogo hacia el componente
    @Inject(MAT_DIALOG_DATA) public etiqueta: Etiqueta,
    //referencia del dialogo
    private dialogRef: MatDialogRef<DetailEtiquetaComponent>,
    private categoriaService : CategoriaService
    ) { }

  ngOnInit(): void {
    this.categoriaService.getObject(this.etiqueta.categoria_id).subscribe(
      (categoria:Categoria) => this.categoria = categoria.nombre
    )
  }

  close(): void {
    this.dialogRef.close();
  }
}
