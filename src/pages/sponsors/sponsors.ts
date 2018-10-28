// Components, functions, plugins
import { Component, HostListener, ChangeDetectionStrategy, ChangeDetectorRef, NgModule } from '@angular/core';
import { NavController, NavParams, LoadingController, IonicPage } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Database } from './../../providers/database/database';
import { Localstorage } from './../../providers/localstorage/localstorage';
import { ImageLoaderConfig } from 'ionic-image-loader';


@IonicPage()
@Component({
  selector: 'page-sponsors',
  templateUrl: 'sponsors.html',
})
export class SponsorsPage {

	public SponsorListing: any[] = [];
	public EntryTerms: string;

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
		console.log('ionViewDidLoad SponsorsPage');
	}

	@HostListener('document:keypress', ['$event'])
		handleKeyboardEvent(event: KeyboardEvent) { 
		if (event.key == 'Enter') {
			console.log('Enter key detected');
			this.GetSearchResults();
		}
	}

	ngOnInit() {

		// Load initial data set here
		//let loading = this.loadingCtrl.create({
		//	spinner: 'crescent',
		//	content: 'Please wait...'
		//});

		//loading.present();
		this.imageLoaderConfig.setFallbackUrl('');
		console.log('Loading SponsorData...');

		// Blank and show loading info
		this.SponsorListing = [];
		this.cd.markForCheck();
		
		// Temporary use variables
		var flags = "li|Alpha|";
        var SponsorDividerLevel = "";
		var sponsorDividerPY;
		var sponsorDividerGY;
		var sponsorDividerSY;
		var sponsorDividerP;
		var sponsorDividerG;
		var sponsorDividerS;
		var sponsorDividerB;
		var ContactWeb;
		var ContactEmail;
		var ContactPhone;
		var ContactLinkedIn;
		var ContactTwitter;
		var ContactFacebook;
		
		// Get the data
		this.databaseprovider.getSponsorData(flags, "0").then(data => {
			
			console.log('Sponsor Data: ' + JSON.stringify(data));
			
			if (data['length']>0) {
				
				for (var i = 0; i < data['length']; i++) {

					var imageAvatar = data[i].SponsorLogoFilename;
					if (imageAvatar != "") {
						imageAvatar = "https://naeyc.convergence-us.com/AdminGateway/images/Sponsors/" + imageAvatar;
						//imageAvatar = "assets/img/Sponsors/" + imageAvatar;
					}
					console.log(imageAvatar);
					
					ContactWeb = false;
					if (data[i].SponsorContactWeb != "") {
						ContactWeb = true;
					}
					ContactEmail = false;
					if (data[i].SponsorContactEmail != "") {
						ContactEmail = true;
					}
					ContactPhone = false;
					if (data[i].SponsorContactPhone != "") {
						ContactPhone = true;
					}
					ContactLinkedIn = false;
					if (data[i].SponsorSocialMediaLinkedIn != "") {
						ContactLinkedIn = true;
					}
					ContactTwitter = false;
					if (data[i].SponsorSocialMediaTwitter != "") {
						ContactTwitter = true;
					}
					ContactFacebook = false;
					if (data[i].SponsorSocialMediaFacebook != "") {
						ContactFacebook = true;
					}

					var SponsorDescription = data[i].SponsorDescription;
					console.log(SponsorDescription);
					SponsorDescription = SponsorDescription.replace(/ï¿½/g, "'");
					SponsorDescription = SponsorDescription.replace(/�/g, "'");
					
					
					//if (data[i].SponsorLevel != SponsorDividerLevel) {
						
						console.log('Set new divider: ' + data[i].SponsorLevel) ;
						
						switch(data[i].SponsorLevel) {
							case "Year Round Platinum Sponsor":
								sponsorDividerPY = true;
								sponsorDividerGY = false;
								sponsorDividerSY = false;
								sponsorDividerP = false;
								sponsorDividerG = false;
								sponsorDividerS = false;
								sponsorDividerB = false;
								break;
							case "Year Round Gold Sponsor":
								sponsorDividerPY = false;
								sponsorDividerGY = true;
								sponsorDividerSY = false;
								sponsorDividerP = false;
								sponsorDividerG = false;
								sponsorDividerS = false;
								sponsorDividerB = false;
								break;
							case "Year Round Silver Sponsor":
								sponsorDividerPY = false;
								sponsorDividerGY = false;
								sponsorDividerSY = true;
								sponsorDividerP = false;
								sponsorDividerG = false;
								sponsorDividerS = false;
								sponsorDividerB = false;
								break;
							case "Platinum":
								sponsorDividerPY = false;
								sponsorDividerGY = false;
								sponsorDividerSY = false;
								sponsorDividerP = true;
								sponsorDividerG = false;
								sponsorDividerS = false;
								sponsorDividerB = false;
								break;
							case "Gold":
								sponsorDividerPY = false;
								sponsorDividerGY = false;
								sponsorDividerSY = false;
								sponsorDividerP = false;
								sponsorDividerG = true;
								sponsorDividerS = false;
								sponsorDividerB = false;
								break;
							case "Silver":
								sponsorDividerPY = false;
								sponsorDividerGY = false;
								sponsorDividerSY = false;
								sponsorDividerP = false;
								sponsorDividerG = false;
								sponsorDividerS = true;
								sponsorDividerB = false;
								break;
							case "Bronze":
								sponsorDividerPY = false;
								sponsorDividerGY = false;
								sponsorDividerSY = false;
								sponsorDividerP = false;
								sponsorDividerG = false;
								sponsorDividerS = false;
								sponsorDividerB = true;
								break;
						}
								
                        // Display the divider
						/*
						this.SponsorListing.push({
							SponsorID: 0,
							SponsorName: "",
							SponsorDescription: "",
							SponsorWeb: "",
							SponsorEmail: "",
							SponsorPhone: "",
							SponsorSocialMediaLinkedIn: "",
							SponsorSocialMediaTwitter: "",
							SponsorSocialMediaFacebook: "",
							SponsorLogo: "",
							showDividerPY: sponsorDividerPY,
							showDividerGY: sponsorDividerGY,
							showDividerSY: sponsorDividerSY,
							showDividerP: sponsorDividerP,
							showDividerG: sponsorDividerG,
							showDividerS: sponsorDividerS,
							showDividerB: sponsorDividerB,
							showHeader: false,
							showLogoDescription: false,
							showContact: false,
							showContactWeb: false,
							showContactEmail: false,
							showContactPhone: false,
							showContactLinkedIn: false,
							showContactTwitter: false,
							showContactFacebook: false,
						});

						// Set the new marker point
						SponsorDividerLevel = data[i].SponsorLevel;
						*/
						
						// Add current record to the list
						this.SponsorListing.push({
							SponsorID: data[i].SponsorID,
							SponsorName: data[i].SponsorName,
							SponsorDescription: SponsorDescription,
							SponsorWeb: data[i].SponsorContactWeb,
							SponsorEmail: data[i].SponsorContactEmail,
							SponsorPhone: data[i].SponsorContactPhone,
							SponsorSocialMediaLinkedIn: data[i].SponsorSocialMediaLinkedIn,
							SponsorSocialMediaTwitter: data[i].SponsorSocialMediaTwitter,
							SponsorSocialMediaFacebook: data[i].SponsorSocialMediaFacebook,
							SponsorLogo: imageAvatar,
							showDividerPY: sponsorDividerPY,
							showDividerGY: sponsorDividerGY,
							showDividerSY: sponsorDividerSY,
							showDividerP: sponsorDividerP,
							showDividerG: sponsorDividerG,
							showDividerS: sponsorDividerS,
							showDividerB: sponsorDividerB,
							showHeader: true,
							showLogoDescription: true,
							showContact: true,
							showContactWeb: ContactWeb,
							showContactEmail: ContactEmail,
							showContactPhone: ContactPhone,
							showContactLinkedIn: ContactLinkedIn,
							showContactTwitter: ContactTwitter,
							showContactFacebook: ContactFacebook,
						});
					/*
					} else {

						// Add current record to the list
						this.SponsorListing.push({
							SponsorID: data[i].SponsorID,
							SponsorName: data[i].SponsorName,
							SponsorDescription: SponsorDescription,
							SponsorWeb: data[i].SponsorContactWeb,
							SponsorEmail: data[i].SponsorContactEmail,
							SponsorPhone: data[i].SponsorContactPhone,
							SponsorSocialMediaLinkedIn: data[i].SponsorSocialMediaLinkedIn,
							SponsorSocialMediaTwitter: data[i].SponsorSocialMediaTwitter,
							SponsorSocialMediaFacebook: data[i].SponsorSocialMediaFacebook,
							SponsorLogo: imageAvatar,
							showDividerPY: sponsorDividerPY,
							showDividerGY: sponsorDividerGY,
							showDividerSY: sponsorDividerSY,
							showDividerP: sponsorDividerP,
							showDividerG: sponsorDividerG,
							showDividerS: sponsorDividerS,
							showDividerB: sponsorDividerB,
							showHeader: true,
							showLogoDescription: true,
							showContact: true,
							showContactWeb: ContactWeb,
							showContactEmail: ContactEmail,
							showContactPhone: ContactPhone,
							showContactLinkedIn: ContactLinkedIn,
							showContactTwitter: ContactTwitter,
							showContactFacebook: ContactFacebook,
						});

					}
					*/
				}


			} else {
				
                // No records to show
				this.SponsorListing.push({
					SponsorID: 0,
					SponsorName: "No sponsors available",
					SponsorDescription: "",
					SponsorWeb: "",
					SponsorEmail: "",
					SponsorPhone: "",
					SponsorSocialMediaLinkedIn: "",
					SponsorSocialMediaTwitter: "",
					SponsorSocialMediaFacebook: "",
					SponsorLogo: "",
					showDividerPY: false,
					showDividerGY: false,
					showDividerSY: false,
					showDividerP: false,
					showDividerG: false,
					showDividerS: false,
					showDividerB: false,
					showHeader: true,
					showLogoDescription: false,
					showContact: false,
					showContactWeb: false,
					showContactEmail: false,
					showContactPhone: false,
					showContactLinkedIn: false,
					showContactTwitter: false,
					showContactFacebook: false,
				});

			}

			this.cd.markForCheck();

			//loading.dismiss();
			
		}).catch(function () {
			console.log("Sponsor Promise Rejected");
		});

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

	navToWeb(wURL) {
		
		if (wURL != "") {
            if ((wURL.substring(0, 7) != "http://") && (wURL.substring(0, 8) != "https://")) {
                wURL = "http://" + wURL;
            }
			
			console.log('Attendee Profile Details: Navigating to: ' + wURL);
            window.open(wURL, '_system');
		}

	}

    navToEmail(EmailAddress) {
        if (EmailAddress === undefined) {
            // Do nothing
        } else {
            // Initiate mail program
            window.open('mailto:' + EmailAddress + '?subject=Demo Planner Chicago','target=_blank');
        }

    };

	callPhone2(phoneNumber) {
        console.log("Dialer version 2");
		var DevicePlatform = this.localstorage.getLocalValue('DevicePlatform');
		
		if (DevicePlatform!='Browser') {
			if ((phoneNumber === undefined) || (phoneNumber == '')) {
				console.log('No phone number defined');
				// Do nothing
			} else {
				// remove all other characters from phone number string
				phoneNumber = phoneNumber.replace(/-/g, '');
				phoneNumber = phoneNumber.replace('(', '');
				phoneNumber = phoneNumber.replace(')', '');
				phoneNumber = phoneNumber.replace(' ', '');

				console.log('Dialer: tel:' + phoneNumber);

				window['plugins'].CallNumber.callNumber(function onSuccess(result){
					console.log("Dialer Success:" + JSON.stringify(result));
				},
				function onError(result) {
					console.log("Dialer Error:" + JSON.stringify(result));
				}, phoneNumber, false);

			}
		}
    }
	
}
