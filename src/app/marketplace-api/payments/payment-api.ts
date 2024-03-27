import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { List } from 'lodash';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PaymentsService {
    private baseUri = environment.apiUrl;

  constructor(private http: HttpClient) { }

  downloadFile(): Observable<HttpResponse<Blob>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get(this.baseUri + 'PaymentsFile/downloadReport', {
      headers: headers,
      responseType: 'blob',
      observe: 'response'
    });
  }

  //descargar archivo de pagos por números de pedidos
    downloadPaymentsFileByOrdersNumbers(ordersNumbers : string[]): Observable<HttpResponse<Blob>>{

      return this.http.post(this.baseUri + 'PaymentsFile/downloadReportSlect', ordersNumbers, {
        //headers: headers,
        responseType: 'blob',
        observe: 'response'
      });
}

//Manejar la descarga del archivo
handleFileDownload(response: HttpResponse<Blob>): void {
    // Extraer el nombre de archivo del encabezado Content-Disposition
    const contentDispositionHeader = response.headers.get('Content-Disposition');
    const match = contentDispositionHeader.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
    const filename = match[1].replace(/['"]/g, '');

    // Aplicar la lógica para renombrar el archivo según tus necesidades
    const currentDate = new Date();
    const formattedDate = this.formatDate(currentDate);
    const formattedTime = this.formatTime(currentDate);
    const finalFilename = `DF${formattedDate}${formattedTime}.prn`;

    // Crear un enlace temporal para descargar el archivo
    const blob = new Blob([response.body], { type: 'application/octet-stream' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = finalFilename;

    // Simular un clic en el enlace para iniciar la descarga
    link.click();

    // Liberar recursos
    window.URL.revokeObjectURL(link.href);
  }

  //En caso de querer aplicar la fecha al nombre del archivo
  formatDate(date: Date): string  {
    //const year = date.getFullYear().toString().substring(2); // Obtener los dos últimos dígitos del año
    //const month = ('0' + (date.getMonth() + 1)).slice(-2); // Agregar un cero al mes si es necesario
    const day = ('0' + date.getDate()).slice(-2); // Agregar un cero al día si es necesario

    return `${day}`;
  }

  //Se aplica el formato de hora al nombre del archivo
  formatTime(date: Date): string {
    const hours = ('0' + date.getHours()).slice(-2); // Agregar un cero a las horas si es necesario
    const minutes = ('0' + date.getMinutes()).slice(-2); // Agregar un cero a los minutos si es necesario

    return `${hours}${minutes}`;
  }



}

