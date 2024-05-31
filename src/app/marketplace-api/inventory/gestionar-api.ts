import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventoryMp } from 'app/Models/inventory-mp';


@Injectable({
  providedIn: 'root'
})
export class GestionarService {

    private apiUrl='http://192.168.0.97:8089/api/MarketPlace/GetAllMarketPlace';

    constructor(private http:HttpClient) { }

    get():Observable<InventoryMp[]>{
        console.log('Entrado al servicio para mostrar datos de MP');
    return this.http.get<InventoryMp[]>(this.apiUrl);
    }

}
