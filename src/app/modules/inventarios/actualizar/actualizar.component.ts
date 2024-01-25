import { Component, OnInit } from '@angular/core';
import { ActualizarService } from 'app/marketplace-api/inventory/actualizar-api';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})
export class ActualizarComponent implements OnInit {
  archivoSeleccionado: File | undefined;

  arregloArchivos:File[]=[];

  constructor(private actualizarService: ActualizarService) {
    console.log('El servicio está conectando: ',actualizarService);
  }

  ngOnInit() {}

  //Archivo seleccionado
  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.archivoSeleccionado = inputElement.files ? inputElement.files[0] : null;

    if (this.archivoSeleccionado) {
        this.arregloArchivos.push(this.archivoSeleccionado)
        console.log('Detalles del archivo');
        console.log('Nombre del archivo', this.archivoSeleccionado.name);
        console.log('Tamaño del archivo:', (this.archivoSeleccionado.size / 1024).toFixed(2), 'KB');
    }else{
        console.log('No hay archivo');
    }
  }
  //Envío del archivo
  onSubmit() {
    if (this.archivoSeleccionado) {
      this.actualizarService.uploadFile(this.archivoSeleccionado).subscribe(
        (respuesta) => {
          console.log('Archivo subido exitosamente', respuesta);
        },
        (error: HttpErrorResponse) => {
          console.error('Error al subir el archivo', error);
        }
      );
    } else {
      console.warn('No se ha seleccionado ningún archivo.');
    }
  }
}
