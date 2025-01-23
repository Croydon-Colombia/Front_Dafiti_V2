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

  constructor( private administrarService:AdministrarService) {
    console.log('Servicio conectado: ', administrarService);
   }

  ngOnInit() {
    this.loadParameters();
  }

  loadParameters(){
    this.administrarService.getAllParameters().subscribe( data => {
        this.parametros = data;
        if(this.parametros.entries.length <= 0){
            console.log('Datos defauld: ' +  this.parametros);
        }
        console.log('datos: '+ this.parametros);
    })
  }

  updateParameter(parameter: InventoryParameters) {
    this.administrarService.updateParameter(parameter).subscribe(() => {
      console.log(`Parámetro ${parameter.id} actualizado`);
    });
  }

  updateAllParameters() {
    alert('Actualizando...!');
    this.parametros.forEach(parametro => {
      this.updateParameter(parametro);
    });
  }

  }





