import { Categoria } from 'src/app/core/Models/categoria.model';
import { CategoriaService } from 'src/app/core/services/categoria.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Etiqueta } from 'src/app/core/Models/etiqueta.model';

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
