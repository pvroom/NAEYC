// Components, functions, plugins
import { Component, HostListener, ChangeDetectionStrategy, ChangeDetectorRef, NgModule } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Database } from './../../providers/database/database';
import { Localstorage } from './../../providers/localstorage/localstorage';

@Component({
  selector: 'page-exhibitors',
  templateUrl: 'exhibitors.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExhibitorsPage {

	public ExhibitorListing: any[] = [];
	public EntryTerms: string;

	constructor(public navCtrl: NavController, 
				public navParams: NavParams,
				private storage: Storage,
				private databaseprovider: Database,
				private cd: ChangeDetectorRef,
				public loadingCtrl: LoadingController,
				private localstorage: Localstorage) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ExhibitorsPage');
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

		// Blank and show loading info
		this.ExhibitorListing = [];
		this.cd.markForCheck();
		
		// Temporary use variables
		var flags = "li|Alpha|0";
		var dayID;
        var DisplayLocation = "";
        var ExhibitorDividerCharacter = "";
		var visCityState = true;
		
		// Get the data
		this.databaseprovider.getExhibitorData(flags).then(data => {
			
			console.log("getExhibitorData: " + JSON.stringify(data));

			// If data was returned, the create list
			if (data['length']>0) {
				
				// Loop through data
				for (var i = 0; i < data['length']; i++) {

					if ((data[i].City === null) || (data[i].City == "")) {
						visCityState = false;
					} else {
						// Construct location based on US or International
						if ((data[i].Country != "United States") && (data[i].Country != "") && (data[i].Country !== null)) {
							DisplayLocation = data[i].City + ", " + data[i].Country;
						} else {
							DisplayLocation = data[i].City + ", " + data[i].State;
						}
						visCityState = true;
					}
					// If Exhibitor is not in same grouping, create new divider bar
                    if (data[i].CompanyName.charAt(0).toUpperCase() != ExhibitorDividerCharacter) {

                        // Display the divider
						this.ExhibitorListing.push({
							ExhibitorID: 0,
							CompanyName: data[i].CompanyName.charAt(0).toUpperCase(),
							DisplayCityState: "",
							CityStateShow: false,
							BoothNumber: "",
							exhibitorIcon: "nothing",
							exhibitorClass: "wineDivider",
							navigationArrow: "nothing"
						});

						// Set the new marker point
                        ExhibitorDividerCharacter = data[i].CompanyName.charAt(0).toUpperCase();

                        // Show the current record
						this.ExhibitorListing.push({
							ExhibitorID: data[i].ExhibitorID,
							CompanyName: data[i].CompanyName,
							DisplayCityState: DisplayLocation,
							CityStateShow: visCityState,
							BoothNumber: "Booth: " + data[i].BoothNumber,
							exhibitorIcon: "people",
							exhibitorClass: "myLabelBold",
							navigationArrow: "arrow-dropright"
						});

                    } else {

						this.ExhibitorListing.push({
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

				}


			} else {
				
				this.ExhibitorListing.push({
					ExhibitorID: 0,
					CompanyName: "No records available",
					DisplayCityState: "",
					CityStateShow: false,
					BoothNumber: "",
					exhibitorIcon: "",
					exhibitorClass: "myLabelBold",
					navigationArrow: ""
				});

			}

			this.cd.markForCheck();

			//loading.dismiss();
			
		}).catch(function () {
			console.log("Promise Rejected");
		});
					
			
		
	}


	ExhibitorDetails(ExhibitorID) {

        if (ExhibitorID != 0) {
						
            // Navigate to Exhibitor Details page
			this.navCtrl.push('ExhibitorDetailsPage', {ExhibitorID: ExhibitorID}, {animate: true, direction: 'forward'});
			
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
