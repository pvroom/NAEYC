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

	// Alpha buttons
	public btnA = "myButtonGreyBlue";
	public btnB = "myButtonGreyBlue";
	public btnC = "myButtonGreyBlue";
	public btnD = "myButtonGreyBlue";
	public btnE = "myButtonGreyBlue";
	public btnF = "myButtonGreyBlue";
	public btnG = "myButtonGreyBlue";
	public btnH = "myButtonGreyBlue";
	public btnI = "myButtonGreyBlue";
	public btnJ = "myButtonGreyBlue";
	public btnK = "myButtonGreyBlue";
	public btnL = "myButtonGreyBlue";
	public btnM = "myButtonGreyBlue";
	public btnN = "myButtonGreyBlue";
	public btnO = "myButtonGreyBlue";
	public btnP = "myButtonGreyBlue";
	public btnQ = "myButtonGreyBlue";
	public btnR = "myButtonGreyBlue";
	public btnS = "myButtonGreyBlue";
	public btnT = "myButtonGreyBlue";
	public btnU = "myButtonGreyBlue";
	public btnV = "myButtonGreyBlue";
	public btnW = "myButtonGreyBlue";
	public btnX = "myButtonGreyBlue";
	public btnY = "myButtonGreyBlue";
	public btnZ = "myButtonGreyBlue";
	
	
	constructor(public navCtrl: NavController,
				public navParams: NavParams,
				private storage: Storage,
				private databaseprovider: Database,
				private imageLoaderConfig: ImageLoaderConfig,
				private cd: ChangeDetectorRef,
				public loadingCtrl: LoadingController,
				private localstorage: Localstorage) {

	}

	// Style 1 data pull
	/*
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
		console.log("getMessagingData, Attendee Listing");
		this.databaseprovider.getMessagingData(flags, AttendeeID).then(data => {

			console.log("getMessagingData, Attendee Listing Count: " + data['length']);

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

					var imageAvatar = "";
					if (data[i].avatarFilename.length >0) {
						imageAvatar = "https://naeyc.convergence-us.com/AdminGateway/images/Attendees/" + data[i].AttendeeID + ".jpg";
						console.log('imageAvatar: ' + imageAvatar);
					}
					
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
			console.log("Attendee Listing Style 1 Promise Rejected");
		});

	}
	*/
	
	// Style 2 data pull
	ngOnInit() {

		var PreviousAlphaSearch = this.localstorage.getLocalValue('AlphaSearchLetter');

		if (PreviousAlphaSearch === null) {
			this.localstorage.setLocalValue('AlphaSearchLetter','A');
			PreviousAlphaSearch = 'A';
		}
		
		this.SetCurrentButton(PreviousAlphaSearch);
		this.LoadAlpha(PreviousAlphaSearch);
		
		// No records to show
		/*
		this.AttendeeListing.push({
			AttendeeID: 0,
			AttendeeName: "Choose a letter from the right to bring up attendees whose last names begin with that letter",
			AttendeeTitle: "",
			AttendeeOrganization: "",
			AttendeeAvatar: "",
			navigationArrow: "nothing",
			ShowHideAttendeeIcon: false,
		});

		this.cd.markForCheck();
		*/
		
	}
		
	SetCurrentButton(AlphaLetter) {
		
		this.btnA = "myButtonGreyBlue";
		this.btnB = "myButtonGreyBlue";
		this.btnC = "myButtonGreyBlue";
		this.btnD = "myButtonGreyBlue";
		this.btnE = "myButtonGreyBlue";
		this.btnF = "myButtonGreyBlue";
		this.btnG = "myButtonGreyBlue";
		this.btnH = "myButtonGreyBlue";
		this.btnI = "myButtonGreyBlue";
		this.btnJ = "myButtonGreyBlue";
		this.btnK = "myButtonGreyBlue";
		this.btnL = "myButtonGreyBlue";
		this.btnM = "myButtonGreyBlue";
		this.btnN = "myButtonGreyBlue";
		this.btnO = "myButtonGreyBlue";
		this.btnP = "myButtonGreyBlue";
		this.btnQ = "myButtonGreyBlue";
		this.btnR = "myButtonGreyBlue";
		this.btnS = "myButtonGreyBlue";
		this.btnT = "myButtonGreyBlue";
		this.btnU = "myButtonGreyBlue";
		this.btnV = "myButtonGreyBlue";
		this.btnW = "myButtonGreyBlue";
		this.btnX = "myButtonGreyBlue";
		this.btnY = "myButtonGreyBlue";
		this.btnZ = "myButtonGreyBlue";

		switch(AlphaLetter) {
			case "A":
				this.btnA = "myButtonActive";
				break;
			case "B":
				this.btnB = "myButtonActive";
				break;
			case "C":
				this.btnC = "myButtonActive";
				break;
			case "D":
				this.btnD = "myButtonActive";
				break;
			case "E":
				this.btnE = "myButtonActive";
				break;
			case "F":
				this.btnF = "myButtonActive";
				break;
			case "G":
				this.btnG = "myButtonActive";
				break;
			case "H":
				this.btnH = "myButtonActive";
				break;
			case "I":
				this.btnI = "myButtonActive";
				break;
			case "J":
				this.btnJ = "myButtonActive";
				break;
			case "K":
				this.btnK = "myButtonActive";
				break;
			case "L":
				this.btnL = "myButtonActive";
				break;
			case "M":
				this.btnM = "myButtonActive";
				break;
			case "N":
				this.btnN = "myButtonActive";
				break;
			case "O":
				this.btnO = "myButtonActive";
				break;
			case "P":
				this.btnP = "myButtonActive";
				break;
			case "Q":
				this.btnQ = "myButtonActive";
				break;
			case "R":
				this.btnR = "myButtonActive";
				break;
			case "S":
				this.btnS = "myButtonActive";
				break;
			case "T":
				this.btnT = "myButtonActive";
				break;
			case "U":
				this.btnU = "myButtonActive";
				break;
			case "V":
				this.btnV = "myButtonActive";
				break;
			case "W":
				this.btnW = "myButtonActive";
				break;
			case "X":
				this.btnX = "myButtonActive";
				break;
			case "Y":
				this.btnY = "myButtonActive";
				break;
			case "Z":
				this.btnZ = "myButtonActive";
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

					var imageAvatar = "";
					if (data[i].avatarFilename !== null) {
						if (data[i].avatarFilename.length >0) {
							imageAvatar = "https://naeyc.convergence-us.com/AdminGateway/images/Attendees/" + data[i].AttendeeID + ".jpg";
							console.log('imageAvatar: ' + imageAvatar);
						}
					}
					
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

			}

			this.cd.markForCheck();

			loading.dismiss();
				
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
