import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CodifierPage } from './codifier';

@NgModule({
  declarations: [
    CodifierPage,
  ],
  imports: [
    IonicPageModule.forChild(CodifierPage),
  ],
})
export class CodifierPageModule {}
