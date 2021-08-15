import { HttpOptions } from '@tools/models/HttpOptions';
import { HttpHeaders } from "@angular/common/http";
import { environment } from "@environments/environment";

export abstract class PreflightService{
  constructor(){}

  /**
   * @ngdoc method
   * @name PreflightService:setOptions
   * @description
   * Configura las opciones de la request pre-flight
   * Primero crea un objeto header
   * si se especifica que se necesita token se anexa el token
   * si se especifica que es de registro, se anexa el token de registro
   * si vienen parametros, se anexan los parametros
   * @param withToken
   * Especifica si se necesitan tokens o no
   * @param registro
   * Especifica si sera token de registro
   * @param params
   * Especifica parametros a agregar a las opciones
   * @returns HttpHeaders
   */
  protected setOptions(withToken: boolean = true, registro: boolean = false, params: {[key:string]:string|number}|undefined = undefined) {
    let httpOptions: HttpOptions = {};
    let headers =  new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': environment.allowedOrigin
    });
    if(withToken){
      let token: string | null;
      if(!registro){
        token = localStorage.getItem('token');
      } else {
        token = localStorage.getItem('token-registro');
      }
      const authHeader = `Bearer ${token}`;
      headers.set('Authorization',authHeader);
    }
    httpOptions['headers']=headers;
    if(params){
      httpOptions['params']=params;
    }
    return httpOptions;
  }
}
