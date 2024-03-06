import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderDetail } from 'app/Models/order-not-processed/order-detail';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

    private baseUri = 'http://192.168.0.160:7071/api/';

    constructor(private http:HttpClient){}

    getOrderById(orderNumber:string): Observable<OrderDetail>{
        return this.http.get<OrderDetail>(this.baseUri + 'Orders/GetorderByOrderNumber?mp=1&ordernumber=' + orderNumber);
    }


    updateOrden(order:OrderDetail): Observable<OrderDetail>{
        return this.http.post<OrderDetail>(this.baseUri+'Orders/UpdateOrder', order);
      }



}
