// Components, functions, plugins
import { Component, HostListener, ChangeDetectionStrategy, ChangeDetectorRef, NgModule } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Database } from './../../providers/database/database';
import { Localstorage } from './../../providers/localstorage/localstorage';
import { ImageLoaderConfig } from 'ionic-image-loader';
import { IonicImageLoader } from 'ionic-image-loader';

// Pages
import { ConversationPage } from '../conversation/conversation';
import { AttendeesPage } from '../attendees/attendees';


@IonicPage()
@Component({
  selector: 'page-conversations',
  templateUrl: 'conversations.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConversationsPage {
	
	public Conversations: any[] = [];

	constructor(public navCtrl: NavController, 
				public navParams: NavParams,
				private storage: Storage,
				private databaseprovider: Database,
				private imageLoaderConfig: ImageLoaderConfig,
				private alertCtrl: AlertController,
				private cd: ChangeDetectorRef,
				public loadingCtrl: LoadingController,
				private localstorage: Localstorage) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad SpeakersPage');
	}


	NavToPage(PageID) {

		var AttendeeID = this.localstorage.getLocalValue('AttendeeID');
	
		switch(PageID) {
			case "AttendeesPage":
				this.navCtrl.push(AttendeesPage, {}, {animate: true, direction: 'forward'});
				break;
	
		}

	};




	ngOnInit() {

		// Load initial data set here
		let loading = this.loadingCtrl.create({
			spinner: 'crescent',
			content: 'Please wait...'
		});

		loading.present();

		// Blank and show loading info
		this.Conversations = [];
		this.cd.markForCheck();
		this.imageLoaderConfig.setFallbackUrl('assets/img/personIcon.png');
		
		// Temporary use variables
		var flags = "li|Time|";
        var DisplayName = "";
		var visDisplayCompany = "";
		var AttendeeID = this.localstorage.getLocalValue('AttendeeID');
		
		// Get the data
		this.databaseprovider.getMessagingData(flags, AttendeeID).then(data => {
			
			console.log("getMessagingData: " + JSON.stringify(data));

			if (data['length']>0) {
				
				for (var i = 0; i < data['length']; i++) {

                    DisplayName = "";

                    // Concatenate fields to build displayable name
                    DisplayName = DisplayName + data[i].LastName + ", " + data[i].FirstName;
					
					// Use Credentials field for Company/Association
					visDisplayCompany = "";
                    if (data[i].Company != "") {
                        visDisplayCompany = data[i].Company;
                    }

					var imageAvatar = "https://naeyc.convergence-us.com/AdminGateway/images/Attendees/" + data[i].ConversationAttendeeID + ".jpg";
					console.log('imageAvatar: ' + imageAvatar);
					

					// Add current record to the list
					this.Conversations.push({
						ConversationAttendeeID: data[i].ConversationAttendeeID,
						AttendeeName: DisplayName,
						AttendeeOrganization: visDisplayCompany,
						AttendeeAvatar: imageAvatar
					});
					

				}


			} else {
				
                // No records to show
				this.Conversations.push({
					ConversationAttendeeID: 0,
					AttendeeName: "No conversations available",
					AttendeeOrganization: "",
					AttendeeAvatar: ""
				});

			}

			this.cd.markForCheck();

			loading.dismiss();
			
		}).catch(function () {
			console.log("Promise Rejected");
		});
					
		// Update LastSync date for next run
		var ThisDirectChatCheck = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
		this.localstorage.setLocalValue('LastDirectChatCheck', ThisDirectChatCheck);
			
		
	}

    ContinueConversation(ConversationAttendeeName, ConversationAttendeeID) {
		
		console.log(ConversationAttendeeID);

		//var AttendeeID = this.localstorage.getLocalValue('AttendeeID');
		
		//if (AttendeeID != '900000' && AttendeeID != '900001' && AttendeeID != '21' && AttendeeID != '22') {
			
			// Alert for successful save
		//	let savealert = this.alertCtrl.create({
		//		title: 'Conversations',
		//		subTitle: 'The direct chat feature is not available at this time.',
		//		buttons: ['Ok']
		//	});
			
		//	savealert.present();

		//} else {
			
			if (ConversationAttendeeID != 0) {
							
				// Navigate to Conversation Details page
				this.localstorage.setLocalValue('ConversationAttendeeName', ConversationAttendeeName);
				this.localstorage.setLocalValue('ConversationAttendeeID', ConversationAttendeeID);
				this.navCtrl.push(ConversationPage, {ConversationAttendeeID: ConversationAttendeeID}, {animate: true, direction: 'forward'});
				
			}
		//}
    };

}



