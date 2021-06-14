import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Resultado } from '../Models/resultado.model';
import { Recurso } from './../Models/recurso.model';

export abstract class RecursoService<T extends Recurso> {

  private API_URL = `${environment.apiUrl}`;

  constructor(
    endpoint: string,
    protected httpClient: HttpClient
    ) {
    this.API_URL = this.API_URL.concat(`${endpoint}/`)
  }

  getObjects(page: number = 1, page_size: number = 10): Observable<Resultado<T>> {
    return this.httpClient.get<Resultado<T>>(this.API_URL, {
      params: { page: page.toString(), page_size: page_size.toString()},
    });
  }

  getObject(id: number): Observable<T> {
    return this.httpClient.get<T>(`${this.API_URL}${id}`);
  }

  updateObject(resource: T): Observable<T> {
    return this.httpClient.put<T>(`${this.API_URL}${resource.id}/`, resource);
  }

  postObject(resource: T): Observable<T> {
    return this.httpClient.post<T>(`${this.API_URL}`, resource);
  }
}
