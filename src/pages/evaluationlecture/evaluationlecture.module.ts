// Components, functions, plugins
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Database } from '../providers/database/database';
import { Localstorage } from '../providers/localstorage/localstorage';

// Pages
import { EvaluationLecture } from './evaluationlecture';

@NgModule({
  declarations: [EvaluationLecture],
  imports: [
	FormsModule,
	IonicPageModule.forChild(EvaluationLecture)
	],
  exports: [EvaluationLecture]

  })

  export class EvaluationLectureModule {}


