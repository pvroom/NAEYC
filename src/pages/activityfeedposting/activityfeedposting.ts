// Components, functions, plugins
import { Component, HostListener, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavParams, NavController, ViewController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Database } from './../../providers/database/database';
import { Localstorage } from './../../providers/localstorage/localstorage';
import { AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Observable } from 'rxjs/Observable';
import { normalizeURL } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

// Pages
import { HomePage } from '../home/home';
import { ActivityPage } from '../activity/activity';

@IonicPage()
@Component({
  selector: 'page-activityfeedposting',
  templateUrl: 'activityfeedposting.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityFeedPostingPage {

	public CommentEntry: string;
	public ActivityFeedAttachment: string;
	public deviceButtons: boolean;
	public browserButtons: boolean;
	
	constructor(public navCtrl: NavController,
				private navParams: NavParams, 
				private storage: Storage,
				private databaseprovider: Database,
				private cd: ChangeDetectorRef,
				private alertCtrl: AlertController, 
				private view: ViewController,
				public http: HttpClient,
				public loadingCtrl: LoadingController,
				private camera: Camera,
				public _DomSanitizer: DomSanitizer,
				private localstorage: Localstorage) {
				
	}

	addCameraImage() {
		
		const options: CameraOptions = {
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			correctOrientation:true,
			mediaType: this.camera.MediaType.PICTURE
		}

		this.camera.getPicture(options).then((imageData) => {
			// imageData is either a base64 encoded string or a file URI
			// If it's base64:
			console.log('Camera image');
			/*
			if (this.platform.is('ios')) {
				this.base64Image = normalizeURL(imageData);
				// IF problem only occur in ios and normalizeURL 
				//not work for you then you can also use 
				//this.base64Image= imageData.replace(/^file:\/\//, '');
			} else {
				this.base64Image= "data:image/jpeg;base64," + imageData;
			}, error => {
				console.log('ERROR -> ' + JSON.stringify(error));
			});
			*/
			this.ActivityFeedAttachment = 'data:image/jpeg;base64,' + imageData;
			//this.ActivityFeedAttachment = base64Image;
			this.localstorage.setLocalValue('ActivityFeedPostedImage', 'Y');
		
			this.cd.markForCheck();
			
		}, (err) => {
			// Handle error
			console.log('Camera error');
			console.log('Camera error: ' + JSON.stringify(err));
		});

	}
	
	addGalleryImage() {
		
		const options: CameraOptions = {
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE,
			correctOrientation:true,
			allowEdit: true,
			sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
		}

		this.camera.getPicture(options).then((imageData) => {
			// imageData is either a base64 encoded string or a file URI
			// If it's base64:
			console.log('Camera image');
			//if (this.platform.is('ios')) {
			//	imageData = _DomSanitizer.bypassSecurityTrustUrl(imageData);
			//}
			this.ActivityFeedAttachment = 'data:image/jpeg;base64,' + imageData;
			//this.ActivityFeedAttachment = base64Image;
			this.localstorage.setLocalValue('ActivityFeedPostedImage', 'Y');
		
			this.cd.markForCheck();
			
		}, (err) => {
			// Handle error
			console.log('Camera error');
			console.log('Camera error: ' + JSON.stringify(err));
		});

	}
	
	ionViewDidEnter() {

		this.ActivityFeedAttachment = '';
		this.localstorage.setLocalValue('ActivityFeedPostedImage', 'N');
	
		var CurrentDateTime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '').replace(/:/g, '').replace(/-/g,'').replace(' ', '');
		console.log('CurrentDateTime: ' + CurrentDateTime);
		var DevicePlatform = this.localstorage.getLocalValue('DevicePlatform');
		
		// Disable access to camera and gallery buttons when running in a browser
		// until the ability to pull an image via the browser can be implemented
		if (DevicePlatform == 'Browser') {
			console.log('Browser button settings');
			this.deviceButtons = false;
			this.browserButtons = true;
		} else {
			console.log('Device button settings');
			this.deviceButtons = true;
			this.browserButtons = false;
		}
		
		this.cd.markForCheck();

	}
	
	closeModal(UserAction) {
		
		var AttendeeID = this.localstorage.getLocalValue('AttendeeID');

		if (UserAction == "Save") {

			// Load initial data set here
			let loading = this.loadingCtrl.create({
				spinner: 'crescent',
				content: 'Saving your posting and image...'
			});

			loading.present();

			var CurrentDateTime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
			var PostedDateTime = CurrentDateTime;
			CurrentDateTime = CurrentDateTime.replace(/T/, ' ').replace(/\..+/, '').replace(/:/g, '').replace(/-/g,'').replace(' ', '');
			
			var NewFilename = AttendeeID + '-' + CurrentDateTime;
			console.log('New filename: ' + NewFilename);
			
			var UserComment = this.CommentEntry || '';
			//console.log('CommentEntry: ' + UserComment);
			//console.log('Image: ' + this.ActivityFeedAttachment);
			
			let url = 'https://naeyc.convergence-us.com/AdminGateway/image_uploader.php';
			let postData = new FormData();
			postData.append('file', this.ActivityFeedAttachment);
			postData.append('location', 'ActivityFeedAttachments');
			postData.append('filename', NewFilename);
			postData.append('Comment', UserComment);
			postData.append('AttendeeID', AttendeeID);
			
			let data:Observable<any> = this.http.post(url, postData);
			
			data.subscribe((result) => {
				
				console.log("Image uploaded: " + JSON.stringify(result));
				console.log('afID: ' + result.afID);
				loading.dismiss();
				this.view.dismiss(UserAction);
						
				//var flags = 'ad|' + result.afID + '|' + UserComment + '|0|' + NewFilename + '.jpg|' + PostedDateTime;
				//this.localstorage.setLocalValue('ActivityFeedFlags', flags);
				
				//this.databaseprovider.getActivityFeedData(flags, AttendeeID).then(data3 => {
					
				//	console.log("getActivityFeedData: " + JSON.stringify(data3));

				//	if (data3['length']>0) {

				//		console.log("Return status: " + data3[0].Status);
				//		loading.dismiss();
				//		this.view.dismiss(UserAction);
						
				//	}
				
				//}).catch(function () {
				//	console.log("Activity Feed Promise Rejected");
				//	loading.dismiss();
				//});

			});
							
		}
		
		if (UserAction == "Cancel") {
			this.view.dismiss(UserAction);
		}
		
	}

	closePage(UserAction) {
		
		var AttendeeID = this.localstorage.getLocalValue('AttendeeID');

		if (UserAction == "Save") {

			var afpImage = this.localstorage.getLocalValue('ActivityFeedPostedImage');

				
			// Load initial data set here
			let loading = this.loadingCtrl.create({
				spinner: 'crescent',
				content: 'Saving your posting and image...'
			});

			loading.present();

			var CurrentDateTime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
			var PostedDateTime = CurrentDateTime;
			CurrentDateTime = CurrentDateTime.replace(/T/, ' ').replace(/\..+/, '').replace(/:/g, '').replace(/-/g,'').replace(' ', '');
			
			var NewFilename = AttendeeID + '-' + CurrentDateTime;
			console.log('New filename: ' + NewFilename);
			
			var UserComment = this.CommentEntry || '';
			//console.log('CommentEntry: ' + UserComment);
			//console.log('Image: ' + this.ActivityFeedAttachment);
			
			let url = 'https://naeyc.convergence-us.com/AdminGateway/image_uploader.php';
			let postData = new FormData();
			postData.append('file', this.ActivityFeedAttachment);
			postData.append('location', 'ActivityFeedAttachments');
			postData.append('filename', NewFilename);
			postData.append('Comment', UserComment);
			postData.append('afpImage', afpImage);
			postData.append('AttendeeID', AttendeeID);
			
			let data:Observable<any> = this.http.post(url, postData);
			
			console.log('Activity Feed Posting: Uploading image to URL: ' + url);
			
			data.subscribe((result) => {
				
				console.log("Image uploaded: " + JSON.stringify(result));
				console.log('afID: ' + result.afID);
				loading.dismiss();
				
				//this.navCtrl.setRoot(ActivityPage);
				this.navCtrl.pop();
						
				//var flags = 'ad|' + result.afID + '|' + UserComment + '|0|' + NewFilename + '.jpg|' + PostedDateTime;
				//this.localstorage.setLocalValue('ActivityFeedFlags', flags);
				
				//this.databaseprovider.getActivityFeedData(flags, AttendeeID).then(data3 => {
					
				//	console.log("getActivityFeedData: " + JSON.stringify(data3));

				//	if (data3['length']>0) {

				//		console.log("Return status: " + data3[0].Status);
				//		loading.dismiss();
				//		this.view.dismiss(UserAction);
						
				//	}
				
				//}).catch(function () {
				//	console.log("Activity Feed Promise Rejected");
				//	loading.dismiss();
				//});

			},
			err => {
				loading.dismiss();
				let alert = this.alertCtrl.create({
					title: 'Image Upload Error',
					subTitle: 'Problem receiving feedback from server - check log.',
					buttons: ['OK']
				});
				alert.present();
				console.log(err.status);
				console.log("Image uploader error: ", JSON.stringify(err));
			});

		}
		
		if (UserAction == "Cancel") {
			//this.navCtrl.setRoot(ActivityPage);
			this.navCtrl.pop();
		}
		
	}

}
