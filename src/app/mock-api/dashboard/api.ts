import {Injectable} from "@angular/core";
import {DashBoardData} from "../../Models/dash-board-data";
import {FuseMockApiService} from "../../../@fuse/lib/mock-api";
import {cloneDeep} from "lodash-es";
import {dashboardData} from "./data";

@Injectable({
    providedIn: 'root'
})
export class DashboardMockApi{
    private _dashBoardData: DashBoardData = dashboardData;

    constructor(private _fuseMockApiService: FuseMockApiService) {
        this.registerHandlers();
    }

    registerHandlers(): void{
        this._fuseMockApiService
            .onGet('api/dashboard')
            .reply(()=>[200, cloneDeep(this._dashBoardData)])
    }
}
