import { GestionarService } from './../../../marketplace-api/inventory/gestionar-api';
import { Component, OnInit } from '@angular/core';
import { InventoryMp } from 'app/Models/inventory-mp';

@Component({
  selector: 'app-gestionarmp',
  templateUrl: './gestionarmp.component.html',
  styleUrls: ['./gestionarmp.component.css']
})
export class GestionarmpComponent implements OnInit {

    mostrar: boolean = false;

    opcionSeleccionada: string | null = null;

    datos: InventoryMp[];

    nuevoDato: InventoryMp[] = [{
        marketplacePk: 157490,
        shopYujuPk: 333333,
        name: "Exito",
        status: 1,
        priority: 6,
        stringId: "EX",
        createtAt: "2021-10-21T15:05:24",
        updateAt: "2021-11-16T08:21:09"
      },
      {
        marketplacePk: 157487,
        shopYujuPk: 111,
        name: "Dafiti",
        status: 1,
        priority: 2,
        stringId: "DF",
        createtAt: "2021-10-21T15:05:24",
        updateAt: "2021-11-16T08:21:09"
      },
      {
        marketplacePk: 147488,
        shopYujuPk: 111,
        name: "Mercado Libre",
        status: 1,
        priority: 3,
        stringId: "MC",
        createtAt: "2021-10-21T15:05:24",
        updateAt: "2022-03-02T09:01:34"
      },
      {
        marketplacePk: 157489,
        shopYujuPk: 111,
        name: "Linio",
        status: 1,
        priority: 5,
        stringId: "LI",
        createtAt: "2021-10-21T15:05:24",
        updateAt: "2021-11-16T08:21:09"
      },
      {
        marketplacePk: 157491,
        shopYujuPk: 444444,
        name: "Falabella",
        status: 1,
        priority: 4,
        stringId: "FL",
        createtAt: "2021-10-21T15:05:24",
        updateAt: "2021-11-16T08:21:09"
      },
      {
        marketplacePk: 157493,
        shopYujuPk: 666666,
        name: "Mercado Shop",
        status: 1,
        priority: 1,
        stringId: "MS",
        createtAt: "2021-11-15T11:32:12",
        updateAt: "2021-11-16T08:21:09"
      }];

  constructor( private gestionarService:GestionarService) {
    console.log('Servicio conectado: '+ gestionarService);
   }

  ngOnInit() {

    /*this.gestionarService.get().subscribe( datos => {
        this.datos = datos;
        if(this.datos.length <= 0){
            //this.datos.push(this.nuevoDato);
            console.log('No hay datos');
        }
        console.log('datos cargados: '+ this.datos);
    })*/
    this.datos = [...this.nuevoDato];
    console.log('datos: '+this.datos);

  }

  mostrarDatos(opcion: string){
    this.opcionSeleccionada = opcion;
    this.mostrar = true;
    console.log('opcion seleccionada: '+this.opcionSeleccionada);
    console.log('opcion seleccionada: '+this.mostrar);
  }


}
