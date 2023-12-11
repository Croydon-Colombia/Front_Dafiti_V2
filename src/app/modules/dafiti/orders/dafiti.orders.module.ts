import { NgModule } from '@angular/core';
import { DafitiOrdersComponent } from './dafiti.orders.component';
import { RouterModule } from "@angular/router";
import { dafitiOrdersRouting } from "./dafiti.orders.routing";
import { MatTableModule } from '@angular/material/table';
import { CommonModule, CurrencyPipe, DatePipe, JsonPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        DafitiOrdersComponent
    ],
    imports: [
        RouterModule.forChild(dafitiOrdersRouting),
        MatTableModule,
        NgForOf,
        CommonModule,
        MatSortModule,
        MatCheckboxModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        CurrencyPipe,
        MatDividerModule,
        NgApexchartsModule,
        NgClass,
        DatePipe,
        NgIf,
        MatSnackBarModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        FormsModule,
        ReactiveFormsModule,
        JsonPipe,
    ]
})
export class DafitiOrdersModule {

}
