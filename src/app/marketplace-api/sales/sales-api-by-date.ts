import { HttpClient } from '@angular/common/http';
import { Injectable} from "@angular/core";
import { Order } from 'app/Models/order';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable, tap} from 'rxjs';

@Injectable({
    providedIn: 'root'
  })


  export class SalesApiByDate{

    private _data: BehaviorSubject<Order[]> = new BehaviorSubject(null);
    private baseUri = environment.apiUrl;

    constructor(private http: HttpClient) {}

    get data$(): Observable<Order[]>{
        return this._data.asObservable();
    }

    getSalesDay(dateStart: string, dateEnd: string) : Observable<Order[]>{
        return this.http.get(this.baseUri + 'Sales/SalesByDate?start='+ dateStart + '&end=' + dateEnd).pipe(
            tap((response: Order[])=>{
                this._data.next(response)
            })
        )
    }

  }
