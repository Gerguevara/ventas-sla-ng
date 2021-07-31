import { Producto } from './producto.model';
import { Categoria } from './categoria.model';

export interface ResultadoIndex {
    categoria: Categoria,
    productos: Producto[],
}
