import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrackingSertvice {
  private apiUrl = 'http://192.168.0.177:7071/api/';

  constructor(private http: HttpClient) { }

  // Método para hacer la solicitud en segundo plano
  downloadTrackingPendings(): Observable<any> {
    return of(null).pipe(
        switchMap(() => this.http.put(this.apiUrl + 'PendingTracking/DownloadPendingGuides', null, { responseType: 'text' }))
    );
  }
}
