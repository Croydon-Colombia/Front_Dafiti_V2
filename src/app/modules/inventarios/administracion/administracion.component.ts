import { AdministrarService } from './../../../marketplace-api/inventory/administrar-api';
import { Component, OnInit, inject } from '@angular/core';
import { InventoryParameters } from 'app/Models/inventory-parameters';


@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit {

    parametros: InventoryParameters[] = [];

    /*nuevoDato: InventoryParameters[] = [{
        createdAt: '2021-01-24T12:00:00',
        description: 'Nuevo parámetro',
        id: 123,
        keyVal: 'nuevo_key',
        updateAt: '2021-01-24T12:00:00',
        valKey: 'nuevo_valor'
      },
      {
        id: 2,
        keyVal: "min_mp_qty",
        valKey: "1",
        createdAt: "2021-10-24T20:23:39",
        updateAt: "2023-03-14T11:21:07",
        description: "Cantidad Minima por MarketPlace"
      }];
      */

  constructor( private administrarService:AdministrarService) {
    console.log('Servicio conectado: ', administrarService);
   }

  ngOnInit() {

    this.administrarService.get().subscribe( data => {
        this.parametros = data;
        if(this.parametros.entries.length <= 0){
            console.log('Datos defauld: ' +  this.parametros);
        }
        console.log('datos: '+ this.parametros);
    })

  }


  }





