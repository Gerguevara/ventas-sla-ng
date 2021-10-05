import { Recurso } from './../models/recurso.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '@core/models/producto.model';
import { environment } from '@environments/environment';
import { PreflightService } from '@tool-services/preflight-service';
import { Observable } from 'rxjs';
import { Resolve } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WishlistService extends PreflightService implements Resolve<Producto[]|string>{

  API_URL = `${environment.apiUrl}${environment.endpoints.wishlist}`

  constructor(
    private httpClient: HttpClient
  ) {
    super();
  }

  getWishlist(page?: number, page_size?: number): Observable<Producto[]|string> {
    let params = Object.create(null);
    if(page && page_size){
      params['page']= page.toString();
      params['page_size']= page_size.toString();
    }
    return this.httpClient.get<Producto[]|string>(
      this.API_URL,
      this.setOptions(params)
    );
  }

  postWishlist(resource: Recurso): Observable<string> {
    return this.httpClient.post<string>(`${this.API_URL}`, resource, this.setOptions());
  }

  resolve(): Observable<Producto[]|string>{
    return this.getWishlist();
  }
}
