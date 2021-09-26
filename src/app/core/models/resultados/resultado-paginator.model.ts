import { Link } from '../link.model';

/* Esta interfaz contiene toda la estructura de datos de la respuesta recibida por el
   API de Productos Index */
export interface PaginatorResponse {
    current_page: number;
    data: any[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Link[];
    next_page_url: string;
    path: string;
    per_page: string;
    prev_page_url: string;
    to: number;
    total: number;
}
