import { HttpHeaders } from "@angular/common/http";
import { environment } from "@environments/environment";

export abstract class PreflightService{
  constructor(){}

  protected setOptions() {
    const token = 'Bearer ' + localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin': environment.allowedOrigin,
        'Authorization': token
      })
    };
    return httpOptions
  }
}
