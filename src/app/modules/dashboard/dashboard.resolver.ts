import { MetricsService } from '../../marketplace-api/metrics/metrics-api';
import {Injectable} from '@angular/core';
import {Observable, forkJoin} from 'rxjs';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {DashboardService} from "./dashboard.service";
import { Metric } from 'app/Models/metrics-mp';
import { SalesApi } from 'app/marketplace-api/sales/sales-api';

@Injectable({
    providedIn: 'root'
})
export class DashboardResolver implements Resolve<any> {
    /**
     * Constructor
     * @param _dashboardService
     */
    constructor(private _dashboardService: DashboardService, private _metricsService: MetricsService, private _salesApi: SalesApi) {
    }

    /**
     * Resolver
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        const dashboardData$ = this._dashboardService.getData();
        const metricsData$ = this._metricsService.getData();
        const salesData$ = this._salesApi.getData();
        return forkJoin({
            dashboardData: dashboardData$,
            metricsData: metricsData$,
            salesData: salesData$
          });
    }


}
