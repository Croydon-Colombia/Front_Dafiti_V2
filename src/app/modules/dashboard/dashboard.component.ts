import { OrderCustomers } from './../../Models/order-customer';
import { CustomSnackbarComponent } from '../custom-snackbar/custom-snackbar.component';
import { TrackingSertvice } from '../../marketplace-api/trackings/tracking-api';
import { SalesApi } from '../../marketplace-api/sales/sales-api';
import { Metric } from 'app/Models/metrics-mp';
import { MetricsService } from '../../marketplace-api/metrics/metrics-api';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { DashboardService } from "./dashboard.service";
import { BehaviorSubject, Subject, take, takeUntil } from "rxjs";
import {  MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { DashBoardData } from "../../Models/dash-board-data";
import { OrderInfo } from "../../Models/order-info";
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Order } from 'app/Models/order';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaymentsService } from 'app/marketplace-api/payments/payment-api';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
<<<<<<< Updated upstream
=======
import { List, forEach } from 'lodash';
import { MatTableDataSourcePaginator } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import * as XLSX from 'xlsx';
import { ERPProccess } from 'app/Models/erp-proccess';
import { OrderItem } from 'app/Models/order-item';
>>>>>>> Stashed changes

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['dasboard.css'],
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
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {

    recentTransactionsDataSource: BehaviorSubject<MatTableDataSource<Order>> = new BehaviorSubject<MatTableDataSource<Order>>(null);

    orderSort: MatSort;

    selection = new SelectionModel<Order>(true, []);

    @ViewChild('recentTransactionsTable', { read: MatSort }) recentTransactionsTableMatSort: MatSort;
    columnsToDisplay = ['orderNumber', 'orderPk', 'orderTotalPrice', 'orderSellerDate', 'marketPlace.mpName'];
    trackingMesagge: string;

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

    columnMappings: { [key: string]: string } = {
        orderPk: 'Número de Orden',
        orderNumber: 'Número de Pedido',
        orderTotalPrice: 'Precio Total',
        orderSellerDate: 'Fecha del Vendedor',
        'marketPlace.mpName': 'Nombre del Marketplace'
    };

    columnsToDisplayWithExpand = ['select',...this.columnsToDisplay, 'expand'];
    data: DashBoardData;
    expandedElement: OrderInfo | null;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    //recentTransactionsDataSource: MatTableDataSource<any> = new MatTableDataSource();

    metrics: Metric[];
    salesFail: Order[];

    constructor(private _dashboardService: DashboardService, private metricsService: MetricsService,
        private salesApi: SalesApi, private trackingSertvice: TrackingSertvice, private snackBar: MatSnackBar,
        private paymentsService: PaymentsService,
        public dialog: MatDialog) {
    }

<<<<<<< Updated upstream
=======
    //Datos necesarios para exportar en el excel
    mostrarDatosExportarReporte(objeto: Order): void {
        console.log(`Datos generales del objeto:`);
        console.log(`Número de orden: ${objeto.orderPk}`);
        console.log(`Número de pedido: ${objeto.orderNumber}`);
        console.log("Numero de cedula: "+objeto.orderCustomers.customerRegNumber);


        console.log(`Datos de erpProccesses:`);
        objeto.erpProccesses.forEach((erpProccess, index) => {
            console.log(`ERPProccess ${index + 1}:`);
            console.log(`Fecha: ${erpProccess.erpProccessDate}`);
            console.log(`Mensaje: ${erpProccess.erpMessage}`);
        });

        console.log(`Datos de orderItems:`);
        objeto.orderItems.forEach((orderItems, index) => {
            console.log(`OrderItem ${index + 1}:`);
            console.log(`Referencia: ${orderItems.itemSku}`);
        });

    }

    exportToExcel(): void {

        // Itera sobre cada objeto en el arreglo y muestra los datos
        this.salesFail.forEach(objeto => {
            this.mostrarDatosExportarReporte(objeto);
        });

        console.log("Excel exportado");
        console.log("imprimiendo cada uno de los objetos de esas ordenes fallidas: "+ this.salesFail);
        console.log("imprimiendo el número de ordenes fallidas: "+ this.salesFail.length);

        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.salesFail);
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, 'exported-data');

    }

    private saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
        const a: HTMLAnchorElement = document.createElement('a');
        const url: string = window.URL.createObjectURL(data);
        a.href = url;
        a.download = fileName + '.xlsx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
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


      //Pagos pendientes
    downloadPaymentFile(): void {

        const currentDate = new Date();
        const formattedDate = this.paymentsService.formatDate(currentDate);
        const formattedTime = this.paymentsService.formatTime(currentDate);
        const finalFilename = `DF${formattedDate}${formattedTime}.prn`;

        this.paymentsService.downloadFile().subscribe(response => {
            console.log("respuesta:"+ response)
            const blob = new Blob([response.body], { type: 'application/octet-stream' });
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = finalFilename; // Obtener el nombre del archivo de la respuesta

            document.body.appendChild(a);
            a.click();

            window.URL.revokeObjectURL(url);
        });
    }

>>>>>>> Stashed changes
    ngOnInit(): void {
        this._dashboardService.data$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) => {
                this.data = data
            })

        this.metricsService.data$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((response) => {
                this.metrics = response
            })
        this.getDataOrdersByDate();
    }

    //Obtener las ordenes por fecha
    getDataOrdersByDate() {

        this.salesApi.data$.pipe(take(1)).subscribe(data => {
            const dataSource = new MatTableDataSource<Order>(data);
            dataSource.sort = this.recentTransactionsTableMatSort;
            this.recentTransactionsDataSource.next(dataSource);
            this.salesFail = data
            console.log(dataSource)
            console.log(this.recentTransactionsTableMatSort)
            console.log(this.recentTransactionsDataSource)

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

    /*ngAfterViewInit(): void {
        this.recentTransactionsDataSource.sort = this.recentTransactionsTableMatSort;
    }*/

    // Configuraciones después de que las vistas y componentes relacionados se han inicializado
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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    reprocessOrder(orderNumber: string){

        this.salesApi.proccessSale(orderNumber).subscribe(response => {
            console.log('Response: ' + response);
        });
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

    // Método para aplicar filtro en la tabla
    applyFilter(filterValue: string) {

        filterValue = filterValue.trim(); // Elimina espacios en blanco
        filterValue = filterValue.toLowerCase(); // Convierte el valor a minúsculas
        this.recentTransactionsDataSource.value.filter = filterValue;
        console.log('value'+ filterValue);

            // Verifica si el DataSource tiene paginación
            if (this.recentTransactionsDataSource.value.paginator) {
            this.recentTransactionsDataSource.value.paginator.firstPage();
            }
        }

    calltrackingPending() {

        this.trackingSertvice.downloadTrackingPendings().subscribe(
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

    mostrarSnackbar(_message: string) {
        const snackBarRef = this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: _message },
            duration: 0, // Duración 0 significa que el snackbar permanecerá abierto hasta que se cierre manualmente
        });

        snackBarRef.onAction().subscribe(() => {
            snackBarRef.dismiss(); // Cierra el snackbar al hacer clic en el botón de cerrar
        });
    }
}


