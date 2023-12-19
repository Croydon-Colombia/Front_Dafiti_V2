import { trigger, state, style, transition, animate } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from 'app/Models/order';
import { OrderInfo } from 'app/Models/order-info';
import { SalesApi } from 'app/marketplace-api/sales/sales-api';
import { SalesApiByDate } from 'app/marketplace-api/sales/sales-api-by-date';
import { BehaviorSubject, Observable, Subject, take } from 'rxjs';
import { PaymentsService } from 'app/marketplace-api/payments/payment-api';
import { TrackingSertvice } from 'app/marketplace-api/trackings/tracking-api';

@Component({
    selector: 'dafiti.orders',
    templateUrl: './dafiti.orders.component.html',
    styleUrls: ['./dafiti.orders.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '5px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class DafitiOrdersComponent implements OnInit, AfterViewInit, OnDestroy {

    habilitar:boolean = false;

    orderSort: MatSort;
    isLoading: boolean = true;
    recentTransactionsDataSource: BehaviorSubject<MatTableDataSource<Order>> = new BehaviorSubject<MatTableDataSource<Order>>(null);
    selection = new SelectionModel<Order>(true, []);
    @ViewChild('recentTransactionsTable', { read: MatSort }) recentTransactionsTableMatSort: MatSort;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    trackingMesagge: string;

    columnsToDisplay = ['orderNumber', 'orderPk', 'orderTotalPrice', 'orderSellerDate', 'marketPlace.mpName'];
    columnsToDisplayWithExpand = ['select', ...this.columnsToDisplay, 'expand'];

    columnMappings: { [key: string]: string } = {
        orderPk: 'Número de Orden',
        orderNumber: 'Número de Pedido',
        orderTotalPrice: 'Precio Total',
        orderSellerDate: 'Fecha del Vendedor',
        'marketPlace.mpName': 'Nombre del Marketplace'
    };

    expandedElement: OrderInfo | null;

    all_sales: Order[];

    range = new FormGroup({
        start: new FormControl<Date | null>(null),
        end: new FormControl<Date | null>(null),
    });

    range2(type: any, event: any) {
        if (event.value) {
            const startDate = event.value.start;
            const endDate = event.value.end;

            const formattedStartDate = this.formatDate(startDate);
            const formattedEndDate = this.formatDate(endDate);

            console.log('Fecha de inicio formateada:', formattedStartDate);
            console.log('Fecha de fin formateada:', formattedEndDate);
        }
    }

    /**
     *
     */
    constructor(private salesApi: SalesApiByDate, private orderApi: SalesApi,
        private paymentsService: PaymentsService,
        private trackingSertvice: TrackingSertvice) {
    }

    //Descargar pagos seleccionados
    downloadPaymentByOrdersNumber(){
        const ordersNumber: string[] = []; // Declaración y asignación correcta del array

        this.selection.selected.forEach(order => {
          console.log(order.orderNumber);
          ordersNumber.push(order.orderNumber); // Uso correcto de push para agregar elementos al array
        });

        console.log("resultado de ordenes " + ordersNumber);

        this.paymentsService.downloadPaymentsFileByOrdersNumbers(ordersNumber).subscribe(response => {
          const blob = new Blob([response.body], { type: 'application/octet-stream' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = this.getFileName(response); // Obtener el nombre del archivo de la respuesta
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        },
        error => {
            console.error('Error en la solicitud:', error);
                this.trackingMesagge = 'Error al realizar la solicitud: ' + error.message;
                //this.mostrarSnackbar(this.trackingMesagge);
            }

        );
      }

      //Descargar guías seleccionadas
      downloadTrackingFilesByOrdersNumbers(){
        const ordersNumber: string[] = []; // Declaración y asignación correcta del array

        this.selection.selected.forEach(order => {
          console.log(order.orderNumber);
          ordersNumber.push(order.orderNumber); // Uso correcto de push para agregar elementos al array
        });

        this.trackingSertvice.downloadTrackingByOrdersNumbers(ordersNumber).subscribe(
            response => {

                //Emite el número de guias seleccionadas y el total de guías
                const totalDeGuiasPendientes = this.recentTransactionsDataSource.value.data.length;
                const totalDeGuiasSeleccionadas = this.selection.selected.length;

                //console.log('Respuesta de la API:', response); // Asegúrate de que la respuesta sea una cadena de texto

                //Muestra una alerta al usuario al hacer la descarga de las guias seleccionadas
                alert("Descargando " + totalDeGuiasSeleccionadas + " guías de " + totalDeGuiasPendientes);

                //muestra mensajes
                console.log(totalDeGuiasSeleccionadas);
                console.log(totalDeGuiasPendientes);
                console.log("Descargando "+" "+totalDeGuiasSeleccionadas+" "+"guías seleccionadas de "+ totalDeGuiasPendientes);
                //console.log (this.recentTransactionsDataSource.value.data);

                this.trackingMesagge = response;
                //this.mostrarSnackbar(this.trackingMesagge);
            },
            error => {
                console.error('Error en la solicitud:', error);
                this.trackingMesagge = 'Error al realizar la solicitud: ' + error.message;
                //this.mostrarSnackbar(this.trackingMesagge);
            }
        );

      }

      downloadPaymentFile(): void {
        this.paymentsService.downloadFile().subscribe(response => {
            console.log(response)
            const blob = new Blob([response.body], { type: 'application/octet-stream' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = this.getFileName(response); // Obtener el nombre del archivo de la respuesta
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        });
    }

    private getFileName(response: any): string {
        const contentDispositionHeader = response.headers.get('Content-Disposition');
        console.log(contentDispositionHeader);
        const fileNameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = fileNameRegex.exec(contentDispositionHeader);
        if (matches && matches.length > 1) {
            return matches[1].replace(/['"]/g, '');
        }
        return 'archivo.prn';
    }

    ngOnInit(): void {
        this.range.controls.end.valueChanges.subscribe(endDate => {
            if (endDate) {
                const startDate = this.range.controls.start.value;
                endDate.setHours(23, 59, 59, 999);
                if (startDate) {
                    this.getDataOrdersByDate(this.formatDate(startDate), this.formatDate(endDate));
                }
            }
        });
        const [startDate, endDate] = this.formatDates();
        this.getDataOrdersByDate(startDate, endDate);
    }

    getDataOrdersByDate(startDate: string, endDate: string) {
        this.salesApi.getSalesDay(startDate, endDate).pipe(take(1)).subscribe(data => {
            console.log(this.isLoading)
            const dataSource = new MatTableDataSource<Order>(data);
            dataSource.sort = this.recentTransactionsTableMatSort;
            this.recentTransactionsDataSource.next(dataSource);
            this.isLoading = false; // Marca isLoading como falso cuando los datos se han cargado.
            console.log(dataSource)
            console.log(this.recentTransactionsTableMatSort)
            console.log(this.recentTransactionsDataSource)
            console.log(this.isLoading)
        });

        this.recentTransactionsDataSource.pipe(take(1)).subscribe(dataSource => {
            dataSource.filterPredicate = (data: Order, filter: string) => {
                // Implementa lógica de búsqueda aquí, por ejemplo:
                const searchData = `${data.orderNumber} ${data.orderPk} ${data.orderTotalPrice} ${data.orderSellerDate} ${data.marketPlace.mpName}`.toLowerCase();
                return searchData.includes(filter);
            };

            const newDataSource = new MatTableDataSource<Order>(dataSource.data);
            newDataSource.sort = this.recentTransactionsTableMatSort;
            this.recentTransactionsDataSource.next(newDataSource);
        });
    }

    ngAfterViewInit(): void {
        this.orderSort = new MatSort();
        this.recentTransactionsDataSource.pipe(take(1)).subscribe(dataSource => {
            const newDataSource = new MatTableDataSource<Order>(dataSource.data);
            newDataSource.sort = this.recentTransactionsTableMatSort;
            this.recentTransactionsDataSource.next(newDataSource);
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
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

    reproceesOrder(orderNumber: string) {
        this.orderApi.proccessSale(orderNumber).subscribe(response => {
            console.log('Response: ' + response);
        });
    }

    formatDates(): string[] {
        const currentDate = new Date();

        // Establecer la hora de inicio del día a las 00:00:00
        const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0, 0);

        // Establecer la hora de fin del día a las 23:59:59
        const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59, 999);

        const startDate = this.formatDate(startOfDay);
        const endDate = this.formatDate(endOfDay);

        return [startDate, endDate];
    }

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

    parseErpMessage(erpMessage: string): string {
        try {
            // Intenta convertir la cadena JSON a un objeto JavaScript
            const parsedMessage = JSON.parse(erpMessage);

            // Verifica si la propiedad 'exception' existe y tiene la propiedad 'DESCRIPCION'
            if (parsedMessage && parsedMessage.exception && parsedMessage.exception.DESCRIPCION) {
                // Devuelve la propiedad 'DESCRIPCION'
                return parsedMessage.exception.DESCRIPCION;
            }
        } catch (error) {
            // Maneja cualquier error al analizar la cadena JSON
            console.error('Error al analizar el mensaje ERP:', error);
        }

        // Si no se puede analizar el mensaje o no tiene la propiedad 'DESCRIPCION', devuelve una cadena vacía
        return '';
    }

    getColumnName(column: string): string {
        return this.columnMappings[column] || column;
    }

    getColumnValue(element: any, column: string): any {
        // Maneja propiedades anidadas usando el Safe Navigation Operator (?.)
        const nestedProps = column.split('.');
        let value = element;

        for (const prop of nestedProps) {
            value = value?.[prop];
        }

        return value;
    }

    masterToggle() {
        this.isAllSelected()
            ? this.selection.clear()
            : this.recentTransactionsDataSource.value.data.forEach(row => this.selection.select(row));
    }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.recentTransactionsDataSource.value.data.length;
        return numSelected === numRows;
    }
}
