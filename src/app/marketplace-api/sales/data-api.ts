import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderDetail } from 'app/Models/order-not-processed/order-detail';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

    private baseUri = environment.apiUrl;

    constructor(private http:HttpClient){}

    getOrderById(orderNumber:string): Observable<OrderDetail>{
        console.log(this.baseUri + 'Orders/GetorderByOrderNumber?mp=1&ordernumber=' + orderNumber);
        return this.http.get<OrderDetail>(this.baseUri + 'Orders/GetorderByOrderNumber?mp=1&ordernumber=' + orderNumber);
    }


    updateOrden(order:OrderDetail): Observable<OrderDetail>{
        return this.http.post<OrderDetail>(this.baseUri+'Orders/UpdateOrder', order);
      }



}
