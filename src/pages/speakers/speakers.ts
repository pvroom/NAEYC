// Components, functions, plugins
import { Component, HostListener, ChangeDetectionStrategy, ChangeDetectorRef, NgModule } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Database } from './../../providers/database/database';
import { Localstorage } from './../../providers/localstorage/localstorage';
import { ImageLoaderConfig } from 'ionic-image-loader';
import { IonicImageLoader } from 'ionic-image-loader';


@Component({
  selector: 'page-speakers',
  templateUrl: 'speakers.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})



export class SpeakersPage {

	public SpeakerListing: any[] = [];
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
		console.log('ionViewDidLoad SpeakersPage');
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
		let loading = this.loadingCtrl.create({
			spinner: 'crescent',
			content: 'Please wait...'
		});

		loading.present();

		// Blank and show loading info
		this.SpeakerListing = [];
		this.cd.markForCheck();
		//this.imageLoaderConfig.setFallbackUrl('assets/img/personIcon.png');
		
		// Temporary use variables
		var flags = "li|Alpha|0";
        var DisplayName = "";
		var visDisplayCredentials = "";
        var SpeakerDividerCharacter = "";
		
		// Get the data
		this.databaseprovider.getSpeakerData(flags, "0").then(data => {
			
			//console.log("getSpeakerData: " + JSON.stringify(data));

			if (data['length']>0) {
				
				for (var i = 0; i < data['length']; i++) {

                    DisplayName = "";

                    // Concatenate fields to build displayable name
                    DisplayName = DisplayName + data[i].LastName + ", " + data[i].FirstName;
					
                    // AACD does not have middle name/initial for speakers
                    //if (data[i].MiddleInitial != "") {
                    //    DisplayName = DisplayName + " " + data[i].MiddleInitial;
                    //}
					
					// Use Credentials field for Company/Association
					visDisplayCredentials = "";
                    if (data[i].Company != "") {
                        visDisplayCredentials = data[i].Company;
                    }

					var imageAvatar = data[i].imageFilename;
					//imageAvatar = imageAvatar.substr(0, imageAvatar.length - 3) + 'png';
					//console.log("imageAvatar: " + imageAvatar);
					imageAvatar = "https://naeyc.convergence-us.com/AdminGateway/images/Speakers/" + imageAvatar;
					console.log('imageAvatar: ' + imageAvatar);
					
                    if (data[i].LastName.charAt(0) != SpeakerDividerCharacter) {

                        // Display the divider
						this.SpeakerListing.push({
							SpeakerID: 0,
							DisplayNameLastFirst: data[i].LastName.charAt(0),
							DisplayCredentials: "",
							DisplayTitle: "",
							Affiliation: "",
							speakerIcon: "nothing",
							speakerAvatar: "assets/img/SpeakerDivider.png",
							speakerClass: "dividerBg!important",
							navigationArrow: "nothing",
						});

						// Set the new marker point
						SpeakerDividerCharacter = data[i].LastName.charAt(0);


                        // Show the current record
						this.SpeakerListing.push({
							SpeakerID: data[i].speakerID,
							DisplayNameLastFirst: DisplayName,
							DisplayCredentials: visDisplayCredentials,
							DisplayTitle: data[i].Title,
							Affiliation: "",
							speakerIcon: "person",
							speakerAvatar: imageAvatar,
							speakerClass: "",
							navigationArrow: "arrow-dropright",
						});

                    } else {

                        // Add current record to the list
						this.SpeakerListing.push({
							SpeakerID: data[i].speakerID,
							DisplayNameLastFirst: DisplayName,
							DisplayCredentials: visDisplayCredentials,
							DisplayTitle: data[i].Title,
							Affiliation: "",
							speakerIcon: "person",
							speakerAvatar: imageAvatar,
							speakerClass: "",
							navigationArrow: "arrow-dropright",
						});
						
					}

				}


			} else {
				
                // No records to show
				this.SpeakerListing.push({
					SpeakerID: 0,
					DisplayNameLastFirst: "No records available",
					DisplayCredentials: "",
					DisplayTitle: "",
					Affiliation: "",
					speakerIcon: "",
					speakerAvatar: "assets/img/personIcon.png",
					speakerClass: "myLabelBold",
					navigationArrow: "",
				});

			}

			this.cd.markForCheck();

			loading.dismiss();
			
		}).catch(function () {
			console.log("Promise Rejected");
		});
					
			
		
	}

    SpeakerDetails(SpeakerID) {

		if (SpeakerID != 0) {
						
			// Navigate to Speaker Details page
			this.navCtrl.push('SpeakerDetailsPage', {SpeakerID: SpeakerID}, {animate: true, direction: 'forward'});
			
		}
    };

    GetSearchResults() {

        var SearchTerms = this.EntryTerms;

        if ((SearchTerms == undefined) || (SearchTerms == "")) {
            // Do nothing or show message
        } else {

            this.localstorage.setLocalValue("SearchTerms", SearchTerms);
			this.navCtrl.push('SearchResultsPage', {SearchTerms: SearchTerms}, {animate: true, direction: 'forward'});

        }
	};
	

}
