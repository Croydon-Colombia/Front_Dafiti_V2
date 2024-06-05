import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionarmpComponent } from './gestionarmp.component';
import { HttpClientModule } from '@angular/common/http';
import { GestionarService } from 'app/marketplace-api/inventory/gestionar-api';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  declarations: [],
  providers:[GestionarService]
})
export class GestionarmpModule { }
