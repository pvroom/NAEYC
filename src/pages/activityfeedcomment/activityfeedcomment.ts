import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Database } from './../../providers/database/database';
import { Localstorage } from './../../providers/localstorage/localstorage';

@IonicPage()
@Component({
  selector: 'page-activityfeedcomment',
  templateUrl: 'activityfeedcomment.html',
})
export class ActivityFeedCommentPage {

	public CommentEntry: string;
	
	constructor(private navParams: NavParams, 
				private storage: Storage,
				private databaseprovider: Database,
				private view: ViewController,
				private localstorage: Localstorage) {
					
	}

	ngOnInit() {

	}
	
	closeModal(UserAction) {
		
		var AttendeeID = this.localstorage.getLocalValue('AttendeeID');
		var ActivityFeedID = this.localstorage.getLocalValue('ActivityFeedID');

		if (UserAction == "Save") {

			var UserComment = this.CommentEntry;
			
			var flags = 'ad|' + ActivityFeedID + '|' + UserComment;
			
			this.databaseprovider.getActivityFeedData(flags, AttendeeID).then(data => {
				
				console.log("getActivityFeedData: " + JSON.stringify(data));

				if (data['length']>0) {

                    console.log("Return status: " + data[0].Status);
					this.view.dismiss(UserAction);
					
				}
			
			}).catch(function () {
				console.log("Activity Feed Promise Rejected");
			});
						
		}
		
		if (UserAction == "Cancel") {
			this.view.dismiss(UserAction);
		}
		
	}
}
