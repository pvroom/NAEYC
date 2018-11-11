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

	// Alpha buttons
	public btnA = "myButtonGreyBlue1";
	public btnB = "myButtonGreyBlue1";
	public btnC = "myButtonGreyBlue1";
	public btnD = "myButtonGreyBlue1";
	public btnE = "myButtonGreyBlue1";
	public btnF = "myButtonGreyBlue1";
	public btnG = "myButtonGreyBlue1";
	public btnH = "myButtonGreyBlue1";
	public btnI = "myButtonGreyBlue1";
	public btnJ = "myButtonGreyBlue1";
	public btnK = "myButtonGreyBlue1";
	public btnL = "myButtonGreyBlue1";
	public btnM = "myButtonGreyBlue1";
	public btnN = "myButtonGreyBlue1";
	public btnO = "myButtonGreyBlue1";
	public btnP = "myButtonGreyBlue1";
	public btnQ = "myButtonGreyBlue1";
	public btnR = "myButtonGreyBlue1";
	public btnS = "myButtonGreyBlue1";
	public btnT = "myButtonGreyBlue1";
	public btnU = "myButtonGreyBlue1";
	public btnV = "myButtonGreyBlue1";
	public btnW = "myButtonGreyBlue1";
	public btnX = "myButtonGreyBlue1";
	public btnY = "myButtonGreyBlue1";
	public btnZ = "myButtonGreyBlue1";
	
	
	constructor(public navCtrl: NavController,
				public navParams: NavParams,
				private storage: Storage,
				private databaseprovider: Database,
				private imageLoaderConfig: ImageLoaderConfig,
				private cd: ChangeDetectorRef,
				public loadingCtrl: LoadingController,
				private localstorage: Localstorage) {

	}

	// Style 2 data pull
	ngOnInit() {

		var PreviousAlphaSearch = this.localstorage.getLocalValue('AlphaSearchLetter');

		if (PreviousAlphaSearch === null) {
			this.localstorage.setLocalValue('AlphaSearchLetter','A');
			PreviousAlphaSearch = 'A';
		}
		
		this.SetCurrentButton(PreviousAlphaSearch);
		this.LoadAlpha(PreviousAlphaSearch);
				
	}
		
	SetCurrentButton(AlphaLetter) {
		
		this.btnA = "myButtonGreyBlue1";
		this.btnB = "myButtonGreyBlue1";
		this.btnC = "myButtonGreyBlue1";
		this.btnD = "myButtonGreyBlue1";
		this.btnE = "myButtonGreyBlue1";
		this.btnF = "myButtonGreyBlue1";
		this.btnG = "myButtonGreyBlue1";
		this.btnH = "myButtonGreyBlue1";
		this.btnI = "myButtonGreyBlue1";
		this.btnJ = "myButtonGreyBlue1";
		this.btnK = "myButtonGreyBlue1";
		this.btnL = "myButtonGreyBlue1";
		this.btnM = "myButtonGreyBlue1";
		this.btnN = "myButtonGreyBlue1";
		this.btnO = "myButtonGreyBlue1";
		this.btnP = "myButtonGreyBlue1";
		this.btnQ = "myButtonGreyBlue1";
		this.btnR = "myButtonGreyBlue1";
		this.btnS = "myButtonGreyBlue1";
		this.btnT = "myButtonGreyBlue1";
		this.btnU = "myButtonGreyBlue1";
		this.btnV = "myButtonGreyBlue1";
		this.btnW = "myButtonGreyBlue1";
		this.btnX = "myButtonGreyBlue1";
		this.btnY = "myButtonGreyBlue1";
		this.btnZ = "myButtonGreyBlue1";

		switch(AlphaLetter) {
			case "A":
				this.btnA = "myButtonActive1";
				break;
			case "B":
				this.btnB = "myButtonActive1";
				break;
			case "C":
				this.btnC = "myButtonActive1";
				break;
			case "D":
				this.btnD = "myButtonActive1";
				break;
			case "E":
				this.btnE = "myButtonActive1";
				break;
			case "F":
				this.btnF = "myButtonActive1";
				break;
			case "G":
				this.btnG = "myButtonActive1";
				break;
			case "H":
				this.btnH = "myButtonActive1";
				break;
			case "I":
				this.btnI = "myButtonActive1";
				break;
			case "J":
				this.btnJ = "myButtonActive1";
				break;
			case "K":
				this.btnK = "myButtonActive1";
				break;
			case "L":
				this.btnL = "myButtonActive1";
				break;
			case "M":
				this.btnM = "myButtonActive1";
				break;
			case "N":
				this.btnN = "myButtonActive1";
				break;
			case "O":
				this.btnO = "myButtonActive1";
				break;
			case "P":
				this.btnP = "myButtonActive1";
				break;
			case "Q":
				this.btnQ = "myButtonActive1";
				break;
			case "R":
				this.btnR = "myButtonActive1";
				break;
			case "S":
				this.btnS = "myButtonActive1";
				break;
			case "T":
				this.btnT = "myButtonActive1";
				break;
			case "U":
				this.btnU = "myButtonActive1";
				break;
			case "V":
				this.btnV = "myButtonActive1";
				break;
			case "W":
				this.btnW = "myButtonActive1";
				break;
			case "X":
				this.btnX = "myButtonActive1";
				break;
			case "Y":
				this.btnY = "myButtonActive1";
				break;
			case "Z":
				this.btnZ = "myButtonActive1";
				break;
		}

		
	}
	
	LoadAlpha(AlphaLetter) {

		this.SetCurrentButton(AlphaLetter);
		//this.localstorage.setLocalValue('AlphaSearchLetter', AlphaLetter);

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
		var flags = "al2|" + AlphaLetter + "|0|";
		var DisplayName = "";
		var visDisplayTitle = "";
		var visDisplayCompany = "";
        var AttendeeDividerCharacter = "";
		var AttendeeID = this.localstorage.getLocalValue('AttendeeID');

		// Get the data
		this.databaseprovider.getMessagingData(flags, AttendeeID).then(data => {

			console.log("getMessagingData, Attendee Listing Count: " + data['length']);

			if (data['length'] > 0) {

				console.log('getMessagingData, Attendee Listing, starting data record loop');
				
				for (var i = 0; i < data['length']; i++) {
					DisplayName = "";

					// Concatenate fields to build displayable name
					DisplayName = DisplayName + data[i].LastName + ", " + data[i].FirstName;

					// Show Title and Company/Association
					visDisplayTitle = "";
					if (data[i].Title != "") {
						visDisplayTitle = data[i].Title;
					}
					
					visDisplayCompany = "";
					if (data[i].Company != "") {
						visDisplayCompany = data[i].Company;
					}

					var imageAvatar = "";
					//if (data[i].avatarFilename !== null) {
						//if (data[i].avatarFilename.length >0) {
							imageAvatar = "https://naeyc.convergence-us.com/AdminGateway/images/Attendees/" + data[i].AttendeeID + ".jpg";
							console.log('imageAvatar: ' + imageAvatar);
						//}
					//}
					
					// Add current record to the list
					this.AttendeeListing.push({
						AttendeeID: data[i].AttendeeID,
						AttendeeName: DisplayName,
						AttendeeTitle: visDisplayTitle,
						AttendeeOrganization: visDisplayCompany,
						AttendeeAvatar: imageAvatar,
						navigationArrow: "arrow-dropright",
						ShowHideAttendeeIcon: true,
					});
				}

				this.cd.markForCheck();
				console.log('Built data array: ' + JSON.stringify(this.AttendeeListing));

			} else {

				console.log("getMessagingData, Attendee Listing, No records");
				// No records to show
				this.AttendeeListing.push({
					AttendeeID: 0,
					AttendeeName: "No attendees available",
					AttendeeTitle: "",
					AttendeeOrganization: "",
					AttendeeAvatar: "",
					navigationArrow: "nothing",
					ShowHideAttendeeIcon: false,
				});

				this.cd.markForCheck();
				console.log('Built data array: ' + JSON.stringify(this.AttendeeListing));

			}

			loading.dismiss();
			
			console.log('getMessagingData, Attendee Listing, done loading names');
				
		}).catch(function () {
			console.log("Attendee Listing Style 2 Promise Rejected");
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
