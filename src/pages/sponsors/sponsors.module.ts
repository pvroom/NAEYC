import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SponsorsPage } from './sponsors';
import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  declarations: [
    SponsorsPage,
  ],
  imports: [
	IonicImageLoader,
    IonicPageModule.forChild(SponsorsPage),
  ],
})
export class SponsorsPageModule {}
