import { MarketPlace } from './../../Models/order-not-processed/market-place';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventoryMp } from 'app/Models/inventory-mp';


@Injectable({
  providedIn: 'root'
})
export class GestionarService {

    private apiUrl='http://192.168.0.97:8089/api/MarketPlace';

    constructor(private http:HttpClient) { }

    get():Observable<InventoryMp[]>{
        console.log('Entrado al servicio para mostrar datos de MP');
        return this.http.get<InventoryMp[]>(`${this.apiUrl}/GetAllMarketPlace`);
    }

    updateMp(marketplace: Partial<InventoryMp>[]):Observable<any>{
        console.log('Enviando datos para actualizar:', marketplace);
        return this.http.post(`${this.apiUrl}/UpdateMarketPlace`, marketplace,  {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        });
    }

}
