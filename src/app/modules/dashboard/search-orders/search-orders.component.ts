import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject} from 'rxjs';
import { Order } from 'app/Models/order';

@Component({
  selector: 'app-search-orders',
  templateUrl: './search-orders.component.html',
  styleUrls: ['./search-orders.component.scss']
})
export class SearchOrdersComponent {

    recentTransactionsDataSource: BehaviorSubject<MatTableDataSource<Order>> = new BehaviorSubject<MatTableDataSource<Order>>(null);

    columnsToDisplay = ['orderNumber', 'orderPk', 'orderTotalPrice', 'orderSellerDate', 'marketPlace.mpName'];
    //columnsToDisplayWithExpand = ['select', ...this.columnsToDisplay, 'expand'];

    range = new FormGroup({
        start: new FormControl<Date | null>(null),
        end: new FormControl<Date | null>(null),
    });

    private formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Elimina espacios en blanco
        filterValue = filterValue.toLowerCase(); // Convierte el valor a minúsculas
        this.recentTransactionsDataSource.value.filter = filterValue;

        // Verifica si el DataSource tiene paginación
        if (this.recentTransactionsDataSource.value.paginator) {
            this.recentTransactionsDataSource.value.paginator.firstPage();
        }
    }
}
