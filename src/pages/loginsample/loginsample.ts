import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-loginsample',
  templateUrl: 'loginsample.html',
})
export class LoginSamplePage {

	public CommentEntry: string;
	
	constructor(private navParams: NavParams, 
				private view: ViewController) {
					
	}
	
	closeModal() {
		
		this.view.dismiss();
		
	}
}
