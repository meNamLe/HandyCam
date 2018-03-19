import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PicModalPage } from './pic-modal';

@NgModule({
  declarations: [
    PicModalPage,
  ],
  imports: [
    IonicPageModule.forChild(PicModalPage),
  ],
})
export class PicModalPageModule {}
