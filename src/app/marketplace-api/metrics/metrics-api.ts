import { HttpClient } from '@angular/common/http';
import { Injectable} from "@angular/core";
import { Metric } from 'app/Models/metrics-mp';
import { BehaviorSubject, Observable, tap} from 'rxjs';

@Injectable({
    providedIn: 'root'
  })

  export class MetricsService{

    private _data: BehaviorSubject<Metric[]> = new BehaviorSubject(null);
    private baseUri = 'http://192.168.0.177:7071/api/';

    constructor(private http: HttpClient) {}

    get data$(): Observable<Metric[]>{
        return this._data.asObservable();
    }

    getData(): Observable<Metric[]> {
        return this.http.get(this.baseUri + 'Metrics').pipe(
            tap((response: Metric[])=>{
                this._data.next(response)
            })
        )
    }

  }
