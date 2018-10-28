// Components, functions, plugins
import { Component, HostListener, ChangeDetectionStrategy, ChangeDetectorRef, NgModule } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Database } from './../../providers/database/database';
import { Localstorage } from './../../providers/localstorage/localstorage';
import { ImageLoaderConfig } from 'ionic-image-loader';
import { IonicImageLoader } from 'ionic-image-loader';

@IonicPage()
@Component({
	selector: 'page-attendees',
	templateUrl: 'attendees.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttendeesPage {

	public AttendeeListing: any[] = [];
	public EntryTerms: string;
	currentPageClass = this;
	triggerAlphaScrollChange: number = 0;

	constructor(public navCtrl: NavController,
				public navParams: NavParams,
				private storage: Storage,
				private databaseprovider: Database,
				private imageLoaderConfig: ImageLoaderConfig,
				private cd: ChangeDetectorRef,
				public loadingCtrl: LoadingController,
				private localstorage: Localstorage) {

	}

	ngOnInit() {

		// Load initial data set here
		let loading = this.loadingCtrl.create({
		  spinner: 'crescent',
		  content: 'Please wait...'
		});

		loading.present();

		// Blank and show loading info
		this.AttendeeListing = [];
		this.cd.markForCheck();
		this.imageLoaderConfig.setFallbackUrl('assets/img/personIcon.png');

		// Temporary use variables
		var flags = "al|0|0|";
		var DisplayName = "";
		var visDisplayTitle = "";
		var visDisplayCompany = "";
        var AttendeeDividerCharacter = "";
		var AttendeeID = this.localstorage.getLocalValue('AttendeeID');

		// Get the data
		this.databaseprovider.getMessagingData(flags, AttendeeID).then(data => {

			//console.log("getMessagingData: " + JSON.stringify(data));

			if (data['length'] > 0) {

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

                    if (data[i].LastName.charAt(0) != AttendeeDividerCharacter) {

                        // Display the divider
						this.AttendeeListing.push({
							AttendeeID: 0,
							AttendeeName: data[i].LastName.charAt(0),
							AttendeeTitle: "",
							AttendeeOrganization: "",
							AttendeeAvatar: "",
							navigationArrow: "nothing",
							ShowHideAttendeeIcon: false,
							ShowHideDividerIcon: true
						});

						// Set the new marker point
						AttendeeDividerCharacter = data[i].LastName.charAt(0);

						// Add current record to the list
						this.AttendeeListing.push({
							AttendeeID: data[i].AttendeeID,
							AttendeeName: DisplayName,
							AttendeeTitle: visDisplayTitle,
							AttendeeOrganization: visDisplayCompany,
							AttendeeAvatar: imageAvatar,
							navigationArrow: "arrow-dropright",
							ShowHideAttendeeIcon: true,
							ShowHideDividerIcon: false
						});
						
					} else {
						
						// Add current record to the list
						this.AttendeeListing.push({
							AttendeeID: data[i].AttendeeID,
							AttendeeName: DisplayName,
							AttendeeTitle: visDisplayTitle,
							AttendeeOrganization: visDisplayCompany,
							AttendeeAvatar: imageAvatar,
							navigationArrow: "arrow-dropright",
							ShowHideAttendeeIcon: true,
							ShowHideDividerIcon: false
						});
					}
				}

			} else {

				// No records to show
				this.AttendeeListing.push({
					AttendeeID: 0,
					AttendeeName: "No attendees available",
					AttendeeTitle: "",
					AttendeeOrganization: "",
					AttendeeAvatar: "",
					navigationArrow: "nothing",
					ShowHideAttendeeIcon: false,
					ShowHideDividerIcon: true
				});

			}

			this.cd.markForCheck();

			loading.dismiss();
			this.triggerAlphaScrollChange++;
				
		}).catch(function () {
			console.log("Promise Rejected");
		});

	}

	onItemClick(item) {
		// This is an example of how you could manually trigger ngOnChange
		// for the component. If you modify "listData" it won't perform
		// an ngOnChange, you will have to trigger manually to refresh the component.
		this.triggerAlphaScrollChange++;
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad AttendeesPage');
	}

	@HostListener('document:keypress', ['$event'])
		handleKeyboardEvent(event: KeyboardEvent) { 
		if (event.key == 'Enter') {
			console.log('Enter key detected');
			this.GetSearchResults();
		}
	}
	
    GetSearchResults() {

        var SearchTerms = this.EntryTerms;

        if ((SearchTerms == undefined) || (SearchTerms == "")) {
            // Do nothing or show message
        } else {

            this.localstorage.setLocalValue("SearchTerms", SearchTerms);
			this.navCtrl.push('SearchResultsPage', {SearchTerms: SearchTerms}, {animate: true, direction: 'forward'});

        }
    };

	AttendeeDetails(oAttendeeID) {
		
		console.log('oAttendeeID: ' + oAttendeeID);
		
		this.localstorage.setLocalValue("oAttendeeID", oAttendeeID);
		this.navCtrl.push('AttendeesProfilePage', {oAttendeeID: oAttendeeID}, {animate: true, direction: 'forward'});

    }

};
