import { HttpHeaders } from "@angular/common/http";
import { environment } from "@environments/environment";

export abstract class PreflightService{
  constructor(){}

  /**
   * @ngdoc method
   * @param withToken
   * @param registro
   * @returns HttpHeaders
   */
  protected setOptions(withToken: boolean = true, registro: boolean = false) {
    let httpOptions = {};
    if(!registro){
      if(withToken){
        const token = 'Bearer ' + localStorage.getItem('token');
        httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': environment.allowedOrigin,
            'Authorization': token
          })
        };
      } else {
        httpOptions =  {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Access-Control-Allow-Origin': environment.allowedOrigin
          })
        };
      }
    } else {
      if(withToken){
        const token = localStorage.getItem('token-registro');
        const tokenRegistro = 'Bearer ' + token;
        httpOptions =  {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': tokenRegistro
          })
        };
      } else {
        console.error('Error: register without token not allowed');
      }
    }
    return httpOptions;
  }
}
