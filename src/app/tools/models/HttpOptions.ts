
import { HttpHeaders, HttpParams } from '@angular/common/http';
export interface HttpOptions {
  headers?: HttpHeaders | {
      [header: string]: string | string[];
  } | undefined;
  observe?: "body" | undefined;
  params?: HttpParams | any| undefined;
  reportProgress?: boolean | undefined;
  responseType?: "json" | undefined;
  withCredentials?: boolean | undefined;
}
