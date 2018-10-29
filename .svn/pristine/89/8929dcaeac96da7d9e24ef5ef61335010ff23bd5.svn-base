// Components, functions, plugins
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, NgModule } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Database } from './../../providers/database/database';
import { ImageLoaderConfig } from 'ionic-image-loader';
import { Localstorage } from './../../providers/localstorage/localstorage';

declare var dateFormat: any;

@IonicPage()
@Component({
  selector: 'page-speakerdetails',
  templateUrl: 'speakerdetails.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SpeakerDetailsPage {

	public SessionListing: any[] = [];
	public visualImageURL: string;
	public visualDisplayName: string;
	//public visualTitle: string;
	public visualAffiliation: string;
	public visualBiography: string;
	public spkrDetails: string;
	public WebsiteShow: boolean;
	public visWebsite: string;

	// Bookmark button
	public visBookmarkAddRemoveButton: string;
	public btnBookmarkManagement = false;
	public BookmarkButtonColor: string = '#ffffff';
	public BookmarkButtonTextColor: string = '#004c94';

	constructor(public navCtrl: NavController, 
				public navParams: NavParams,
				private storage: Storage,
				private imageLoaderConfig: ImageLoaderConfig,
				private databaseprovider: Database,
				private cd: ChangeDetectorRef,
				public loadingCtrl: LoadingController,
				public alertCtrl: AlertController,
				private localstorage: Localstorage) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad SpeakersPage');
	}

    navToWebsite(WebsiteURL) {

        if (WebsiteURL === undefined) {
            // Do nothing
        } else {
            // Initiate web browser
            if ((WebsiteURL.substring(0, 7) != "http://") && (WebsiteURL.substring(0, 8) != "https://")) {
                WebsiteURL = "http://" + WebsiteURL;
            }
			
			console.log('Speaker Details: Navigating to: ' + WebsiteURL);
            window.open(WebsiteURL, '_system');
        }

    };

    EventDetails(EventID) {
		
        if (EventID != 0) {
            // Navigate to Education Details page
			this.navCtrl.push('EducationDetailsPage', {EventID: EventID}, {animate: true, direction: 'forward'});
        }

    };

	ngOnInit() {

		// Load initial data set here
		//let loading = this.loadingCtrl.create({
		//	spinner: 'crescent',
		//	content: 'Please wait...'
		//});

		//loading.present();

		// Blank and show loading info
		this.SessionListing = [];
		this.cd.markForCheck();
		this.imageLoaderConfig.setFallbackUrl('assets/img/personIcon.png');
		
		// Temporary use variables
		var flags = "dt|Alpha|" + this.navParams.get('SpeakerID');
        var DisplayName = "";
        var BioDisplay = "";
		var AttendeeID = this.localstorage.getLocalValue('AttendeeID');
		
		// Get the data
		this.databaseprovider.getSpeakerData(flags, AttendeeID).then(data => {
			
			console.log("getSpeakerDetails: " + JSON.stringify(data));

			if (data['length']>0) {
				
				DisplayName = "";

				// Concatenate fields to build displayable name
				//if (data[0].Prefix != "") {
				//    DisplayName = DisplayName + data[0].Prefix + " ";
				//}
				DisplayName = DisplayName + data[0].FirstName;
				//if (data[0].MiddleInitial != "") {
				//    DisplayName = DisplayName + " " + data[0].MiddleInitial;
				//}
				DisplayName = DisplayName + " " + data[0].LastName;
				//if (data[0].Suffix != "") {
				//    DisplayName = DisplayName + " " + data[0].Suffix;
				//}
				//if (data[0].imis_designation != "" && data[0].imis_designation != null) {
				//    DisplayName = DisplayName + ", " + data[0].imis_designation;
				//}
				
				//if (data[0].Title != "" && data[0].Title != null) {
				//	this.visualTitle = data[0].Title;
				//}
				
				if (data[0].Company != "" && data[0].Company != null) {
					this.visualAffiliation = data[0].Company;
				}

				if (data[0].Website != "" && data[0].Website != null) {
					this.visWebsite = data[0].Website;
					this.WebsiteShow = true;
				} else {
					this.WebsiteShow = false;
				}
				
				// Thumbnail
				var imageURL = "https://naeyc.convergence-us.com/AdminGateway/images/Speakers/" + data[0].imageFilename;
				//imageURL = imageURL.substr(0, imageURL.length - 3) + 'png';
				this.visualImageURL = imageURL;
				console.log("ImageURL: " + imageURL);

				this.visualDisplayName = DisplayName;
				//$scope.visualAffiliation = res.rows.item(0).Affiliation;

                // Values for Bookmark Management
                this.localstorage.setLocalValue("BookmarkID", this.navParams.get('SpeakerID'));
                this.localstorage.setLocalValue("BookmarkType", "Speakers");

                if (data[0].Bookmarked != "0") {
                    this.visBookmarkAddRemoveButton = "Remove";
					this.BookmarkButtonColor = '#004c94';
					this.BookmarkButtonTextColor = '#ffffff';
                } else {
                    this.visBookmarkAddRemoveButton = "Bookmark";
					this.BookmarkButtonColor = '#ffffff';
					this.BookmarkButtonTextColor = '#004c94';
                }

				// Biography
				if ((data[0].Bio == "") || (data[0].Bio == "&nbsp;") || (data[0].Bio == "TBD")) {
					this.spkrDetails = "No biography provided";
				} else {
					BioDisplay = data[0].Bio;
					BioDisplay = BioDisplay.replace(/&nbsp;/g,' ');
					BioDisplay = BioDisplay.replace(/\r/g, '');
					BioDisplay = BioDisplay.replace(/\n/g, '');
					BioDisplay = BioDisplay.replace(/\t/g, '');
					BioDisplay = BioDisplay.replace(/<div>/g, '');
					BioDisplay = BioDisplay.replace(/<\/div>/g, '');
					BioDisplay = BioDisplay.replace(/â€™/g, "'");
					BioDisplay = BioDisplay.replace(/â€œ/g, '"');
					BioDisplay = BioDisplay.replace(/Â/g, ' ');
					BioDisplay = BioDisplay.replace(/â€/g, '"');
					BioDisplay = BioDisplay.replace(/\\"/g, '"');
					this.spkrDetails = BioDisplay;
				}

				// Get session records
				var coursescat = data[0].Courses;
				var courses = coursescat.split("|");
				var text = "(";
				for (var i = 0; i < courses.length; i++) {
					text += courses[i] + ",";
				}
				var QueryParam = text.substring(0, text.length - 1);
				QueryParam = QueryParam + ")";

				console.log("Course listing parameters: " + QueryParam);

				flags = "cl|Alpha|" + this.navParams.get('SpeakerID') + "|" + QueryParam;
				
                var SQLDate;
                var DisplayDateTime;
                var dbEventDateTime;

				// Get the list of courses relevant to this speaker
				this.databaseprovider.getSpeakerData(flags, "0").then(data2 => {
					
					console.log("getSpeakerData: " + JSON.stringify(data2));

					if (data2['length']>0) {
						
						for (var i = 0; i < data2['length']; i++) {

                            console.log(data2[i].session_id);

                            dbEventDateTime = data2[i].session_start_time.substring(0,19);
                            dbEventDateTime = dbEventDateTime.replace(/-/g, '/');
                            dbEventDateTime = dbEventDateTime.replace(/T/g, ' ');

                            SQLDate = new Date(dbEventDateTime);
                            DisplayDateTime = dateFormat(SQLDate, "mm/dd h:MMtt");

                            // Display end time
                            dbEventDateTime = data2[i].session_end_time.substring(0, 19);
                            dbEventDateTime = dbEventDateTime.replace(/-/g, '/');
                            dbEventDateTime = dbEventDateTime.replace(/T/g, ' ');
                            SQLDate = new Date(dbEventDateTime);
                            DisplayDateTime = DisplayDateTime + " to " + dateFormat(SQLDate, "h:MMtt");

							this.SessionListing.push({
                                DisplayEventName: data2[i].session_title,
                                DisplayEventTimeDateLocation: DisplayDateTime + " in " + data2[i].RoomName,// + " for " + ConvertM2HM(res2.rows.item(i).EventDuration),
                                EventID: data2[i].session_id
                            });

						}


					} else {
						
						// No records to show
						this.SessionListing.push({
                            DisplayEventName: "No records available",
                            DisplayEventTimeDateLocation: "",
                            EventID: "0"
						});

					}

					this.cd.markForCheck();
					
				}).catch(function () {
					console.log("Promise Rejected");
				});
					

			} else {
				
                // No data to show
                this.visualDisplayName = "Unable to retrieve record";
                this.visualAffiliation = "";

			}

			this.cd.markForCheck();

			//loading.dismiss();
			
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

        if (this.visBookmarkAddRemoveButton == "Bookmark") {

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
						
						this.visBookmarkAddRemoveButton = "Remove";
						this.BookmarkButtonColor = '#004c94';
						this.BookmarkButtonTextColor = '#ffffff';
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
						
						this.visBookmarkAddRemoveButton = "Bookmark";
						this.BookmarkButtonColor = '#ffffff';
						this.BookmarkButtonTextColor = '#004c94';
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
