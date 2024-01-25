import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministracionComponent } from './administracion.component';
import { HttpClientModule } from '@angular/common/http';
import { AdministrarService } from 'app/marketplace-api/inventory/administrar-api';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [AdministracionComponent],
  providers: [AdministrarService]
})
export class AdministracionModule { }
