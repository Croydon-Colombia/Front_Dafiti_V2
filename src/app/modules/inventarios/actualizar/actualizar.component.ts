import { ActualizarService } from './../../../marketplace-api/inventory/actualizar-api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})
export class ActualizarComponent implements OnInit {

  archivoSeleccionado: File | undefined;

  constructor(private actualizarService: ActualizarService) {
    console.log('El servicio está conectando: ', actualizarService);
  }

  ngOnInit() {}

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.archivoSeleccionado = inputElement.files ? inputElement.files[0] : undefined;

    if (!this.archivoSeleccionado) {
        console.error('No se ha seleccionado ningún archivo');
    } else {
        console.log('Detalles del archivo');
        console.log('Nombre del archivo', this.archivoSeleccionado.name);
        console.log('Tamaño del archivo:', (this.archivoSeleccionado.size / 1024).toFixed(2), 'KB');
    }
  }

  onSubmit() {
    console.log('voy a enviar el archivo');

    if (this.archivoSeleccionado) {
      this.actualizarService.uploadFile(this.archivoSeleccionado).subscribe(
        (respuesta) => {
          console.log('Archivo enviado exitosamente', respuesta);
          alert('Archivo enviado exitosamente!');
          // Recargar la página después de 1 segundo (opcional)
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        },
        (error) => {
          console.error('Error al enviar el archivo', error);
        }
      );
    } else {
      console.warn('No se ha seleccionado ningún archivo.');
    }
  }
}
