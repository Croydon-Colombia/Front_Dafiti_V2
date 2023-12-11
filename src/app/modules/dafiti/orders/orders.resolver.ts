import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { SalesApiByDate } from "app/marketplace-api/sales/sales-api-by-date";
import { Observable, forkJoin } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class OrdersResolver implements Resolve<any> {
    /**
     * Constructor
     * @param _dashboardService
     */
    constructor(private _salesApi: SalesApiByDate) {
    }

    /**
     * Resolver
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        const dateStartParam = route.queryParams['dateStart'];
        const dateEndParam = route.queryParams['dateEnd'];

        // Llama al servicio con los parámetros obtenidos
        const salesData$ = this._salesApi.getSalesDay(dateStartParam, dateEndParam);

        // Retorna un observable con los datos necesarios
        return forkJoin({
            salesData: salesData$
        });
    }
}
