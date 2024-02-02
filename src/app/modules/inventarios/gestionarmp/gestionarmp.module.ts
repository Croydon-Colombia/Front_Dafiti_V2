import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionarmpComponent } from './gestionarmp.component';
import { HttpClientModule } from '@angular/common/http';
import { GestionarService } from 'app/marketplace-api/inventory/gestionar-api';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers:[GestionarService]
})
export class GestionarmpModule { }
