// Components, functions, plugins
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Database } from '../providers/database/database';
import { Localstorage } from '../providers/localstorage/localstorage';
import { IonicImageLoader } from 'ionic-image-loader';

// Pages
import { SpeakerDetailsPage } from './speakerdetails';

@NgModule({
  declarations: [SpeakerDetailsPage],
  imports: [
	FormsModule,
	IonicImageLoader,
	IonicPageModule.forChild(SpeakerDetailsPage)
	],
  exports: [SpeakerDetailsPage]

  })

  export class SpeakerDetailsPageModule {}


