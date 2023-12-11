import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import {DashboardComponent} from "./dashboard.component";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {CurrencyPipe, DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {MatDividerModule} from "@angular/material/divider";
import {NgApexchartsModule} from "ng-apexcharts";
import {dashboardRouting} from "./dashboard.routing";
import {MatTableModule} from "@angular/material/table";
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
      DashboardComponent
  ],
    imports: [
        RouterModule.forChild(dashboardRouting),
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        CurrencyPipe,
        MatDividerModule,
        NgApexchartsModule,
        NgForOf,
        MatTableModule,
        NgClass,
        DatePipe,
        NgIf,
        MatSnackBarModule
    ]
})
export class DashboardModule { }
