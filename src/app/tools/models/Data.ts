import { Recurso } from '@models/recurso.model';
export interface Data <T extends Recurso> {
  data: T,
  paramsText: string[]
}
