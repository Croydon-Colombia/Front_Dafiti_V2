
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActualizarService } from 'app/marketplace-api/inventory/actualizar-api';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [ActualizarService]
})
export class ActualizarModule { }
