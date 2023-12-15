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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';


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
        MatSnackBarModule,

        //Se importan para la aplicación de search-orders
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        ReactiveFormsModule,
        CommonModule,
        MatNativeDateModule,
        MatCheckboxModule,//se utiliza para el checkbox
        MatDialogModule
    ]
})
export class DashboardModule { }
