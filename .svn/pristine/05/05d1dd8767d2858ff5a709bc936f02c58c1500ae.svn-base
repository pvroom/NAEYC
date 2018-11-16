// Components, functions, plugins
import { Component, NgModule } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Localstorage } from './../../providers/localstorage/localstorage';

// Pages
import { DatabasePage } from '../database/database';
import { HelpPage } from '../help/help';
import { NotesPage } from '../notes/notes';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { ConversationsPage } from '../conversations/conversations';
import { MyAgendaFull } from '../myagendafull/myagendafull';
import { MyAgenda } from '../myagenda/myagenda';
import { ConferenceCityPage } from '../conferencecity/conferencecity';
import { EvaluationConference } from '../evaluationconference/evaluationconference';
import { ActivityPage } from '../activity/activity';
import { ConversationPage } from '../conversation/conversation';
import { AttendeesPage } from '../attendees/attendees';

// Temporary Support Pages
//import { FloorplanMappingPage } from '../floorplanmapping/floorplanmapping';


@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})

export class MorePage {


	constructor(public navCtrl: NavController, 
				private storage: Storage,
				public navParams: NavParams,
				private localstorage: Localstorage) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad MorePage');
	}

  	NavToPage(PageID) {

		var AttendeeID = this.localstorage.getLocalValue('AttendeeID');

		switch(PageID) {
			case "HelpPage":
				this.navCtrl.push(HelpPage, {}, {animate: true, direction: 'forward'});
				break;
			case "DatabasePage":
				this.navCtrl.push(DatabasePage, {}, {animate: true, direction: 'forward'});
				break;
//			case "FloorplanMappingPage":
//				this.navCtrl.push(FloorplanMappingPage, {}, {animate: true, direction: 'forward'});
//				break;
			case "NotesPage":
				if (AttendeeID == '' || AttendeeID == null) {
					// If not, store the page they want to go to and go to the Login page
					console.log('Stored AttendeeID: ' + AttendeeID);
					this.storage.set('NavigateToPage', "Notes");
					this.navCtrl.push(LoginPage, {}, {animate: true, direction: 'forward'});
				} else {
					// Otherwise just go to the page they want
					this.navCtrl.push(NotesPage, {}, {animate: true, direction: 'forward'});
				}
				break;
			case "EventSurvey":
				if (AttendeeID == '' || AttendeeID == null) {
					// If not, store the page they want to go to and go to the Login page
					console.log('Stored AttendeeID: ' + AttendeeID);
					this.storage.set('NavigateToPage', "EventSurvey");
					this.navCtrl.push(LoginPage, {}, {animate: true, direction: 'forward'});
				} else {
					// Otherwise just go to the page they want
					this.navCtrl.push(EvaluationConference, {}, {animate: true, direction: 'forward'});
				}
				break;

				case "ProfilePage":
				if (AttendeeID == '' || AttendeeID == null) {
					// If not, store the page they want to go to and go to the Login page
					console.log('Stored AttendeeID: ' + AttendeeID);
					this.storage.set('NavigateToPage', "Profile");
					this.navCtrl.push(LoginPage, {}, {animate: true, direction: 'forward'});
				} else {
					// Otherwise just go to the page they want
					this.navCtrl.push(ProfilePage, {}, {animate: true, direction: 'forward'});
				}
				break;


				case "ActivityPage":
				if (AttendeeID == '' || AttendeeID == null) {
					// If not, store the page they want to go to and go to the Login page
					console.log('Stored AttendeeID: ' + AttendeeID);
					this.localstorage.setLocalValue('ActivityFeedID', '0');
					this.storage.set('NavigateToPage', "Activity");
					this.navCtrl.push(LoginPage, {}, {animate: true, direction: 'forward'});
				} else {
					// Otherwise just go to the page they want
					this.localstorage.setLocalValue('ActivityFeedID', '0');
					this.navCtrl.push(ActivityPage, {}, {animate: true, direction: 'forward'});
				}
				break;


				case "ConversationPage":
				if (AttendeeID == '' || AttendeeID == null) {
					// If not, store the page they want to go to and go to the Login page
					console.log('Stored AttendeeID: ' + AttendeeID);
					this.storage.set('NavigateToPage', "Conversation");
					this.navCtrl.push(LoginPage, {}, {animate: true, direction: 'forward'});
				} else {
					// Otherwise just go to the page they want
					this.navCtrl.push(ConversationPage, {}, {animate: true, direction: 'forward'});
				}
				break;





			case "MyAgenda":
				if (AttendeeID == '' || AttendeeID == null) {
					// If not, store the page they want to go to and go to the Login page
					console.log('Stored AttendeeID: ' + AttendeeID);
					this.storage.set('NavigateToPage', "MyAgenda");
					this.navCtrl.push(LoginPage, {}, {animate: true, direction: 'forward'});
				} else {
					// Otherwise just go to the page they want
					this.navCtrl.push(MyAgenda, {}, {animate: true, direction: 'forward'});
				}
				break;
			case "MyAgendaFull":
				if (AttendeeID == '' || AttendeeID == null) {
					// If not, store the page they want to go to and go to the Login page
					console.log('Stored AttendeeID: ' + AttendeeID);
					this.storage.set('NavigateToPage', "MyAgendaFull");
					this.navCtrl.push(LoginPage, {}, {animate: true, direction: 'forward'});
				} else {
					// Otherwise just go to the page they want
					this.navCtrl.push(MyAgendaFull, {}, {animate: true, direction: 'forward'});
				}
				break;
				case "AttendeesPage":
				if (AttendeeID == '' || AttendeeID == null) {
					// If not, store the page they want to go to and go to the Login page
					console.log('Stored AttendeeID: ' + AttendeeID);
					this.storage.set('NavigateToPage', "Attendees");
					this.navCtrl.push(LoginPage, {}, {animate: true, direction: 'forward'});
				} else {
					// Otherwise just go to the page they want
					this.navCtrl.push(AttendeesPage, {}, {animate: true, direction: 'forward'});
				}
				break;
				case "ConferenceCityPage":
				if (AttendeeID == '' || AttendeeID == null) {
					// If not, store the page they want to go to and go to the Login page
					console.log('Stored AttendeeID: ' + AttendeeID);
					this.storage.set('NavigateToPage', "ConferenceCity");
					this.navCtrl.push(LoginPage, {}, {animate: true, direction: 'forward'});
				} else {
					// Otherwise just go to the page they want
					this.navCtrl.push(ConferenceCityPage, {}, {animate: true, direction: 'forward'});
				}
				break;
        }

    };

}


