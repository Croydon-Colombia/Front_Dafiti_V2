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

    marketplaces: InventoryMp[] = [];

  constructor( private gestionarService: GestionarService) {
    console.log('Servicio conectado de Gestionar MP', gestionarService);
   }

  ngOnInit() {
    this.mostrarMp();
  }

  mostrarMp(){
    this.gestionarService.get().subscribe( data => {
        this.marketplaces = data;

        if(this.marketplaces.length <= 0){
            console.log('No hay datos');
        }
        console.log('Cargando datos....');
    })
  }

  mostrarDatos(opcion: string){
    this.opcionSeleccionada = opcion;
    this.mostrar = true;
    console.log('opcion seleccionada: '+this.opcionSeleccionada);
    console.log('Mostrar: '+this.mostrar);
  }


}
