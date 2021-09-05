import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TwoStepAuthSecret } from '@tools/models/TwoStepAuthSecret';

@Injectable({
  providedIn: 'root'
})
export class TwoStepAuthService {

  constructor( private http: HttpClient ) { }
}
