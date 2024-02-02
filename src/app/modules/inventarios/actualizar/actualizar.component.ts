import { ActualizarService } from './../../../marketplace-api/inventory/actualizar-api';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})
export class ActualizarComponent implements OnInit {

  archivoSeleccionado: File | undefined;

  arregloArchivos:File[]=[];

  constructor(private actualizarService:ActualizarService) {
    console.log('El servicio está conectando: ',actualizarService);
  }

  ngOnInit() {}

  //Archivo seleccionado
  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.archivoSeleccionado = inputElement.files ? inputElement.files[0] : null;

    if (!this.archivoSeleccionado) {
        console.error('No se ha seleccionado ningún archivo');
    }else{
        this.arregloArchivos.push(this.archivoSeleccionado)
        console.log('Detalles del archivo');
        console.log('Nombre del archivo', this.archivoSeleccionado.name);
        console.log('Tamaño del archivo:', (this.archivoSeleccionado.size / 1024).toFixed(2), 'KB');
        console.log('Arreglo: '+this.arregloArchivos);
        console.log('Tamaño del arreglo: '+this.arregloArchivos.length);
    }
  }

  //Envío del archivo
  onSubmit() {
    console.log('voy a enviar el archivo');

    if (this.archivoSeleccionado !== null) {
      this.actualizarService.uploadFile(this.archivoSeleccionado).subscribe(
        (respuesta) => {
          console.log('Archivo subido exitosamente', respuesta);
        },
        (error) => {
          console.error('Error al subir el archivo', error);
        }
      );
    } else {
      console.warn('No se ha seleccionado ningún archivo.');
    }
  }


}
