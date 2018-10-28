// Components, functions, plugins
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Database } from '../providers/database/database';
import { Localstorage } from '../providers/localstorage/localstorage';
import { Ionic2RatingModule } from 'ionic2-rating';

// Pages
import { EducationDetailsPage } from './educationdetails';

@NgModule({
  declarations: [EducationDetailsPage],
  imports: [
	FormsModule,
  IonicPageModule.forChild(EducationDetailsPage),
  Ionic2RatingModule // Put ionic2-rating module here
	],
  exports: [EducationDetailsPage]

  })

  export class EducationDetailsPageModule {}


