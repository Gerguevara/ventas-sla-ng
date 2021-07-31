import { Recurso } from '@models/recurso.model';
export interface IData <T extends Recurso> {
  data: T,
  paramsText: string[]
}
