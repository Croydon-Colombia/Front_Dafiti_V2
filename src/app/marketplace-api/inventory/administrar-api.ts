import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventoryParameters } from 'app/Models/inventory-parameters';

@Injectable({
  providedIn: 'root'
})
export class AdministrarService {

    private apiUrl='http://192.168.0.177:8041/api/Parameters/GetAllParameters';

    constructor(private http:HttpClient) { }

    get():Observable<InventoryParameters[]>{
    return this.http.get<InventoryParameters[]>(this.apiUrl);

}

}
