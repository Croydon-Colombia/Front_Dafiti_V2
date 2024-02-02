import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventoryMp } from 'app/Models/inventory-mp';


@Injectable({
  providedIn: 'root'
})
export class GestionarService {

    private apiUrl='http://192.168.0.177:8041/api/MarketPlace/GetAllMarketPlace';

    constructor(private http:HttpClient) { }

    get():Observable<InventoryMp[]>{
    return this.http.get<InventoryMp[]>(this.apiUrl);

}

}
