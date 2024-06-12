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

  mostrarDatos(opcion: string){
    this.opcionSeleccionada = opcion;
    this.mostrar = true;
    console.log('opcion seleccionada: '+this.opcionSeleccionada);
    console.log('Mostrar: '+this.mostrar);
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

  updateMp(marketplace: InventoryMp) {
    if (!marketplace.name || marketplace.status === undefined || !marketplace.priority || !marketplace.stringId) {
        console.error('Datos inválidos:', marketplace);
        alert('Todos los campos deben estar llenos');
        return;
      }

    const updateData = {
      name: marketplace.name,
      status: !!marketplace.status,
      priority: marketplace.priority,
      stringId: marketplace.stringId,
      updateAt: new Date().toISOString()
    };
    console.log('Datos enviados para actualizar:', updateData);
    this.gestionarService.updateMp([{...marketplace, ...updateData}]).subscribe(() => {
      alert(`Marketplace Pk ${marketplace.marketplacePk} actualizado`);
      window.location.reload();
      this.mostrarMp();
    }, error => {
      console.error('Error actualizando los datos: ', error);
    });
  }

  cancelar(){
    this.opcionSeleccionada = null;
    this.mostrar = false;
  }

}
