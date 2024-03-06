import { OrderDetail } from './../../../Models/order-not-processed/order-detail';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { DataService } from 'app/marketplace-api/sales/data-api';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

    order:OrderDetail;

    constructor(private dataService:DataService,
        private dialogRef: MatDialogRef<FormularioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
    }

    ngOnInit(): void {
        this.cargarDetallesDeOrden(this.data.orderNumber);
        console.log('Número de orden recibida: '+ this.data.orderNumber);

    }

    cargarDetallesDeOrden(orderNumber: string):void{
        this.dataService.getOrderById(orderNumber).subscribe( order => {
            this.order = order;
            console.log('Detalle de la orden: '+ this.order);
        });
    }

    guardarOrden():void{
        this.dataService.updateOrden(this.order).subscribe( response => {
            console.log('orden actualizada con éxito', response);
            alert('Orden actualizada con éxito');
        });
    }

    //cerrarModal(): void {
        //this.dialogRef.close();
      //}



}


