import { Recurso } from './../../core/Models/recurso.model';
export interface IData <T extends Recurso> {
  data: T,
  paramsText: string[]
}
