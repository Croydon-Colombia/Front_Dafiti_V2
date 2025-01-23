import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActualizarService {

    private apiUrl = 'http://192.168.0.97:8089/api/InventoryFile';

    constructor(private http: HttpClient) { }

    uploadFile(archivo: File): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('file', archivo, archivo.name);
        console.log('iniciando el servicio');
        console.log('archivo ', archivo);

        return this.http.post(this.apiUrl, formData).pipe(
            catchError((error: HttpErrorResponse) => {
                console.error('Error en la solicitud:', error);
                return throwError('Error al subir el archivo. Por favor, inténtelo de nuevo.');
            })
        );
    }
}
