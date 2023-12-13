import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PaymentsService {
  private apiUrl = 'http://192.168.0.177:7071/api/';

  constructor(private http: HttpClient) { }

  downloadFile(): Observable<HttpResponse<Blob>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get(this.apiUrl + 'PaymentsFile/download', {
      headers: headers,
      responseType: 'blob',
      observe: 'response'
    });
  }
}