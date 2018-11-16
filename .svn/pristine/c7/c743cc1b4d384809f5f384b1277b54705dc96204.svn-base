// Components, functions, plugins
import { Component, HostListener, ChangeDetectionStrategy, ChangeDetectorRef, NgModule } from '@angular/core';
import { Modal, ModalController, ModalOptions, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Database } from './../../providers/database/database';
import { Localstorage } from './../../providers/localstorage/localstorage';
import { FabContainer } from 'ionic-angular';
import { ImageLoaderConfig } from 'ionic-image-loader';
import { ElementRef, ViewChild } from '@angular/core';
import { VirtualScroll, Content } from 'ionic-angular';

import * as moment from 'moment';

declare var dateFormat: any;

@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ActivityPage {

	@ViewChild(Content) content: Content;
	
	public activityFeedListing: any[] = [];
	public date: any;

	constructor(public navCtrl: NavController, 
				public navParams: NavParams,
				private storage: Storage,
				private databaseprovider: Database,
				private imageLoaderConfig: ImageLoaderConfig,
				private modal: ModalController,
				private cd: ChangeDetectorRef,
				public loadingCtrl: LoadingController,
				private localstorage: Localstorage) {
	}

	ionViewWillEnter() {
		
		console.log('ionViewWillEnter ActivityPage');	
		
		// Update Comment count here when coming back from a posting
		var ActivityFeedID = this.localstorage.getLocalValue('ActivityFeedID');
		var ActivityFeedIDCCount = this.localstorage.getLocalValue('ActivityFeedIDCCount');
		var ActivityFeedArrayString = this.localstorage.getLocalValue('ActivityFeedObject');
		
		this.LoadData();
		
	}

	ionViewDidEnter() {
		
		console.log('ionViewDidEnter ActivityPage');

	}

	timeDifference(laterdate, earlierdate) {
		
		//console.log('Moment timeDifference input, laterdate: ' + laterdate + ', earlierdate: ' + earlierdate);
		//console.log('Moment timeDifference output: ' + moment(earlierdate).fromNow());
		return moment(earlierdate).fromNow();
				
	}

	//ngOnInit() {
		
	//	this.LoadData();
		
	//}
	
	LoadData() {

		// Load initial data set here
		let loading = this.loadingCtrl.create({
			spinner: 'crescent',
			content: 'Please wait...'
		});

		loading.present();

		// Blank and show loading info
		this.activityFeedListing = [];
		this.cd.markForCheck();
		this.imageLoaderConfig.setFallbackUrl('assets/img/personIcon.png');
		
		// Temporary use variables
		var flags = "li|Alpha|0";
        var DisplayName = "";
        var SQLDate;
        var DisplayDateTime;
        var dbEventDateTime;
		var afWebLink;
		var ActivityFeedID = this.localstorage.getLocalValue('ActivityFeedID');
			
		
		// Get the data
		this.databaseprovider.getActivityFeedData(flags, "0").then(data => {
			
			//console.log(JSON.stringify(data));
			
			if (data['length']>0) {
				
				for (var i = 0; i < data['length']; i++) {
					
					//console.log('Processing afID: ' + data[i].afID);
					
					var imageAvatar = "https://naeyc.convergence-us.com/AdminGateway/images/Attendees/" + data[i].AttendeeID + ".jpg";
					//console.log(imageAvatar);
					
					var imageAttachment = data[i].afImageAttachment;
					var imageAttached = false;
					if (imageAttachment != "") {
						imageAttachment = "https://naeyc.convergence-us.com/AdminGateway/images/ActivityFeedAttachments/" + imageAttachment;
						imageAttached = true;
					}
					//console.log('Activity Feed, imageAttached: ' + imageAttached);
					//console.log('Activity Feed, imageAttachment: ' + imageAttachment);
					
					DisplayName = data[i].PosterFirst + " " + data[i].PosterLast;
					//console.log('Activity Feed, DisplayName: ' + DisplayName);

					afWebLink = false;
					if (data[i].LinkedURL != "" && data[i].LinkedURL !== null) {
						afWebLink = true;
					}
					//console.log('Activity Feed, Linked URL available: ' + afWebLink);
					//console.log('Activity Feed, Linked URL: ' + data[i].LinkedURL);

					dbEventDateTime = data[i].Posted.substring(0, 19);
					dbEventDateTime = dbEventDateTime.replace(/-/g, '/');
					dbEventDateTime = dbEventDateTime.replace(/T/g, ' ');
					SQLDate = new Date(dbEventDateTime);
					DisplayDateTime = dateFormat(SQLDate, "mm/dd h:MMtt");
					//console.log('Activity Feed, DisplayDateTime: ' + DisplayDateTime);
				
					
					var CurrentDateTime2 = new Date().toUTCString();
					//console.log('Activity Feed, CurrentDateTime2: ' + CurrentDateTime2);
					var CurrentDateTime = dateFormat(CurrentDateTime2, "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'");
					//console.log('Activity Feed, CurrentDateTime: ' + CurrentDateTime);
					
					//console.log('Activity Feed, afDateTime: ' + data[i].afDateTime);
					dbEventDateTime = data[i].afDateTime.substring(0, 19);
					dbEventDateTime = dbEventDateTime.replace(' ', 'T');
					dbEventDateTime = dbEventDateTime + 'Z';
					//console.log('Activity Feed, dbEventDateTime: ' + dbEventDateTime);
					var PostedDate2 = new Date(dbEventDateTime);
					//console.log('Activity Feed, PostedDate2: ' + PostedDate2);
					var PostedDate = dateFormat(PostedDate2, "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'");
					//console.log('Activity Feed, PostedDate: ' + PostedDate);
					var TimeDifference = this.timeDifference(CurrentDateTime, PostedDate);					
					//console.log('Activity Feed, TimeDifference: ' + TimeDifference);

					// Show the current record
					this.activityFeedListing.push({
						afID: data[i].afID,
						ActivityFeedCommentAvatar: imageAvatar,
						AttendeeID: data[i].AttendeeID,
						ActivityFeedCommentBy: DisplayName,
						ActivityFeedCommentPosted: DisplayDateTime,
						ActivityFeedAttachment: imageAttachment,
						ActivityFeedComment: data[i].afMessage,
						ActivityFeedLikesCounter: data[i].afLikesCounter,
						ActivityFeedCommentsCounter: data[i].CommentsCount,
						ActivityFeedCommentPostedDuration: TimeDifference,
						ActivityFeedAttached: imageAttached,
						ActivityFeedLinkedURL: data[i].LinkedURL,
						showActivityFeedLinkedURL: afWebLink
					});

				}

				this.cd.markForCheck();

				// Scroll back to last viewed entry when 
				// coming back from a posting
				if (parseInt(ActivityFeedID) > 0 ) {
					setTimeout(() => {
						this.scrollTo("afID" + ActivityFeedID);
					}, 2000);
				}
		
			} else {
				
                // No records to show
				this.activityFeedListing.push({
						afID: 0,
						ActivityFeedCommentAvatar: "No records found",
						AttendeeID: 0,
						ActivityFeedCommentBy: "",
						ActivityFeedCommentPosted: "",
						ActivityFeedAttachment: "",
						ActivityFeedComment: "",
						ActivityFeedLikesCounter: "",
						ActivityFeedCommentsCounter: "",
						ActivityFeedCommentPostedDuration: "",
						ActivityFeedAttached: false,
						ActivityFeedLinkedURL: data[i].LinkedURL,
						showActivityFeedLinkedURL: false
				});

				this.cd.markForCheck();

			}

			loading.dismiss();
			

		}).catch(function () {
			console.log("Activity Feed Promise Rejected");
			loading.dismiss();
		});
					
	}

	scrollTo(element:string) {
		let elem = document.getElementById(element);
		var box = elem.getBoundingClientRect();

		var body = document.body;
		var docEl = document.documentElement;

		var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
		var clientTop = docEl.clientTop || body.clientTop || 0;
		var top  = box.top +  scrollTop - clientTop;
		var cDim = this.content.getContentDimensions();

		var scrollOffset = Math.round(top) + cDim.scrollTop - cDim.contentTop;

		this.content.scrollTo(0, scrollOffset, 500);
	}
  
	UpdateLikes(activityFeedItem, activityfeedID) {

		console.log('Likes button tapped');
		
		this.localstorage.setLocalValue('ActivityFeedLikesButton', '1');
		
		var flags = "lu|" + activityfeedID;

		// Get the data
		this.databaseprovider.getActivityFeedData(flags, "0").then(data => {
			
			console.log(JSON.stringify(data));
			
			if (data['length']>0) {
				
				if (data[0].Status = "Saved") {
					activityFeedItem.ActivityFeedLikesCounter = data[0].NewLikes;
					this.cd.markForCheck();
				}
				
			}
			
		}).catch(function () {
			console.log("UpdateLikes Promise Rejected");
		});

	}


    ActivityFeedDetails(activityFeedItem, activityfeedID) {

		this.localstorage.setLocalValue('ActivityFeedObject', JSON.stringify(activityFeedItem));
					
		console.log('Activity details requested');
		
		if (activityfeedID != 0) {
			
			var LikesButton = "";
			LikesButton = this.localstorage.getLocalValue('ActivityFeedLikesButton');
			console.log('Likes button check: ' + LikesButton);
			if (LikesButton == '1') {
				this.localstorage.setLocalValue('ActivityFeedLikesButton', '0');
			} else {
				console.log('Going to activity feed: ' + activityfeedID);
				// Navigate to Activity Feed Details page
				this.localstorage.setLocalValue('ActivityFeedID', activityfeedID);
				this.navCtrl.push('ActivityFeedDetailsPage', {ActivityFeedID: activityfeedID}, {animate: true, direction: 'forward'});
			}
		}
		
    };

	AttendeeDetails(oAttendeeID) {
		
		console.log('oAttendeeID: ' + oAttendeeID);
		
		this.localstorage.setLocalValue("oAttendeeID", oAttendeeID);
		this.navCtrl.push('AttendeesProfilePage', {oAttendeeID: oAttendeeID}, {animate: true, direction: 'forward'});

    }

	AddPosting(fab: FabContainer) {
		
		// Disable other click event
		this.localstorage.setLocalValue('afFABClicked', '1');
		
		console.log('Set FAB Override, AddPosting');
		
		const AddPostingModalOptions: ModalOptions = {
			enableBackdropDismiss: false
		};

		const AddPostingModal: Modal = this.modal.create('ActivityFeedPostingPage', {}, AddPostingModalOptions);

		AddPostingModal.present();

		AddPostingModal.onDidDismiss((data) => {
			this.localstorage.setLocalValue('afFABClicked', '0');
			// If saved, then re-run ngOnInit to refresh the listing
			if (data == "Save") {
				this.LoadData();
			}
		});
		
		fab.close();

	}

	ViewLeaderboard(fab: FabContainer) {
		
		// Disable other click event
		this.localstorage.setLocalValue('afFABClicked', '1');

		console.log('Set FAB Override, ViewLeaderboard');
		
		const ViewLeaderboardModalOptions: ModalOptions = {
			enableBackdropDismiss: false
		};

		const ViewLeaderboardModal: Modal = this.modal.create('ActivityFeedLeaderboardPage', {}, ViewLeaderboardModalOptions);

		ViewLeaderboardModal.present();

		ViewLeaderboardModal.onDidDismiss((data) => {
			this.localstorage.setLocalValue('afFABClicked', '0');
		});
		
		fab.close();

	}

	navToWeb(wURL) {
		
		if (wURL != "") {
            if ((wURL.substring(0, 7).toLowerCase() != "http://") && (wURL.substring(0, 8).toLowerCase() != "https://")) {
                wURL = "http://" + wURL;
            }
			
			console.log('Attendee Profile Details: Navigating to: ' + wURL);
            window.open(wURL, '_system');
		}

	}
	
}