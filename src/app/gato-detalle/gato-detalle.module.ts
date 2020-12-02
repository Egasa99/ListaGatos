import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GatoDetallePageRoutingModule } from './gato-detalle-routing.module';

import { GatoDetallePage } from './gato-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GatoDetallePageRoutingModule
  ],
  declarations: [GatoDetallePage]
})
export class GatoDetallePageModule {}
