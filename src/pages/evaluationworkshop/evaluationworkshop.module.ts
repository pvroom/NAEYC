// Components, functions, plugins
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Database } from '../providers/database/database';
import { Localstorage } from '../providers/localstorage/localstorage';

// Pages
import { EvaluationWorkshop } from './evaluationworkshop';

@NgModule({
  declarations: [EvaluationWorkshop],
  imports: [
	FormsModule,
	IonicPageModule.forChild(EvaluationWorkshop)
	],
  exports: [EvaluationWorkshop]

  })

  export class EvaluationWorkshopModule {}


