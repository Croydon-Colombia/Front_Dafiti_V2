
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActualizarComponent } from './actualizar.component';
import { ActualizarService } from 'app/marketplace-api/inventory/actualizar-api';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ActualizarComponent],
  providers: [ActualizarService]
})
export class ActualizarModule { }
