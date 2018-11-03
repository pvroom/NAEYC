// Components, functions, plugins
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, NgModule } from '@angular/core';
import { IonicPage, Modal, ModalController, ModalOptions, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Localstorage } from './../../providers/localstorage/localstorage';
import { ImageLoaderConfig } from 'ionic-image-loader';
import { Database } from './../../providers/database/database';

// Preload Pages
import { ConversationPage } from '../conversation/conversation';


@IonicPage()
@Component({
  selector: 'page-attendeesprofile',
  templateUrl: 'attendeesprofile.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttendeesProfilePage {

	public visualImageURL: string;
	public showProfileImage: boolean;
	public showTextAvatar: boolean;
	
	// Attendee ProfilePage
	public prAttendeeName: string;
	public prAttendeeTitle: string;
	public prAttendeeOrganization: string;
	public prConversationAttendeeID: string;
	
	// Social Media icons
	public statusTwitter: string;
	public statusFacebook: string;
	public statusLinkedIn: string;
	public statusInstagram: string;
	public statusPinterest: string;
	
	public smURLTwitter: string;
	public smURLFacebook: string;
	public smURLLinkedIn: string;
	public smURLInstagram: string;
	public smURLPinterest: string;
	
	// Bookmark button
	public visBookmarkAddRemoveButton: string;
	public btnBookmarkManagement = false;
	
	constructor(public navCtrl: NavController, 
				public navParams: NavParams,
				private databaseprovider: Database,
				public loadingCtrl: LoadingController,
				private alertCtrl: AlertController,
				private modal: ModalController,
				private imageLoaderConfig: ImageLoaderConfig,
				private cd: ChangeDetectorRef,
				private localstorage: Localstorage) {
	}


	ionViewDidLoad() {
		console.log('ionViewDidLoad ProfilePage');
	}

	ngOnInit() {

		// Get AttendeeID
		var AttendeeID = this.localstorage.getLocalValue('AttendeeID');
		var oAttendeeID = this.localstorage.getLocalValue('oAttendeeID');
		this.prConversationAttendeeID = oAttendeeID;
		
		// Setup defaul tprofile image
		this.imageLoaderConfig.setFallbackUrl('assets/img/personIcon.png');
		//this.imageLoaderConfig.enableFallbackAsPlaceholder(true);
		
		// Get profile image if available
		this.visualImageURL = "https://naeyc.convergence-us.com/AdminGateway/images/Attendees/" + oAttendeeID + '.jpg';
				
		this.cd.markForCheck();

		// Get profile data
		var flags = "pr|" + AttendeeID;
		
		this.databaseprovider.getDatabaseStats(flags, oAttendeeID).then(data => {

			if (data['length'] > 0) {

				console.log('getDatabaseStats: ' + JSON.stringify(data));
				
				// Display attendee information
				this.prAttendeeName = data[0].FirstName + " " + data[0].LastName;
				this.prAttendeeTitle = data[0].Title;
				this.prAttendeeOrganization = data[0].Company;
				
				// Set color indications for social media icons
				if(data[0].showTwitter == "Y") {
					this.statusTwitter = "green";
					this.smURLTwitter = data[0].smTwitter;
				} else {
					this.statusTwitter = "white";
					this.smURLTwitter = "";
				}
				if(data[0].showFacebook == "Y") {
					this.statusFacebook = "green";
					this.smURLFacebook = data[0].smFacebook;
				} else {
					this.statusFacebook = "white";
					this.smURLFacebook = "";
				}
				if(data[0].showLinkedIn == "Y") {
					this.statusLinkedIn = "green";
					this.smURLLinkedIn = data[0].smLinkedIn;
				} else {
					this.statusLinkedIn = "white";
					this.smURLLinkedIn = "";
				}
				if(data[0].showInstagram == "Y") {
					this.statusInstagram = "green";
					this.smURLInstagram = data[0].smInstagram;
				} else {
					this.statusInstagram = "#fff";
					this.smURLInstagram = "";
				}
				if(data[0].showPinterest == "Y") {
					this.statusPinterest = "green";
					this.smURLPinterest = data[0].smPinterest;
				} else {
					this.statusPinterest = "white";
					this.smURLPinterest = "";
				}

                // Values for Bookmark Management
                this.localstorage.setLocalValue("BookmarkID", oAttendeeID);
                this.localstorage.setLocalValue("BookmarkType", "Attendees");

                if (data[0].Bookmarked != "0") {
                    this.visBookmarkAddRemoveButton = "Remove from Bookmarks";
                } else {
                    this.visBookmarkAddRemoveButton = "Add to Bookmarks";
                }
				
			}

			this.cd.markForCheck();
			
		}).catch(function () {
			console.log("Promise Rejected");
		});
		
        // -------------------
        // Get Attendee Status
        // -------------------
		console.log('Attendee Button Management, AttendeeID: ' + AttendeeID);
		if (AttendeeID == '0' || AttendeeID == '') {
			this.btnBookmarkManagement = false;
		} else {
			this.btnBookmarkManagement = true;
		}
		
	}

	StartContinueConversation(ConversationAttendeeName, ConversationAttendeeID) {

		var AttendeeID = this.localstorage.getLocalValue('AttendeeID');
		
		//if (AttendeeID != '900000' && AttendeeID != '900001' && AttendeeID != '21' && AttendeeID != '22') {
			
			// Alert for successful save
		//	let savealert = this.alertCtrl.create({
		//		title: 'Conversations',
		//		subTitle: 'The direct chat feature is not available at this time.',
		//		buttons: ['Ok']
		//	});
			
		//	savealert.present();

		//} else {

			this.localstorage.setLocalValue('ConversationAttendeeName', ConversationAttendeeName);
			this.localstorage.setLocalValue('ConversationAttendeeID', ConversationAttendeeID);
			this.navCtrl.push(ConversationPage, {ConversationAttendeeID: ConversationAttendeeID}, {animate: true, direction: 'forward'});
			
		//}

	}

	viewSocialMedia(smURL) {
		
		if (smURL != "") {
			console.log('Attendee Profile Details: Navigating to: ' + smURL);
            window.open(smURL, '_system');
		}

	}

    BookmarkManagement() {
		
		console.log("Begin BookmarkManagement process...");

		var AttendeeID = this.localstorage.getLocalValue('AttendeeID');

        var BookmarkType = this.localstorage.getLocalValue("BookmarkType");
        var BookmarkID = this.localstorage.getLocalValue("BookmarkID");

		var flags = '';
		
		// Starting variables
		console.log("AttendeeID: " + AttendeeID);
		console.log("BookmarkType: " + BookmarkType);
		console.log("BookmarkID: " + BookmarkID);

		this.cd.markForCheck();

        // Get last update performed by this app
        var LastUpdateDate = this.localstorage.getLocalValue("LastUpdateDate");
        if (LastUpdateDate == null) {
            // If never, then set variable and localStorage item to NA
			LastUpdateDate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
            this.localstorage.setLocalValue("LastUpdateDate", LastUpdateDate);
        }

        if (this.visBookmarkAddRemoveButton == "Add to Bookmarks") {

            // ------------------------
            // Add item to Bookmarks List
            // ------------------------
			flags = 'cb|0|' + BookmarkType + '|' + BookmarkID;
			console.log("flags: " + flags);
			
			this.databaseprovider.getBookmarksData(flags, AttendeeID).then(data => {
				
				console.log("getBookmarksData: " + JSON.stringify(data));

				if (data['length']>0) {

                    console.log("Return status: " + data[0].Status);

					if (data[0].Status == "Saved") {
						
						this.visBookmarkAddRemoveButton = "Remove from Bookmarks";
						this.cd.markForCheck();
						
					} else {
						
						console.log("Return query: " + data[0].Query);
						
						let alert = this.alertCtrl.create({
							title: 'Bookmarks',
							subTitle: 'Unable to add the item to your bookmark list at this time. Please try again shortly.',
							buttons: ['OK']
						});
						
						alert.present();
						
					}
					
				}

			}).catch(function () {
				console.log("Promise Rejected");
			});
			
        } else {

            // -----------------------
            // Remove Item from Bookmarks List
            // -----------------------
			flags = 'rb|0|' + BookmarkType + '|' + BookmarkID;
			console.log("flags: " + flags);
			
			this.databaseprovider.getBookmarksData(flags, AttendeeID).then(data => {
				
				console.log("getBookmarksData: " + JSON.stringify(data));

				if (data['length']>0) {

                    console.log("Return status: " + data[0].Status);

					if (data[0].Status == "Saved") {
						
						this.visBookmarkAddRemoveButton = "Add to Bookmarks";
						this.cd.markForCheck();
						
					} else {
						
						console.log("Return query: " + data[0].Query);
						
						let alert = this.alertCtrl.create({
							title: 'Bookmarks',
							subTitle: 'Unable to remove the item from your bookmark list at this time. Please try again shortly.',
							buttons: ['OK']
						});
						
						alert.present();
						
					}
					
				}

			}).catch(function () {
				console.log("Promise Rejected");
			});

        }

    };

}

