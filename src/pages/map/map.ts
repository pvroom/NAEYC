import { Component, ViewChild } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { LeafletDirective } from '@asymmetrik/ngx-leaflet/dist';

import * as L from "leaflet";



declare var google: any;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

	// Leaflet mapping variables
	myMap2: any;
	myMap3: any;
	myMap4: any;
	myMap5: any;
	myMap6: any;
	myMap7: any;
	myMap8: any;
	myMap9: any;
	myMap10: any;

	constructor(public navCtrl: NavController, 
				public platform: Platform) {
			
	}


	ngOnInit() {
		
		// -----------------
		// Show Level 1
		// -----------------
		this.myMap2 = L.map('mapLevel2', {
			crs: L.CRS.Simple,
			minZoom: -1,
			maxZoom: 1,
			zoomControl: true
		});

		var bounds = L.latLngBounds([0, 0], [1200, 1700]);    // Normally 1000, 1000; stretched to 2000,1000 for AACD 2017
		var image = L.imageOverlay('assets/img/level1.png', bounds, {
			attribution: 'Convergence'
		}).addTo(this.myMap2);

		this.myMap2.fitBounds(bounds);
		this.myMap2.setMaxBounds(bounds);
		
		// -----------------
		// Show Level 2
		// -----------------
		this.myMap3 = L.map('mapLevel3', {
			crs: L.CRS.Simple,
			minZoom: -1,
			maxZoom: 1,
			zoomControl: true
		});

		var bounds = L.latLngBounds([0, 0], [1200, 1700]);    // Normally 1000, 1000; stretched to 2000,1000 for AACD 2017
		var image = L.imageOverlay('assets/img/level2.png', bounds, {
			attribution: 'Convergence'
		}).addTo(this.myMap3);

		this.myMap3.fitBounds(bounds);
		this.myMap3.setMaxBounds(bounds);


		// -----------------
		// Show Level 3
		// -----------------
		this.myMap4 = L.map('mapLevel4', {
			crs: L.CRS.Simple,
			minZoom: -1,
			maxZoom: 1,
			zoomControl: true
		});

		var bounds = L.latLngBounds([0, 0], [1200, 1700]);    // Normally 1000, 1000; stretched to 2000,1000 for AACD 2017
		var image = L.imageOverlay('assets/img/level3.png', bounds, {
			attribution: 'Convergence'
		}).addTo(this.myMap4);

		this.myMap4.fitBounds(bounds);
		this.myMap4.setMaxBounds(bounds);


		// -----------------
		// Show Concourse
		// -----------------
		this.myMap5 = L.map('mapLevel5', {
			crs: L.CRS.Simple,
			minZoom: -1,
			maxZoom: 1,
			zoomControl: true
		});

		var bounds = L.latLngBounds([0, 0], [1200, 1700]);    // Normally 1000, 1000; stretched to 2000,1000 for AACD 2017
		var image = L.imageOverlay('assets/img/concourse.png', bounds, {
			attribution: 'Convergence'
		}).addTo(this.myMap5);

		this.myMap5.fitBounds(bounds);
		this.myMap5.setMaxBounds(bounds);


		// -----------------
		// Show Salons
		// -----------------
		this.myMap6 = L.map('mapLevel6', {
			crs: L.CRS.Simple,
			minZoom: -1,
			maxZoom: 1,
			zoomControl: true
		});

		var bounds = L.latLngBounds([0, 0], [1200, 1700]);    // Normally 1000, 1000; stretched to 2000,1000 for AACD 2017
		var image = L.imageOverlay('assets/img/salons.png', bounds, {
			attribution: 'Convergence'
		}).addTo(this.myMap6);

		this.myMap6.fitBounds(bounds);
		this.myMap6.setMaxBounds(bounds);


		this.myMap7 = L.map('mapLevel7', {
			crs: L.CRS.Simple,
			minZoom: -1,
			maxZoom: 1,
			zoomControl: true
		});

		var bounds = L.latLngBounds([0, 0], [1200, 1700]);    // Normally 1000, 1000; stretched to 2000,1000 for AACD 2017
		var image = L.imageOverlay('assets/img/m.png', bounds, {
			attribution: 'Convergence'
		}).addTo(this.myMap7);

		this.myMap7.fitBounds(bounds);
		this.myMap7.setMaxBounds(bounds);


		this.myMap8 = L.map('mapLevel8', {
			crs: L.CRS.Simple,
			minZoom: -1,
			maxZoom: 1,
			zoomControl: true
		});

		var bounds = L.latLngBounds([0, 0], [1200, 1700]);    // Normally 1000, 1000; stretched to 2000,1000 for AACD 2017
		var image = L.imageOverlay('assets/img/m2.png', bounds, {
			attribution: 'Convergence'
		}).addTo(this.myMap8);

		this.myMap8.fitBounds(bounds);
		this.myMap8.setMaxBounds(bounds);


		this.myMap9 = L.map('mapLevel9', {
			crs: L.CRS.Simple,
			minZoom: -1,
			maxZoom: 1,
			zoomControl: true
		});

		var bounds = L.latLngBounds([0, 0], [1200, 1700]);    // Normally 1000, 1000; stretched to 2000,1000 for AACD 2017
		var image = L.imageOverlay('assets/img/m3.png', bounds, {
			attribution: 'Convergence'
		}).addTo(this.myMap9);

		this.myMap9.fitBounds(bounds);
		this.myMap9.setMaxBounds(bounds);


		this.myMap10 = L.map('mapLevel10', {
			crs: L.CRS.Simple,
			minZoom: -1,
			maxZoom: 1,
			zoomControl: true
		});

		var bounds = L.latLngBounds([0, 0], [1200, 1700]);    // Normally 1000, 1000; stretched to 2000,1000 for AACD 2017
		var image = L.imageOverlay('assets/img/m4.png', bounds, {
			attribution: 'Convergence'
		}).addTo(this.myMap10);

		this.myMap10.fitBounds(bounds);
		this.myMap10.setMaxBounds(bounds);



		
	}
	
}

