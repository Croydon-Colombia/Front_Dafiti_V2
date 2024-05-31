import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventoryParameters } from 'app/Models/inventory-parameters';

@Injectable({
  providedIn: 'root'
})
export class AdministrarService {

    private apiUrl='http://192.168.0.97:8089/api/Parameters/GetAllParameters';

    constructor(private http:HttpClient) { }

    get():Observable<InventoryParameters[]>{
        console.log('Entrando al servicio para ver los parametros');
    return this.http.get<InventoryParameters[]>(this.apiUrl);

}

}
