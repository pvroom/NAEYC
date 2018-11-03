// Components, functions, plugins
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, NgModule } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Database } from './../../providers/database/database';
import { Localstorage } from './../../providers/localstorage/localstorage';
import { LeafletDirective } from '@asymmetrik/ngx-leaflet/dist';
//import { ImageLoaderConfig } from 'ionic-image-loader';

import * as L from "leaflet";

@IonicPage()
@Component({
  selector: 'page-exhibitordetails',
  templateUrl: 'exhibitordetails.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ExhibitorDetailsPage {

	// Exhibitor Details
	public ExhibitorCompanyName: string;
	public ExhibitorAddressLine1: string;
	public ExhibitorDisplayCityState: string;
	public ExhibitorZipPostalCode: string;
	public ExhibitorBoothNumber: string;
	//public ExhibitorCompanyLogoFilename: string;
	public ExhibitorPrimaryOnsiteContactEmailURL: string;
	public ExhibitorPrimaryOnsiteContactPhone: string;
	public ExhibitorPrimaryOnsiteContactEmailDisplay: string;
	public ExhibitorPrimaryOnsiteContactName: string;
	public ExhibitorWebsite: string;
	public ExhibitorCompanyDescription: string;
	public exDetails: string;
	public visPrimaryContact: boolean;
	
	// Contact Buttons
	public btnEmail: string;
	public btnWebsite: string;
	public btnCall: string;

	// Bookmark button
	public visBookmarkAddRemoveButton: string;
	public btnBookmarkManagement = true;
	public BookmarkButtonColor: string = '#ffffff';
	public BookmarkButtonTextColor: string = '#004c94';

	// Sopcial Media Icons
	public visSocialMediaFacebookVisible = false;
	public visSocialMediaTwitterVisible = false;
	public visSocialMediaLinkedInVisible = false;
	public visSocialMediaYouTubeVisible = false;
	public visSocialMediaRSSVisible = false;
	public visSocialMediaGooglePlusVisible = false;
	public visSocialMediaHeader = false;
	public ExhibitorSocialMediaFacebook: string;
	public ExhibitorSocialMediaTwitter: string;
	public ExhibitorSocialMediaLinkedIn: string;
	public ExhibitorSocialMediaYouTube: string;
	public ExhibitorSocialMediaRSS: string;
	public ExhibitorSocialMediaGooglePlus: string;

	// Leaflet mapping variables
	myMap: any;
	
	constructor(public navCtrl: NavController, 
				public navParams: NavParams,
				private storage: Storage,
				private databaseprovider: Database,
				private cd: ChangeDetectorRef,
				//private imageLoaderConfig: ImageLoaderConfig,
				public loadingCtrl: LoadingController,
				public alertCtrl: AlertController,
				private localstorage: Localstorage) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ExhibitorDetailsPage');
	}

	ngOnInit() {

		// Load initial data set here
		//let loading = this.loadingCtrl.create({
		//	spinner: 'crescent',
		//	content: 'Please wait...'
		//});

		//loading.present();

		// Blank and show loading info
		this.cd.markForCheck();
		//this.imageLoaderConfig.setFallbackUrl('assets/img/a_00_3920.jpg');

		
		// Temporary use variables
		var flags = "dt|Alpha|" + this.navParams.get('ExhibitorID');
        var DisplayName = "";
        var DisplayCityState = "";
		var DevicePlatform = this.localstorage.getLocalValue('DevicePlatform');
		var AttendeeID = this.localstorage.getLocalValue('AttendeeID');

		// Get the data
		this.databaseprovider.getExhibitorData(flags).then(data => {
			
			console.log("getExhibitorData: " + JSON.stringify(data));

			if (data['length']>0) {
				
				console.log("Main exhibitor information");
				if(data[0].City !== null && data[0].City != "") {
					if (data[0].Country != "United States" && data[0].Country != "" && data[0].Country != null) {
						DisplayCityState = data[0].City + ", " + data[0].Country;
					} else {
						DisplayCityState = data[0].City + ", " + data[0].State + "  " + data[0].ZipPostalCode;
					}
				} else {
					DisplayCityState = "";
				}
				
                this.ExhibitorCompanyName = data[0].CompanyName;
                this.ExhibitorAddressLine1 = data[0].AddressLine1;
                this.ExhibitorDisplayCityState = DisplayCityState;
                this.ExhibitorZipPostalCode = data[0].ZipPostalCode;
                this.ExhibitorBoothNumber = "Booth: " + data[0].BoothNumber;

				//this.ExhibitorCompanyLogoFilename = "https://naeyc.convergence-us.com/AdminGateway/images/Logos/" + data[0].ExhibitorID + ".png";
				//console.log('Logo URL: ' + this.ExhibitorCompanyLogoFilename);
				
                this.btnEmail = "danger";
                this.btnWebsite = "danger";
                this.btnCall = "danger";

                // Button bar
				console.log("Button bar setup");
                if ((data[0].PrimaryOnsiteContactEmail == "") || (data[0].PrimaryOnsiteContactEmail == null) || (data[0].PrimaryOnsiteContactEmail === undefined)) {
                    this.btnEmail = "light";
					console.log('Button btnEmail greyed out');
                } else {
                    this.ExhibitorPrimaryOnsiteContactEmailURL = data[0].PrimaryOnsiteContactEmail;
                }

                if ((data[0].Website == "") || (data[0].Website == null) || (data[0].Website === undefined)) {
                    this.btnWebsite = "light";
					console.log('Button btnWebsite greyed out');
                } else {
                    this.ExhibitorWebsite = data[0].Website;
                }

				if (DevicePlatform=='Browser') {
						this.btnCall = "light";
						console.log('Button btnCall greyed out');
				} else {
					if ((data[0].PrimaryOnsiteContactPhone == "") || (data[0].PrimaryOnsiteContactPhone == null) || (data[0].PrimaryOnsiteContactPhone === undefined)) {
						this.btnCall = "light";
						console.log('Button btnCall greyed out');
					} else {
						this.ExhibitorPrimaryOnsiteContactPhone = data[0].PrimaryOnsiteContactPhone;
						console.log('Primary contact');
					}
				}
				
                // Primary contact
				console.log("Contact setup");
				if(data[0].PrimaryOnsiteContactName !== null && data[0].PrimaryOnsiteContactName != "") {
					this.ExhibitorPrimaryOnsiteContactName = data[0].PrimaryOnsiteContactName;
					this.visPrimaryContact = true;
				} else {
					this.visPrimaryContact = false;
				}
                this.ExhibitorPrimaryOnsiteContactEmailDisplay = data[0].PrimaryOnsiteContactEmail;
                if (data[0].PrimaryOnsiteContactPhone != null) {
                    if ((data[0].PrimaryOnsiteContactPhone.length > 0) && (data[0].PrimaryOnsiteContactPhone != "") && (typeof data[0].PrimaryOnsiteContactPhone !== "undefined")) {
                        this.ExhibitorPrimaryOnsiteContactPhone = data[0].PrimaryOnsiteContactPhone;
                    } else {
                        this.ExhibitorPrimaryOnsiteContactPhone = "";
                    }
                } else {
                    this.ExhibitorPrimaryOnsiteContactPhone = "";
                }

                // Values for Bookmark Management
                this.localstorage.setLocalValue("BookmarkID", data[0].ExhibitorID);
                this.localstorage.setLocalValue("BookmarkType", "Exhibitors");

                if (data[0].Bookmarked != "0") {
                    this.visBookmarkAddRemoveButton = "Remove";
					this.BookmarkButtonColor = '#004c94';
					this.BookmarkButtonTextColor = '#ffffff';
                } else {
                    this.visBookmarkAddRemoveButton = "Bookmark";
					this.BookmarkButtonColor = '#ffffff';
					this.BookmarkButtonTextColor = '#004c94';
                }

                // Company Details
				console.log("Company Description setup");
                if ((data[0].CompanyDescription == "") || (data[0].CompanyDescription == null) || (data[0].CompanyDescription === undefined)) {
                    this.ExhibitorCompanyDescription = "Not available";
                    this.exDetails = "Not available";
                } else {
                    this.ExhibitorCompanyDescription = data[0].CompanyDescription;
                    this.exDetails = data[0].CompanyDescription;
                }

                // Social media tags
				console.log("Social media setup");
                var SocialMediaCheck = 0;
                this.visSocialMediaFacebookVisible = false;
                this.visSocialMediaTwitterVisible = false;
                this.visSocialMediaLinkedInVisible = false;
                this.visSocialMediaYouTubeVisible = false;
                this.visSocialMediaRSSVisible = false;
                this.visSocialMediaGooglePlusVisible = false;
                this.visSocialMediaHeader = false;

                //  Visual status
                if (data[0].SocialMediaFacebook != null) {
                    if ((data[0].SocialMediaFacebook.length > 0) && (data[0].SocialMediaFacebook != "") && (data[0].SocialMediaFacebook !== undefined)) {
                        this.visSocialMediaFacebookVisible = true;
                        SocialMediaCheck = 1;
                    }
                }
                if (data[0].SocialMediaTwitter != null) {
                    if ((data[0].SocialMediaTwitter.length > 0) && (data[0].SocialMediaTwitter != "") && (data[0].SocialMediaTwitter !== undefined)) {
                        this.visSocialMediaTwitterVisible = true;
                        SocialMediaCheck = 1;
                    }
                }
                if (data[0].SocialMediaLinkedIn != null) {
                    if ((data[0].SocialMediaLinkedIn.length > 0) && (data[0].SocialMediaLinkedIn != "") && (data[0].SocialMediaLinkedIn !== undefined)) {
                        this.visSocialMediaLinkedInVisible = true;
                        SocialMediaCheck = 1;
                    }
                }
                if (data[0].SocialMediaYouTube != null) {
                    if ((data[0].SocialMediaYouTube.length > 0) && (data[0].SocialMediaYouTube != "") && (data[0].SocialMediaYouTube !== undefined)) {
                        this.visSocialMediaYouTubeVisible = true;
                        SocialMediaCheck = 1;
                    }
                }
                if (data[0].SocialMediaRSS != null) {
                    if ((data[0].SocialMediaRSS.length > 0) && (data[0].SocialMediaRSS != "") && (data[0].SocialMediaRSS !== undefined)) {
                        this.visSocialMediaRSSVisible = true;
                        SocialMediaCheck = 1;
                    }
                }
                if (data[0].SocialMediaGooglePlus != null) {
                    if ((data[0].SocialMediaGooglePlus.length > 0) && (data[0].SocialMediaGooglePlus != "") && (data[0].SocialMediaGooglePlus !== undefined)) {
                        this.visSocialMediaGooglePlusVisible = true;
                        SocialMediaCheck = 1;
                    }
                }
                if (SocialMediaCheck == 1) {
                    this.visSocialMediaHeader = true;
                }

                // Social Media Links
                this.ExhibitorSocialMediaFacebook = data[0].SocialMediaFacebook;
                this.ExhibitorSocialMediaTwitter = data[0].SocialMediaTwitter;
                this.ExhibitorSocialMediaLinkedIn = data[0].SocialMediaLinkedIn;
                this.ExhibitorSocialMediaYouTube = data[0].SocialMediaYouTube;
                this.ExhibitorSocialMediaRSS = data[0].SocialMediaRSSVisible;
                this.ExhibitorSocialMediaGooglePlus = data[0].SocialMediaGooglePlus;
				
				this.cd.markForCheck();

                // Booth mapping
				console.log("Locator setup");
                var y = 0;
                var x = 0;
                var ExhibitorName = "";

                if (data[0].BoothY != null) {
                    y = data[0].BoothY;
                    x = data[0].BoothX;
                }
                ExhibitorName = data[0].CompanyName;

				console.log("Booth mapping (x,y): " + x + ", " + y);
				
                if ((x === undefined) || (y === undefined)) {
                    // Show empty map
					console.log("Booth mapping: Empty map");
                    this.myMap = L.map('map2', {
                        crs: L.CRS.Simple,
                        minZoom: -2,
                        maxZoom: 1,
                        zoomControl: false
                    });

                    var bounds = L.latLngBounds([0, 0], [1000, 2000]);    // Normally 1000, 1000; stretched to 2000,1000 for AACD 2017
                    var image = L.imageOverlay('assets/img/ExhibitHallFloorplan2018.png', bounds, {
                        attribution: 'Convergence'
                    }).addTo(this.myMap);

                    this.myMap.fitBounds(bounds);

                } else {

                    // Simple coordinate system mapping
					console.log("Booth mapping: Simple coordinate system");
                    this.myMap = L.map('map2', {
                        crs: L.CRS.Simple,
                        minZoom: -2,
                        maxZoom: 1,
                        zoomControl: false
                    });
					console.log("Booth mapping: Set link to HTML object for display");

                    var bounds = L.latLngBounds([0, 0], [1000, 2000]);    // Normally 1000, 1000; stretched to 2000,1000 for AACD 2017
					console.log("Booth mapping: Set bounds for map");

                    var image = L.imageOverlay('assets/img/ExhibitHallFloorplan2018.png', bounds, {
                        attribution: 'Convergence'
                    }).addTo(this.myMap);
					console.log("Booth mapping: Set image for map");

                    this.myMap.fitBounds(bounds);
					console.log("Booth mapping: fitBounds of map");
					
					this.myMap.setMaxBounds(bounds);
					console.log("Booth mapping: Set maximum bounds for map");
					
                    var Exhibitor = L.latLng([y, x]);
					console.log("Booth mapping: Set exhibitor pindrop location");

                    L.marker(Exhibitor).addTo(this.myMap)
                        .bindPopup(ExhibitorName)
                        .openPopup();
					console.log("Booth mapping: Added pindrop to map");

                    this.myMap.setView([y, x], 1);
					console.log("Booth mapping: Centered view on pindrop");

                }

			} else {
				
                // No data to show
				console.log("No data to show - which is not right");

			}

			//loading.dismiss();
			
		}).catch(function () {
			console.log("Exhibitor Details Promise Rejected");
		});

        // -------------------
        // Get Attendee Status
        // -------------------
		console.log('Attendee Button Management, AttendeeID: ' + AttendeeID);
		if (AttendeeID == '0') {
			this.btnBookmarkManagement = false;
		} else {
			this.btnBookmarkManagement = true;
		}
	}

    navToWebsite(WebsiteURL) {

        if (WebsiteURL === undefined) {
            // Do nothing
        } else {
            // Initiate web browser
            if ((WebsiteURL.substring(0, 7) != "http://") && (WebsiteURL.substring(0, 8) != "https://")) {
                WebsiteURL = "http://" + WebsiteURL;
            }
			
			console.log('Exhibitor Details: Navigating to: ' + WebsiteURL);
            window.open(WebsiteURL, '_system');
        }

    };

    navToEmail(EmailAddress) {
        if (EmailAddress === undefined) {
            // Do nothing
        } else {
            // Initiate mail program
            window.open('mailto:' + EmailAddress + '?subject=NAEYC 2018 Institute', '_system');
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
