// Components, functions, plugins
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, NgModule, ViewChild, ElementRef } from '@angular/core';
import { Modal, ModalController, ModalOptions, IonicPage, NavController, NavParams, LoadingController, AlertController, Events, Content } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Database } from './../../providers/database/database';
import { Localstorage } from './../../providers/localstorage/localstorage';
import { FabContainer } from 'ionic-angular';
import { ViewEncapsulation } from '@angular/core';

// Pages
import { LoginPage } from '../login/login';

declare var dateFormat: any;

@IonicPage()
@Component({
  selector: 'page-activityfeeddetails',
  templateUrl: 'activityfeeddetails.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ActivityFeedDetailsPage {

	@ViewChild(Content) content: Content;
	@ViewChild('chat_input') messageInput: ElementRef;

	public ActivityFeedID: string;
	public ActivityFeedCommentAvatar: string;
	public ActivityFeedCommentBy: string;
	public ActivityFeedCommentPosted: string;
	public ActivityFeedComment: string;
	public ActivityFeedLikesCounter: string;
	public ActivityFeedCommentsCounter: string;
	public ActivityFeedCommentPostedDuration: string;
	public ActivityFeedAttachment: string;
	
	public afComments: any[] = [];
	showEmojiPicker = false;
	public CommentEntry = '';
	
	constructor(public navCtrl: NavController, 
				public navParams: NavParams,
				private storage: Storage,
				private databaseprovider: Database,
				private cd: ChangeDetectorRef,
				private alertCtrl: AlertController, 
				public events: Events,
				public loadingCtrl: LoadingController,
				private modal: ModalController,
				private localstorage: Localstorage) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ActivityFeedDetailsPage');
	}

	AddComment(fab: FabContainer) {
		
		const AddCommentModalOptions: ModalOptions = {
			enableBackdropDismiss: false
		};

		const AddCommentModal: Modal = this.modal.create('ActivityFeedCommentPage', {}, AddCommentModalOptions);

		AddCommentModal.present();

		AddCommentModal.onDidDismiss((data) => {
			// If saved, then re-run ngOnInit to refresh the listing
			if (data == "Save") {
				this.ngOnInit();
			}
		});
		
		fab.close();

	}

	onFocus() {
		this.showEmojiPicker = false;
		this.content.resize();
		this.scrollToBottom();
	}

	scrollToBottom() {
		setTimeout(() => {
			if (this.content.scrollToBottom !== null) {
				if (this.content.scrollToBottom) {
					this.content.scrollToBottom();
				}
			}
		}, 400)
	}

	SaveComment() {
		
		var AttendeeID = this.localstorage.getLocalValue('AttendeeID');
		var ActivityFeedID = this.localstorage.getLocalValue('ActivityFeedID');
		var UserComment = this.CommentEntry;
		var flags = 'ad|' + ActivityFeedID + '|' + UserComment;
		
		this.databaseprovider.getActivityFeedData(flags, AttendeeID).then(data => {
			
			console.log("getActivityFeedData: " + JSON.stringify(data));

			if (data['length']>0) {

				this.CommentEntry = '';
				
				// Reload comments
				console.log("Return status: " + data[0].Status);
				this.ReloadComments();
				
			}
		
		}).catch(function () {
			console.log("Activity Feed Promise Rejected");
		});

	}
	
	timeDifference(laterdate, earlierdate) {
		
		var difference = laterdate.getTime() - earlierdate.getTime();
	 
		var daysDifference = Math.floor(difference/1000/60/60/24);
		difference -= daysDifference*1000*60*60*24
	 
		var hoursDifference = Math.floor(difference/1000/60/60);
		difference -= hoursDifference*1000*60*60
	 
		var minutesDifference = Math.floor(difference/1000/60);
		difference -= minutesDifference*1000*60
	 
		var secondsDifference = Math.floor(difference/1000);
		var stringOutput = "";
		
		if (daysDifference>0) {
			
			stringOutput = daysDifference + ' day/s';
			
		} else {
		
			if (hoursDifference>0) {
				
				stringOutput = hoursDifference + ' hr/s';
			
			} else {
		
				if (minutesDifference>0) {

					stringOutput = minutesDifference + ' min/s';

				} else {

					if (hoursDifference==0) {
						
						stringOutput = secondsDifference + ' sec/s';
						
					}
				}
			}
		}
		
		console.log('timeDifference output: ' + stringOutput);
		
		return stringOutput;
		
	}

	ngOnInit() {

		var AttendeeID = this.localstorage.getLocalValue('AttendeeID');
		
		if (AttendeeID == '' || AttendeeID == null) {
			AttendeeID = '0';
		}

		// Load initial data set here
		let loading = this.loadingCtrl.create({
			spinner: 'crescent',
			content: 'Please wait...'
		});

		loading.present();

		// Blank and show loading info
		this.cd.markForCheck();
		
		// Temporary use variables
		var ActivityFeedID = this.localstorage.getLocalValue('ActivityFeedID');
		this.ActivityFeedID = ActivityFeedID;
		var flags = "dt|" + ActivityFeedID + "|Alpha|";
		
        // -------------------------
        // Get Activity Feed Details
        // -------------------------

        var PrimarySpeakerName = "";
        var SQLDate;
        var DisplayDateTime;
        var dbEventDateTime;
        var courseID = "";
        var UpdatedEventDescription;
        var UpdatedEventDescription2;
		var HandoutPDFName = "";
		this.afComments = [];
		
		console.log('Activity Feed Details, flags: ' + flags);
        // Get Activity Feed detail record
		this.databaseprovider.getActivityFeedData(flags, AttendeeID).then(data => {
			
			console.log("getActivityFeedData: " + JSON.stringify(data));

			if (data['length']>0) {
				
				// Original posting details
				var imageAvatar = "https://naeyc.convergence-us.com/AdminGateway/images/Attendees/" + data[0].Poster + ".jpg";

				var imageAttachment = data[0].afImageAttachment;
				if (imageAttachment != "") {
					imageAttachment = "https://naeyc.convergence-us.com/AdminGateway/images/ActivityFeedAttachments/" + imageAttachment;
				}

				var DisplayName = data[0].PosterFirst + " " + data[0].PosterLast;
			
				dbEventDateTime = data[0].Posted.substring(0, 19);
				dbEventDateTime = dbEventDateTime.replace(/-/g, '/');
				dbEventDateTime = dbEventDateTime.replace(/T/g, ' ');
				SQLDate = new Date(dbEventDateTime);
				DisplayDateTime = dateFormat(SQLDate, "mm/dd h:MMtt");

				var CurrentDateTime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
				var CurrentDateTime2 = new Date(CurrentDateTime);
				var PostedDate = new Date(data[0].Posted);
				var TimeDifference = this.timeDifference(CurrentDateTime2, PostedDate);					

				this.ActivityFeedCommentAvatar = imageAvatar;
				this.ActivityFeedCommentBy = DisplayName;
				this.ActivityFeedCommentPosted = DisplayDateTime;
				this.ActivityFeedComment = data[0].afMessage;
				this.ActivityFeedLikesCounter = data[0].afLikesCounter;
				this.ActivityFeedCommentsCounter = data[0].CommentsCount;
				this.ActivityFeedCommentPostedDuration = TimeDifference;
				this.ActivityFeedAttachment = imageAttachment;

				this.localstorage.setLocalValue('ActivityFeedIDCCount', data[0].CommentsCount);

				console.log('Initial post set');
				
				if (data[0].CommentsCount >0) {
					// Commenter details
					for (var i = 0; i < data['length']; i++) {

						var imageAvatar = "https://naeyc.convergence-us.com/AdminGateway/images/Attendees/" + data[i].Commenter + ".jpg";
						
						DisplayName = data[i].CommenterFirst + " " + data[i].CommenterLast;

						dbEventDateTime = data[i].CommentPosted.substring(0, 19);
						dbEventDateTime = dbEventDateTime.replace(/-/g, '/');
						dbEventDateTime = dbEventDateTime.replace(/T/g, ' ');
						SQLDate = new Date(dbEventDateTime);
						DisplayDateTime = dateFormat(SQLDate, "mm/dd h:MMtt");
					
						// Show the current record
						this.afComments.push({
							afID: data[i].afID,
							ActivityFeedCommentAvatar: imageAvatar,
							ActivityFeedCommentBy: DisplayName,
							ActivityFeedCommentPosted: DisplayDateTime,
							ActivityFeedComment: data[i].afcComment
						});

					}
				}
				
			}
		
			this.cd.markForCheck();

			loading.dismiss();

		}).catch(function () {
			console.log("Activity Feed Promise Rejected");
			loading.dismiss();
		});

	}
	
	ReloadComments() {
		
		// Blank and show loading info
		this.cd.markForCheck();
		
		// Temporary use variables
		var AttendeeID = this.localstorage.getLocalValue('AttendeeID');
		var ActivityFeedID = this.localstorage.getLocalValue('ActivityFeedID');
		this.ActivityFeedID = ActivityFeedID;
		var flags = "dt|" + ActivityFeedID + "|Alpha|";
		
        var SQLDate;
        var DisplayDateTime;
        var dbEventDateTime;
		var DisplayName;
		var imageAvatar;
		
		console.log('Activity Feed Details, flags: ' + flags);
        // Get Activity Feed detail record
		this.databaseprovider.getActivityFeedData(flags, AttendeeID).then(data => {
			
			console.log("getActivityFeedData: " + JSON.stringify(data));

			if (data['length']>0) {
								
				this.ActivityFeedLikesCounter = data[0].afLikesCounter;
				this.ActivityFeedCommentsCounter = data[0].CommentsCount;
				
				if (data[0].CommentsCount >0) {

					this.afComments = [];

					// Commenter details
					for (var i = 0; i < data['length']; i++) {

						imageAvatar = "https://naeyc.convergence-us.com/AdminGateway/images/Attendees/" + data[i].Commenter + ".jpg";
						
						DisplayName = data[i].CommenterFirst + " " + data[i].CommenterLast;

						dbEventDateTime = data[i].CommentPosted.substring(0, 19);
						dbEventDateTime = dbEventDateTime.replace(/-/g, '/');
						dbEventDateTime = dbEventDateTime.replace(/T/g, ' ');
						SQLDate = new Date(dbEventDateTime);
						DisplayDateTime = dateFormat(SQLDate, "mm/dd h:MMtt");
					
						// Show the current record
						this.afComments.push({
							afID: data[i].afID,
							ActivityFeedCommentAvatar: imageAvatar,
							ActivityFeedCommentBy: DisplayName,
							ActivityFeedCommentPosted: DisplayDateTime,
							ActivityFeedComment: data[i].afcComment
						});

					}

					this.cd.markForCheck();

				}
				
			}

		}).catch(function () {
			console.log("Activity Feed Comment Reload Promise Rejected");
		});

	}
	
	UpdateLikes() {

		console.log('Likes button tapped');
				
		var flags = "lu|" + this.ActivityFeedID;

		// Get the data
		this.databaseprovider.getActivityFeedData(flags, "0").then(data => {
			
			console.log(JSON.stringify(data));
			
			if (data['length']>0) {
				
				if (data[0].Status = "Saved") {
					this.ActivityFeedLikesCounter = data[0].NewLikes;
					this.cd.markForCheck();
				}
				
			}
			
		}).catch(function () {
			console.log("UpdateLikes Promise Rejected");
		});

	}

}
