import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderDetail } from 'app/Models/order-not-processed/order-detail';
import { DataService } from 'app/marketplace-api/sales/data-api';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

    order: OrderDetail;

    constructor(private dataService:DataService,
        private dialogRef: MatDialogRef<FormularioComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any){
    }

    ngOnInit(): void {
        this.cargarDetallesDeOrden(this.data.orderNumber);
        console.log('Número de orden recibida: '+ this.data.orderNumber);
    }

    cargarDetallesDeOrden(orderNumber: string):void {
        this.dataService.getOrderById(orderNumber).subscribe(data => {
            this.order = data;
            if (this.order) {
                console.log('Nombre: ' + (this.order.orderCustomers ? this.order.orderCustomers.customerFirstName : ''));
                console.log('Apellido: ' + (this.order.orderCustomers ? this.order.orderCustomers.customerLastName : ''));
                console.log('Cedula: ' + (this.order.orderCustomers ? this.order.orderCustomers.customerRegNumber : ''));
                console.log('Dirección: ' + (this.order.orderCustomers ? this.order.orderCustomers.orderAddressShipping.addressLine : ''));
                console.log('Valor Total: ' + (this.order.orderTotalPrice ? this.order.orderTotalPrice : ''));

                // Mostrar detalles de cada SKU
                this.order.orderItems.forEach(item => {
                    console.log('SKU: ' + item.itemSku);
                    console.log('Cantidad: ' + item.itemQty);
                    console.log('Valor Unitario: ' + item.itemUnitPrice);
                    console.log('Itemid: ' + item.itemId);
                });
            }else{
                console.log('No se encontraron detalles para la orden con el número: ' + orderNumber);
            }
        }, error => {
            console.error('Error al cargar los detalles de la orden:', error);
        });
    }


    guardarOrden(forma: NgForm): void {
        console.log('Clic al botón GUARDAR');
        console.log(forma);
        console.log(forma.value);

        //Verifica si el formulario tiene algun campo incompleto
        if(forma.invalid){
            Object.values(forma.controls).forEach( control => {
                control.markAsTouched();
            });
            return;
        }

        //Actualizar la orden
        if (this.order) {
            this.dataService.updateOrden(this.order).subscribe( response => {
                this.order = response;
                alert('Orden actualizada con éxito!');
                this.cerrarModal();
                //Recargar la página después de la actualización
                window.location.reload();
            });
        } else {
            console.error('No se puede guardar la orden porque no hay datos.');
        }
    }

    cerrarModal(): void {
        this.dialogRef.close();
      }



}


