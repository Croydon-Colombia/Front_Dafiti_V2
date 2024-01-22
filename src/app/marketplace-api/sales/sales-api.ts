import { HttpClient } from '@angular/common/http';
import { Injectable} from "@angular/core";
import { Order } from 'app/Models/order';
import { BehaviorSubject, Observable, forkJoin, of, switchMap, tap} from 'rxjs';

@Injectable({
    providedIn: 'root'
  })


  export class SalesApi{

    private _data: BehaviorSubject<Order[]> = new BehaviorSubject(null);
    private baseUri = 'http://192.168.0.177:7071/api/';

    constructor(private http: HttpClient) {}

    get data$(): Observable<Order[]>{
        return this._data.asObservable();
    }

    getData(): Observable<Order[]> {
        return this.http.get(this.baseUri + 'Sales/SalesWithError?mpId=1').pipe(
            tap((response: Order[])=>{
                this._data.next(response)
            })
        )
    }

    getSalesDay(dateStart: string, dateEnd: string) : Observable<Order[]>{
        return this.http.get(this.baseUri + 'Sales/SalesByDate?start='+ dateStart + '&end=' + dateEnd).pipe(
            tap((response: Order[])=>{
                this._data.next(response)
            })
        )
    }

    proccessSale(order: string) : Observable<any> {
        return of(null).pipe(
            switchMap(() => this.http.post(this.baseUri + 'Orders/ReprocessOrder?OrderNumber=' + order, null, { responseType: 'text' }))
        );
    }

    //Reprocesar todas las ordenes
    processSales(orders: string[]): Observable<any[]> {

        const apiUrl = this.baseUri + 'MassiveRequest/ReprocessOrderNotSucces' + orders;
        console.log('URL de la solicitud:', apiUrl);
        console.log('ordenes: '+ orders);
        
        // Crea un array de observables para las solicitudes de reprocesamiento
        const observables = orders.map(order =>
            this.http.post(this.baseUri + 'MassiveRequest/ReprocessOrderNotSucces' + order, null, { responseType: 'text' })
            );

         // Combina todos los observables en uno solo para manejarlos conjuntamente
        return forkJoin(observables);

    }


  }


