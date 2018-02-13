import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListChambreOfEtagePage } from './list-chambre-of-etage';

@NgModule({
  declarations: [
    ListChambreOfEtagePage,
  ],
  imports: [
    IonicPageModule.forChild(ListChambreOfEtagePage),
  ],
})
export class ListChambreOfEtagePageModule {}
