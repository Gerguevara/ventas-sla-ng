import { PreflightService } from '@tool-services/preflight-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TwofaService extends PreflightService{

  private confirmPending: boolean = false;

  private url = `${environment.apiUrl}${environment.endpoints.twofa}`;

  constructor(
    private httpClient: HttpClient,
  ) {
    super();
  }

  habilitarTwoFa(): Observable<string>{
    return this.httpClient.post<string>(
        `${this.url}/enable`,
        {},
        this.setOptions(),
      );
  }

  deshabilitarTwoFa(): Observable<string>{
    return this.httpClient.delete<string>(
        `${this.url}/disable`,
        this.setOptions(),
      );
  }

  obtenerEstadoTwoFa(): Observable<boolean>{
    return this.httpClient.get<boolean>(
        `${this.url}/status`,
        this.setOptions()
      );
  }

  obtenerCodigoQr(): Observable<string>{
    return this.httpClient.get<string>(
        `${this.url}/qr`,
        this.setOptions()
      );
  }

  obtenerCodigosRecuperacion(): Observable<string[]>{
    return this.httpClient.get<string[]>(
        `${this.url}/recovery`,
        this.setOptions()
      );
  }

  obtenerEstadoBloqueo(): Observable<boolean>{
    return this.httpClient.get<boolean>(
        `${this.url}/blocked`,
        this.setOptions()
      );
  }

  enviarCodigoTOTP(codigo: string): Observable<boolean>{
    return this.httpClient.post<boolean>(
      `${this.url}/totp`,
      {
        code: codigo
      },
      this.setOptions()
    )
  }

  activateTwoFactorAuth(){
    this.confirmPending = true;
  }

  confirmTwoFactorAuth(){
    this.confirmPending = false;
  }

  twoFactorPendingObservable(): Observable<boolean>{
    return of<boolean>(this.confirmPending);
  }

  isTwoFactorPending(): boolean{
    return this.confirmPending;
  }
}
