import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailChambrePage } from './detail-chambre';

@NgModule({
  declarations: [
    DetailChambrePage,
  ],
  imports: [
    IonicPageModule.forChild(DetailChambrePage),
  ],
})
export class DetailChambrePageModule {}
