// Components, functions, plugins
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, NgModule } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Database } from './../../providers/database/database';
import { Localstorage } from '../../providers/localstorage/localstorage';
import { IonicImageLoader, ImageLoaderConfig } from 'ionic-image-loader';

declare var formatTime: any;
declare var dateFormat: any;

@Component({
  selector: 'page-attendeebookmarks',
  templateUrl: 'attendeebookmarks.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AttendeeBookmarksPage {

	public bookmarksSessions: any[] = [];
	public bookmarksSpeakers: any[] = [];
	public bookmarksExhibitors: any[] = [];
	public bookmarksAttendees: any[] = [];

	constructor(public navCtrl: NavController, 
				public navParams: NavParams,
				private storage: Storage,
				private databaseprovider: Database,
				private imageLoaderConfig: ImageLoaderConfig,
				private cd: ChangeDetectorRef,
				public loadingCtrl: LoadingController,
				private localstorage: Localstorage) {
					
	}

	ionViewDidLoad() {
		
		console.log('ionViewDidLoad AttendeeBookmarksPage');
				
	}

	ionViewDidEnter() {
		console.log('ionViewDidEnter SpeakersPage');
		this.LoadBookmarks();
	}

	LoadBookmarks() {

		// Load initial data set here
		let loading = this.loadingCtrl.create({
			spinner: 'crescent',
			content: 'Please wait...'
		});

		// Blank and show loading info
		this.imageLoaderConfig.setFallbackUrl('assets/img/personIcon.png');

		// Temporary use variables
		var flags;
		var visStartTime;
		var visEndTime;
		var eventIcon;
		var visEventName;
		var DisplayName;
		var visDisplayCredentials;
        var DisplayLocation = "";
		var visDisplayTitle;
		var visDisplayCompany;
		var visCityState = true;
		
		
		// Get the data
		var AttendeeID = this.localstorage.getLocalValue('AttendeeID');

		if (AttendeeID !='' && AttendeeID != null) {
				
			this.bookmarksSessions = [];
			this.bookmarksSpeakers = [];
			this.bookmarksExhibitors = [];
			this.bookmarksAttendees = [];
			this.cd.markForCheck();

			loading.present();

			// -------------------
			// Get data: Sessions
			// -------------------
			flags = "li|Sessions";
			
			this.databaseprovider.getBookmarksData(flags, AttendeeID).then(data => {
				
				console.log("getBookmarksData: " + JSON.stringify(data));

				if (data['length']>0) {
					
					for (var i = 0; i < data['length']; i++) {

						var SubjectCodeCECredits = "";

						var dbEventDateTime = data[i].session_start_time.substring(0, 19);
						dbEventDateTime = dbEventDateTime.replace(/-/g, '/');
						dbEventDateTime = dbEventDateTime.replace(/T/g, ' ');
						var SQLDate = new Date(dbEventDateTime);
						var DisplayDateTime = dateFormat(SQLDate, "mm/dd h:MMtt");
						var DisplayStartTime = dateFormat(SQLDate, "h:MMtt");
						
						// Display end time
						dbEventDateTime = data[i].session_end_time.substring(0, 19);
						dbEventDateTime = dbEventDateTime.replace(/-/g, '/');
						dbEventDateTime = dbEventDateTime.replace(/T/g, ' ');
						SQLDate = new Date(dbEventDateTime);
						DisplayDateTime = DisplayDateTime + " to " + dateFormat(SQLDate, "h:MMtt");

						var visEventName = data[i].session_title;
						var DisplayDateRoom = "";
						
						if (data[i].RoomName.length==0) {
							DisplayDateRoom = DisplayDateTime;
						} else {
							DisplayDateRoom = DisplayDateTime + " in " + data[i].RoomName;
						}

						SubjectCodeCECredits = "ID: " + data[i].session_id;
												
						// Status checks
						var visSessionStatus = "";
						var visStatusStyle = "SessionStatusNormal";
						
						// Room Capacity check
						if (parseInt(data[i].room_capacity) <= parseInt(data[i].Attendees)) {
							visSessionStatus = "Course at Capacity";
							visStatusStyle = "SessionStatusRed";
						}
						
						// Waitlist check
						if (data[i].Waitlist == "1") {
							if (visSessionStatus == "") {
								visSessionStatus = "You are Waitlisted";
								visStatusStyle = "SessionStatusRed";
							} else {
								visSessionStatus = visSessionStatus + " / You are Waitlisted";
								visStatusStyle = "SessionStatusRed";
							}
						}

						this.bookmarksSessions.push({
							DisplayEventName: visEventName,
							DisplayEventTimeDateLocation: DisplayDateRoom,
							SpeakerDisplayName: data[i].other_speakers,
							EventID: data[i].session_id,
							DisplaySubjectCodeCECredits: SubjectCodeCECredits,
							SessionStatusStyle: visStatusStyle,
							SessionStatus: visSessionStatus,
							navigationArrow: "arrow-dropright"
						});

					}


				} else {
					
					this.bookmarksSessions.push({
						DisplayEventName: "No bookmarks saved for Sessions",
						DisplayEventTimeDateLocation: "",
						SpeakerDisplayName: "",
						EventID: 0,
						DisplaySubjectCodeCECredits: "",
						SessionStatusStyle: "SessionStatusNormal",
						SessionStatus: "",
						navigationArrow: ""
					});

				}

				//this.cd.markForCheck();

				// -------------------
				// Get data: Speakers
				// -------------------
				flags = "li|Speakers";
				
				this.databaseprovider.getBookmarksData(flags, AttendeeID).then(data => {
					
					console.log("getBookmarksData: " + JSON.stringify(data));

					if (data['length']>0) {
						
						for (var i = 0; i < data['length']; i++) {

							DisplayName = "";

							// Concatenate fields to build displayable name
							DisplayName = DisplayName + data[i].LastName + ", " + data[i].FirstName;
														
							// Use Credentials field for Company/Association
							visDisplayCredentials = "";
							if (data[i].Company != "") {
								visDisplayCredentials = data[i].Company;
							}

							var imageAvatar = data[i].imageFilename;
							imageAvatar = "https://naeyc.convergence-us.com/AdminGateway/images/Speakers/" + imageAvatar;

							this.bookmarksSpeakers.push({
								SpeakerID: data[i].speakerID,
								DisplayNameLastFirst: DisplayName,
								DisplayCredentials: visDisplayCredentials,
								DisplayTitle: data[i].Title,
								Affiliation: "",
								speakerAvatar: imageAvatar,
								navigationArrow: "arrow-dropright"
							});

						}


					} else {
						
						this.bookmarksSpeakers.push({
							SpeakerID: 0,
							DisplayNameLastFirst: "No bookmarks saved for Speakers",
							DisplayCredentials: "",
							DisplayTitle: "",
							Affiliation: "",
							speakerAvatar: "",
							navigationArrow: ""
						});

					}

					//this.cd.markForCheck();

					
					// -------------------
					// Get data: Exhibitors
					// -------------------
					flags = "li|Exhibitors";
					
					this.databaseprovider.getBookmarksData(flags, AttendeeID).then(data => {
						
						console.log("getBookmarksData: " + JSON.stringify(data));

						if (data['length']>0) {
							
							for (var i = 0; i < data['length']; i++) {

								if ((data[i].City === null) || (data[i].City == "")) {
									visCityState = false;
								} else {
									// Construct location based on US or International
									if ((data[i].Country != "United States") && (data[i].Country != "")) {
										DisplayLocation = data[i].City + ", " + data[i].Country;
									} else {
										DisplayLocation = data[i].City + ", " + data[i].State;
									}
									visCityState = true;
								}
								
								this.bookmarksExhibitors.push({
									ExhibitorID: data[i].ExhibitorID,
									CompanyName: data[i].CompanyName,
									DisplayCityState: DisplayLocation,
									CityStateShow: visCityState,
									BoothNumber: "Booth: " + data[i].BoothNumber,
									exhibitorIcon: "people",
									exhibitorClass: "myLabelBold",
									navigationArrow: "arrow-dropright"
								});

							}


						} else {
							
							this.bookmarksExhibitors.push({
								ExhibitorID: 0,
								CompanyName: "No bookmarks saved for Exhibitors",
								DisplayCityState: "",
								CityStateShow: false,
								BoothNumber: "",
								exhibitorIcon: "",
								exhibitorClass: "myLabelBold",
								navigationArrow: ""
							});

						}

						//this.cd.markForCheck();
						
						// -------------------
						// Get data: Attendees
						// -------------------
						flags = "li|Attendees";
						
						this.databaseprovider.getBookmarksData(flags, AttendeeID).then(data => {
							
							console.log("getBookmarksData: " + JSON.stringify(data));

							if (data['length']>0) {
								
								for (var i = 0; i < data['length']; i++) {

									DisplayName = "";

									// Concatenate fields to build displayable name
									DisplayName = DisplayName + data[i].LastName + ", " + data[i].FirstName;
									
									// Use Credentials field for Company/Association
									visDisplayTitle = "";
									if (data[i].Title != "") {
										visDisplayTitle = data[i].Title;
									}
									visDisplayCompany = "";
									if (data[i].Company != "") {
										visDisplayCompany = data[i].Company;
									}

									var imageAvatar = "https://naeyc.convergence-us.com/AdminGateway/images/Attendees/" + data[i].AttendeeID + ".jpg";
									console.log('imageAvatar: ' + imageAvatar);

									this.bookmarksAttendees.push({
										AttendeeID: data[i].AttendeeID,
										AttendeeName: DisplayName,
										AttendeeTitle: visDisplayTitle,
										AttendeeOrganization: visDisplayCompany,
										AttendeeAvatar: imageAvatar,
										navigationArrow: "arrow-dropright"
									});

								}


							} else {
								
								this.bookmarksAttendees.push({
									AttendeeID: 0,
									AttendeeName: "No bookmarks saved for Attendees",
									AttendeeTitle: "",
									AttendeeOrganization: "",
									AttendeeAvatar: "",
									navigationArrow: ""
								});

							}

							loading.dismiss();
							this.cd.markForCheck();

						}).catch(function () {
							console.log("Promise Rejected");
						});

					}).catch(function () {
						console.log("Promise Rejected");
					});
					
				}).catch(function () {
					console.log("Promise Rejected");
				});
				
			}).catch(function () {
				console.log("Promise Rejected");
			});
				
		} else {
			console.log('User not logged in');
			loading.dismiss();
		}

	}
	
    EventDetails(EventID) {
		
		if (EventID != 0) {
			
			this.localstorage.setLocalValue('EventID', EventID);
			this.navCtrl.push('EducationDetailsPage', {EventID: EventID}, {animate: true, direction: 'forward'});
			
		}

	};

	ExhibitorDetails(ExhibitorID) {
						
		if (ExhibitorID != 0) {
			
			this.navCtrl.push('ExhibitorDetailsPage', {ExhibitorID: ExhibitorID}, {animate: true, direction: 'forward'});
			
		}
		
    };

    SpeakerDetails(SpeakerID) {

		if (SpeakerID != 0) {
			
			this.navCtrl.push('SpeakerDetailsPage', {SpeakerID: SpeakerID}, {animate: true, direction: 'forward'});
			
		}
			
    };

	AttendeeDetails(oAttendeeID) {
	
		if (oAttendeeID != 0) {
			
			this.localstorage.setLocalValue("oAttendeeID", oAttendeeID);
			this.navCtrl.push('AttendeesProfilePage', {oAttendeeID: oAttendeeID}, {animate: true, direction: 'forward'});
			
		}

	}
	
}
