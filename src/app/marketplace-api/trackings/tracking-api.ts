import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrackingSertvice {
    private baseUri = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Método para hacer la solicitud en segundo plano
  downloadTrackingPendings(): Observable<any> {
    return of(null).pipe(
        switchMap(() => this.http.put(this.baseUri + 'PendingTracking/DownloadPendingGuides', null, { responseType: 'text' }))
    );
  }

  //Descargar guías
  downloadTrackingByOrdersNumbers(orderNumbers : string[]){
    const body = {
    orderNumbers
    }

    return of(null).pipe(
        switchMap(() => this.http.post(this.baseUri+'PendingTracking/DownloadPendingGuidesByOrdersNumbers',orderNumbers,{ responseType: 'text'}))
    );
  }

}
