import { Recurso } from 'src/app/core/models/recurso.model';
export interface Data <T extends Recurso> {
  data: T,
  paramsText: string[]
}
