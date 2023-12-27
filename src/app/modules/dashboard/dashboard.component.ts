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
import { List, forEach } from 'lodash';
import { MatTableDataSourcePaginator } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import * as XLSX from 'xlsx';

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

    habilitar:boolean = false;

    isChecked:boolean = false;

    //Nombre inicial del botón al no estar seleccionado
    nombreBoton: string = "Reprocesar pedidos fallidos";

    onClick(){
    //Lógica para cambiar el nombre del botón cuando se selecciona/deselecciona el checkbox principal
    console.log("Se hizo clic en la casilla");
    this.actualizarNombreBoton();
    }

    //si esta seleccionado o si al menos una de las filas esta seleccionada
    actualizarNombreBoton(){
        if (this.isChecked || this.selection.hasValue()) {
            this.nombreBoton = 'Reprocesar pedidos seleccionados';
            } else {
            this.nombreBoton = 'Reprocesar pedidos fallidos';
            }
        }

    recentTransactionsDataSource: BehaviorSubject<MatTableDataSource<Order>> = new BehaviorSubject<MatTableDataSource<Order>>(null);

    orderSort: MatSort;

    selection = new SelectionModel<Order>(true, []);


    @ViewChild('recentTransactionsTable', { read: MatSort }) recentTransactionsTableMatSort: MatSort;
    columnsToDisplay = ['orderNumber', 'orderPk', 'orderTotalPrice', 'orderSellerDate', 'marketPlace.mpName'];
    trackingMesagge: string;

    // Referencia al paginador-paginator
      @ViewChild(MatPaginator) paginator!: MatPaginator;

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
        private paymentsService: PaymentsService, private orderApi: SalesApi,
        public dialog: MatDialog) {
    }

    //obtener los datos seleccionados
    getSelectedOrders(): Order[] {
        return this.selection.selected;
    }

    exportToExcel(): void {
        const selectedOrders = this.getSelectedOrders();

        // Verifica si hay elementos seleccionados antes de continuar
        if (selectedOrders.length === 0) {
            console.log('No hay elementos seleccionados para exportar.');
            return;
        }

        // Construye un nuevo conjunto de datos con propiedades específicas
        const excelData = selectedOrders.map(objeto => ({
            NúmeroDePedido: objeto.orderNumber,
            NúmeroDeOrden: objeto.orderPk,
            //FechaDelMensaje: objeto.erpProccesses.map(erp => erp.erpProccessDate).join(', '), // Concatena las fechas si hay múltiples erpProccesses
            Error: objeto.erpProccesses.map(erp => erp.erpMessage).join(', '), // Concatena los mensajes si hay múltiples erpProccesses
            Referencia: objeto.orderItems.map(item => item.itemSku).join(', '), // Concatena los itemSku si hay múltiples orderItems
            Cédula: objeto.orderCustomers.customerRegNumber
        }));

        // Itera sobre cada objeto en el conjunto de datos y muestra los datos
        excelData.forEach(data => {
            console.log('Datos a exportar:', data);

        });

        // Convierte el conjunto de datos a una hoja de cálculo de Excel
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelData);
        // Crea un libro de Excel con la hoja de datos
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        // Convierte el libro de Excel a un búfer de datos
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        // Guarda el archivo Excel utilizando la función saveAsExcelFile
        this.saveAsExcelFile(excelBuffer, 'exported-data');
    }

    // Función privada para guardar el archivo Excel
    private saveAsExcelFile(buffer: any, fileName: string): void {

        const currentDate = new Date();
        const formattedDate = this.paymentsService.formatDate(currentDate);
        const formattedTime = this.paymentsService.formatTime(currentDate);
        const finalFilename = `DF${formattedDate}${formattedTime}`;

        // Crea un objeto Blob con el búfer de datos y el tipo MIME correspondiente
        const data: Blob = new Blob([buffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});

        // Crea un elemento de anclaje (hipervínculo) para descargar el archivo
        const a: HTMLAnchorElement = document.createElement('a');
        const url: string = window.URL.createObjectURL(data);

        // Configura los atributos del elemento de anclaje
        a.href = url;
        a.download = finalFilename + '.xlsx';

        // Añade el elemento de anclaje al cuerpo del documento
        document.body.appendChild(a);

        // Simula un clic en el elemento de anclaje para iniciar la descarga
        a.click();

        // Elimina el elemento de anclaje del cuerpo del documento
        document.body.removeChild(a);

        // Revoca el objeto URL para liberar recursos
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

            // Configuración del paginador-paginator
            this.recentTransactionsDataSource.value.paginator = this.paginator;
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

            this.actualizarNombreBoton();
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

    //Descargar guías pendientes
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
