// Components, functions, plugins
import { Component, HostListener, ChangeDetectionStrategy, ChangeDetectorRef, NgModule } from '@angular/core';
import { Modal, ModalController, ModalOptions, PopoverController, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Database } from "../../providers/database/database";
import { Localstorage } from '../../providers/localstorage/localstorage';
import { Synchronization } from "../../providers/synchronization/synchronization";
import { Observable } from 'rxjs/Rx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { FabContainer } from 'ionic-angular';
import { ImageLoaderConfig } from 'ionic-image-loader';


// Preload Pages
import { ActivityPage } from '../activity/activity';
import { ConferenceCityPage } from '../conferencecity/conferencecity';
import { ExhibitorsPage } from '../exhibitors/exhibitors';
import { HelpPage } from '../help/help';
import { LoginPage } from '../login/login';
import { MapPage } from '../map/map';
import { ModalPage } from '../modal/modal';
import { MorePage } from '../more/more';
import { MyAgenda } from '../myagenda/myagenda';
import { NetworkingPage } from '../networking/networking';
import { NotesPage } from '../notes/notes';
import { ProfilePage } from '../profile/profile';
import { ProgramPage } from '../program/program';
import { SocialPage } from '../social/social';
import { SpeakersPage } from '../speakers/speakers';
import { SponsorsPage } from '../sponsors/sponsors';

declare var formatTime: any;
declare var dateFormat: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomePage {
	
	morePage = MorePage;
	helpPage = HelpPage;
	activityPage = ActivityPage;
	programPage = ProgramPage;
	conferenceCityPage = ConferenceCityPage;
	socialPage = SocialPage;
	speakersPage = SpeakersPage;
	modalPage = ModalPage;
	mapPage = MapPage;
	exhibitorsPage = ExhibitorsPage;
	notesPage = NotesPage;
	myAgendaPage = MyAgenda;
	loginPage = LoginPage;
	profilePage = ProfilePage;

	// Setup page variables
	public DevicePlatform: string;
	LogInOutIcon: string;
	LoggedInUser: string;
	AttendeeInitials: string;
	
	// Setup Menu Style variables
	public DisplayMenuVertical = false;
	public DisplayMenuGrid = false;
	public DisplayMenuDashboard = false;
	
	public MenuBackground: string;

	public upcomingAgendaItems: any[] = [];
	public activityFeedListing: any[] = [];
	public creditsTypeL: string;
	public creditsTypeP: string;

    public subscription;
    public DCsubscription;
    public i = 0;
	private db: SQLiteObject;
	public NewMessagesIndicator = false;

	constructor(public navCtrl: NavController, 
				public alertCtrl: AlertController,
				private nav: NavController,
				public popoverCtrl: PopoverController,
				private readonly loadingCtrl: LoadingController,
				private readonly toastCtrl: ToastController, 
				private storage: Storage,
				private databaseprovider: Database,
				private syncprovider: Synchronization,
				private cd: ChangeDetectorRef,
				public pltfrm: Platform,
				private sqlite: SQLite,
				private imageLoaderConfig: ImageLoaderConfig,
				private modal: ModalController,
				private localstorage: Localstorage) {

				// Determine platform that the app is running on
				pltfrm.ready().then(() => {
					
					this.DevicePlatform = "Browser";
					if (pltfrm.is('android') && pltfrm.is('mobileweb')==false) {
						console.log("Home: Running on an Android device!");
						this.DevicePlatform = "Android";
						this.connectToDb();
					}
					if (pltfrm.is('android') && pltfrm.is('mobileweb')==true) {
						console.log("Home: Running on an Android device!");
						this.DevicePlatform = "Browser";
						this.connectToDb();
					}
					if (pltfrm.is('ios')==true && pltfrm.is('mobileweb')==false) {
						console.log("Home: Running the app on an iOS device!");
						this.DevicePlatform = "iOS";
						this.connectToDb();
					}
					if (pltfrm.is('ios')==true && pltfrm.is('mobileweb')==true) {
						console.log("Home: Running on browser on an iOS device!");
						this.DevicePlatform = "Browser";
						this.connectToDb();
					}

					console.log("Home: App platform: " + this.DevicePlatform);
					this.localstorage.setLocalValue('DevicePlatform', this.DevicePlatform);
					
				}).catch(function () {
					console.log("Home: Promise Rejected");
				});
				
				
	}




	presentPopover(myEvent) {
		let popover = this.popoverCtrl.create(ModalPage);
		popover.present({
		  ev: myEvent
		})
	  }
	
	private connectToDb(): void {

		console.log('Home: Connecting to DB...');
		this.sqlite.create({name: 'cvPlanner.db', location: 'default', createFromLocation: 1}).then((db: SQLiteObject) => {
			console.log('Home: Connected.');
			this.db = db;
			this.createTables();
			
		})
	}
	
	private createTables(): void {
		
		console.log('Home: Creating tables...');
		var SQLquery = 'CREATE TABLE IF NOT EXISTS attendees (id integer primary key, AttendeeID text, CustID integer, Prefix text, FirstName text, MiddleInitial text, LastName text, Suffix text, BadgeName text, DegreesHeld text, Affiliation text, Employer text, Title text, ImageURLThumbnail text, ImageURLFull text, Biography text, SearchField text)';
		this.db.executeSql(SQLquery, <any>{}).then(() => 
			console.log('Home: Executed SQL')
		)
		.catch(e => console.log(JSON.stringify(e)));

		var SQLquery1 = 'CREATE TABLE IF NOT EXISTS attendee_courses (acID integer, ct_id text, bt_imis_id text, st_imis_id text, quantity text, subevent_id text, session_id text, waitlist text, test text)';
		this.db.executeSql(SQLquery1, <any>{}).then(() => 
			console.log('Home: Executed SQL1')
		)
		.catch(e => console.log(JSON.stringify(e)));
		
		var SQLquery3 = 'CREATE TABLE IF NOT EXISTS itinerary (itID integer primary key, mtgID text, Date_Start text, Date_End text, Time_Start text, Time_End text, Subject text, Location text, Description text, atID text, AttendeeID text, EventID text, LastUpdated text, UpdateType text)';
		this.db.executeSql(SQLquery3, <any>{}).then(() => 
			console.log('Home: Executed SQL3')
		)
		.catch(e => console.log(JSON.stringify(e)));

		var SQLquery4 = 'CREATE TABLE IF NOT EXISTS attendee_notes (atnID integer primary key, AttendeeID text, EventID text, Note text, LastUpdated text)';
		this.db.executeSql(SQLquery4, <any>{}).then(() => 
			console.log('Home: Executed SQL4')
		)
		.catch(e => console.log(JSON.stringify(e)));

		var SQLquery5 = 'CREATE TABLE IF NOT EXISTS evaluations (evalID integer primary key, AttendeeID text, session_id text, evaluationType text, Q11 text, Q12 text, Q21 text, Q22 text, Q23 text, Q24 text, Q25 text, Q26 text, Q31 text, Q32 text, Q33 text, Q41 text, LastUpdated text)';
		this.db.executeSql(SQLquery5, <any>{}).then(() => 
			console.log('Home: Executed SQL5')
		)
		.catch(e => console.log(JSON.stringify(e)));

		var SQLquery6 = 'CREATE TABLE IF NOT EXISTS evaluation_conference (evalID integer primary key, AttendeeID text, session_id text, evaluationType text, Q1 text, Q2 text, Q3 text, Q4 text, Q5 text, Q5C text, Q6 text, Q7 text, Q7C text, Q8 text, Q9 text, Q10 text, Q10C text, Q11 text, Q11C text, LastUpdated text)';
		this.db.executeSql(SQLquery6, <any>{}).then(() => 
			console.log('Home: Executed SQL6')
		)
		.catch(e => console.log(JSON.stringify(e)));

		// App tables
		var SQLquery7 = 'CREATE TABLE IF NOT EXISTS record_deletes (id integer primary key, AttendeeID text, TableName text, WhereField text, WhereValue text, LastUpdated text)';
		this.db.executeSql(SQLquery7, <any>{}).then(() => 
			console.log('Home: Executed SQL7')
		)
		.catch(e => console.log(JSON.stringify(e)));

		// Session tables
		var SQLquery8 = 'CREATE TABLE IF NOT EXISTS courses (session_id text, session_title text, description text, session_start_time text, session_end_time text, primary_speaker text, other_speakers text, course_id text, subject text, cs_credits text, ce_credits_type text, room_number text, verification_code text, nadl_verification text, type text, level text, speaker_host_emcee text, room_capacity text, course_topics text, ActiveYN text, corporate_supporter text, session_recording text, HandoutFilename text, CEcreditsL text, CEcreditsP text, SearchField text)';
		this.db.executeSql(SQLquery8, <any>{}).then(() => 
			console.log('Home: Executed SQL8')
		)
		.catch(e => console.log(JSON.stringify(e)));

		var SQLquery9 = 'CREATE TABLE IF NOT EXISTS courses_speakers (speakerID integer, FullName text, FirstName text, LastName text, Credentials text, Bio text, Courses text, imageFilename text, email text, SearchField text)';
		this.db.executeSql(SQLquery9, <any>{}).then(() => 
			console.log('Home: Executed SQL9')
		)
		.catch(e => console.log(JSON.stringify(e)));

		// Exhibitor tables
		var SQLquery10 = "CREATE TABLE IF NOT EXISTS exhibitors (ExhibitorID integer, ClientExhibitorID text, ";
		SQLquery10 = SQLquery10 + "CompanyName text, AddressLine1 text, AddressLine2 text, City text, State text, Province text, ZipPostalCode text, Country text, ";
		SQLquery10 = SQLquery10 + "Website text, PrimaryContactFirstName text, PrimaryContactLastName text, PrimaryContactEmail text, PrimaryContactPhone text, ";
		SQLquery10 = SQLquery10 + "PrimaryOnsiteContactName text, PrimaryOnsiteContactEmail text, PrimaryOnsiteContactPhone text, ";
		SQLquery10 = SQLquery10 + "BoothNumber text, BoothX integer, BoothY integer, ";
		SQLquery10 = SQLquery10 + "SocialMediaFacebook text, SocialMediaTwitter text, SocialMediaLinkedIn text, SocialMediaSkype text, SocialMediaYouTube text, SocialMediaGooglePlus text, SocialMediaRSS text, ";
		SQLquery10 = SQLquery10 + "CompanyDescription text, CompanyLogoFilename text, ProductsServices text, SearchField text)";
		this.db.executeSql(SQLquery10, <any>{}).then(() => 
			console.log('Home: Executed SQL10')
		)
		.catch(e => console.log(JSON.stringify(e)));

		var SQLquery11 = 'CREATE TABLE IF NOT EXISTS booth_mapping (BoothNumber integer primary key, BoothY integer, BoothX integer)';
		this.db.executeSql(SQLquery11, <any>{}).then(() => 
			console.log('Home: Executed SQL11')
		)
		.catch(e => console.log(JSON.stringify(e)));

	}
 
	ionViewWillEnter() {
		
		// Activate menu style accoridng to stored value
		console.log('Home: ionViewWillEnter: HomePage');

		var HomeLayoutStyle = this.localstorage.getLocalValue('HomeLayoutStyle');
		switch(HomeLayoutStyle) {
			case "List":
				this.DisplayMenuVertical = true;
				this.DisplayMenuGrid = false;
				this.DisplayMenuDashboard = false;
				break;
			case "Grid":
				this.DisplayMenuVertical = false;
				this.DisplayMenuGrid = true;
				this.DisplayMenuDashboard = false;
				break;
			case "Dashboard":
				this.DisplayMenuVertical = false;
				this.DisplayMenuGrid = false;
				this.DisplayMenuDashboard = true;
				break;
			default:
				this.DisplayMenuVertical = true;
				this.DisplayMenuGrid = false;
				this.DisplayMenuDashboard = false;
				break;
		}
		
		var HomeBackground = this.localstorage.getLocalValue('HomeBackground');
		this.MenuBackground = HomeBackground || 'bgCityscape';

		/* Determine currently logged in user */
		var AttendeeID = this.localstorage.getLocalValue('AttendeeID');
		var LoginName = this.localstorage.getLocalValue('LoginFullName');
		var LoginNameInitials = this.localstorage.getLocalValue('LoginNameInitials');
		
		if (AttendeeID == '' || AttendeeID == null) {
			console.log('Home: AttendeeID blank');
			this.LogInOutIcon = 'log-in';
		} else {
			console.log('Home: Stored AttendeeID: ' + AttendeeID);
			this.LogInOutIcon = '';
		}
		
		if (LoginName != '' && LoginName != null && LoginName != 'undefined') {
			console.log('Home: Stored LoginName: ' + LoginName);
			//this.LoggedInUser = LoginName;
			this.AttendeeInitials = LoginNameInitials;
		} else {
			console.log('Home: User not logged in');
			this.LoggedInUser = 'Sign In';
			this.localstorage.setLocalValue('LoginName', '');
			this.localstorage.setLocalValue('LoginFullName', '');
			this.localstorage.setLocalValue('AttendeeID', '');
			this.localstorage.setLocalValue("loginUsername", '');
			this.localstorage.setLocalValue("loginPassword", '');
			this.localstorage.setLocalValue("LoginNameInitials", '');
		}

		// Temporary use variables
		var flags;
		var visStartTime;
		var visEndTime;
		var eventIcon;
		var visEventName;
		var maxRecs;

		// Reset mass variables
		this.localstorage.setLocalValue("MassAdd", "0");
        this.localstorage.setLocalValue("MassEval", "0");
		this.localstorage.setLocalValue("MassContact", "0");
		this.localstorage.setLocalValue("MassEmail", "0");
		this.localstorage.setLocalValue("MassAgenda", "0");
		this.localstorage.setLocalValue("MassNotes", "0");

		// Get the data
		var AttendeeID = this.localstorage.getLocalValue('AttendeeID');
		
		if (AttendeeID != '' && AttendeeID != null) {

			console.log('Home: Attendee logged in, dashboard data loading...');
			
			flags = "li2|0";
			
			this.databaseprovider.getAgendaData(flags, AttendeeID).then(data => {
				
				this.upcomingAgendaItems = [];	

				if (data['length']>0) {
					
					if (data['length'] > 3) {
						maxRecs = 3;
					} else {
						maxRecs = data['length'];
					}
					
					for (var i = 0; i < maxRecs; i++) {

						var dbEventDateTime = data[i].EventDate.substring(5, 10);
						var DisplayDateTime = dbEventDateTime.replace(/-/g, '/');

						visStartTime = formatTime(data[i].EventStartTime);
						visEndTime = formatTime(data[i].EventEndTime);
						
						DisplayDateTime = DisplayDateTime + " from " + visStartTime + " to " + visEndTime;
						
						if (data[i].mtgID == "0") {
							eventIcon = "time";
							visEventName = data[i].EventName;
						} else {
							eventIcon = "list-box";
							visEventName = data[i].EventName;
						}

						this.upcomingAgendaItems.push({
							EventName: visEventName,
							visEventTimeframe: DisplayDateTime,
							visEventID: "'" + data[i].EventID + "|" + data[i].mtgID + "'",
							EventLocation: data[i].EventLocation,
							eventTypeIcon: eventIcon
						});

					}


				} else {
					
					this.upcomingAgendaItems.push({
						EventName: "No upcoming agenda entries",
						visEventTimeframe: "",
						EventLocation: "",
						visEventID: "'0|0'",
						eventTypeIcon: "remove-circle"
					});

				}

				this.cd.markForCheck();
				
			}).catch(function () {
				console.log("Home: Promise Rejected");
			});
			
		} else {
			
			console.log('Home: Attendee not logged in, dashboard data not loaded');
			
			this.upcomingAgendaItems = [];	

			this.upcomingAgendaItems.push({
				EventName: "You need to be logged in to see your agenda",
				visEventTimeframe: "",
				EventLocation: "",
				visEventID: "'0|0'",
				eventTypeIcon: "remove-circle"
			});

			this.cd.markForCheck();

		}

		/*
		// ---------------------------
		// Activity Feed
		// Disabled 2018-11-06 John Black
		// Not showing in a popover or other form on the Home screen
		// ---------------------------
		
		// Blank and show loading info
		this.activityFeedListing = [];
		this.cd.markForCheck();
		this.imageLoaderConfig.setFallbackUrl('assets/img/personIcon.png');
		
		// Temporary use variables
		flags = "li|Alpha|0";
        var DisplayName = "";
        var SQLDate;
        var DisplayDateTime;
        var dbEventDateTime;
		
		// Get the data
		this.databaseprovider.getActivityFeedData(flags, "0").then(data => {
			
			console.log(JSON.stringify(data));
			
			if (data['length']>0) {
				
				for (var i = 0; i < data['length']; i++) {
					
					console.log('Processing afID: ' + data[i].afID);
					
					var imageAvatar = "https://naeyc.convergence-us.com/AdminGateway/images/Attendees/" + data[i].AttendeeID + ".jpg";
					console.log(imageAvatar);
					
					var imageAttachment = data[i].afImageAttachment;
					var imageAttached = false;
					if (imageAttachment != "") {
						imageAttachment = "https://naeyc.convergence-us.com/AdminGateway/images/ActivityFeedAttachments/" + imageAttachment;
						imageAttached = true;
					}

					DisplayName = data[i].PosterFirst + " " + data[i].PosterLast;

					dbEventDateTime = data[i].Posted.substring(0, 19);
					dbEventDateTime = dbEventDateTime.replace(/-/g, '/');
					dbEventDateTime = dbEventDateTime.replace(/T/g, ' ');
					SQLDate = new Date(dbEventDateTime);
					DisplayDateTime = dateFormat(SQLDate, "mm/dd h:MMtt");
				
					var CurrentDateTime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
					var CurrentDateTime2 = new Date(CurrentDateTime);
					var PostedDate = new Date(data[i].Posted);
					var TimeDifference = this.timeDifference(CurrentDateTime2, PostedDate);					

					// Show the current record
					this.activityFeedListing.push({
						afID: data[i].afID,
						ActivityFeedCommentAvatar: imageAvatar,
						ActivityFeedCommentBy: DisplayName,
						ActivityFeedCommentPosted: DisplayDateTime,
						ActivityFeedAttachment: imageAttachment,
						ActivityFeedComment: data[i].afMessage,
						ActivityFeedLikesCounter: data[i].afLikesCounter,
						ActivityFeedCommentsCounter: data[i].CommentsCount,
						ActivityFeedCommentPostedDuration: TimeDifference,
						ActivityFeedAttached: imageAttached
					});

				}


			} else {
				
                // No records to show
				this.activityFeedListing.push({
						afID: 0,
						ActivityFeedCommentAvatar: "No records found",
						ActivityFeedCommentBy: "",
						ActivityFeedCommentPosted: "",
						ActivityFeedAttachment: "",
						ActivityFeedComment: "",
						ActivityFeedLikesCounter: "",
						ActivityFeedCommentsCounter: "",
						ActivityFeedCommentPostedDuration: "",
						ActivityFeedAttached: false
				});

			}

			this.cd.markForCheck();
			
		}).catch(function () {
			console.log("Activity Feed Promise Rejected");
		});
		*/
		
	}
	
	ionViewDidEnter() {
		
		console.log('Home: ionViewDidEnter: HomePage');
			
		var AttendeeID = this.localstorage.getLocalValue('AttendeeID');
		var LoginName = this.localstorage.getLocalValue('LoginName');

		var AutoSync = this.localstorage.getLocalValue('AutoSync');
		var DirectChatMonitoring = this.localstorage.getLocalValue('DirectChatMonitoring');
		
		// Check to start AutoSync if not running a browser and user is logged in
		//if ((this.DevicePlatform != "Browser") && (AttendeeID !== null && AttendeeID != '')) {
		if (this.DevicePlatform != "Browser") {
			
			// If AutoSync = 0 then it has been disabled
			if (AutoSync != '0') {
				
				var LastDirectChatCheck = this.localstorage.getLocalValue('LastDirectChatCheck');
				if (LastDirectChatCheck == '' || LastDirectChatCheck === null) {
					LastDirectChatCheck = '2018-01-01T00:00:01Z';
				}

				if (AutoSync == '' || AutoSync == null) {

					console.log('Home: First AutoSync');

					// Set localstorage value with length in minutes
					this.localstorage.setLocalValue('AutoSync', '10');
					// First time startup of AutoSync
					this.startAutoSync();
					
				} else {
					
					// Reset AutoSync when entering the Home page (either from fresh start
					// or coming back within the same instance of the app)
					this.stopAutoSync();
					this.startAutoSync();
					
				}
			
			}
		
		} else {
		
			console.log('Home: AutoSync disabled because platform is browser');
			
		}
	
		// Check on first run in order to reset AutoSync
		var AutoSyncReset = this.localstorage.getLocalValue('AutoSyncReset');
		
		if (AutoSyncReset == '' || AutoSyncReset == null) {

			// If first run, check if platform is not web browser			
			if (this.DevicePlatform != "Browser") {
				
				// Reset AutoSync and then disable this section of code by setting 
				// the localstorage value to 1
				this.localstorage.setLocalValue('LastSync', '2018-01-01T00:00:01Z');		
				this.localstorage.setLocalValue('AutoSyncReset', '1');		
			
			}
			
		}

		// If DirectChatMonitoring = 0 then it has been disabled
		//DirectChatMonitoring = '0';
		if (DirectChatMonitoring != '0') {
			
			if (DirectChatMonitoring == '' || DirectChatMonitoring == null) {

				console.log('Home: First DirectChatMonitoring');

				// Set localstorage value with length in minutes
				this.localstorage.setLocalValue('DirectChatMonitoring', '10');
				// First time startup of DirectChatMonitoring
				this.startDirectChatMonitoring();
				
			} else {
				
				// Reset DirectChatMonitoring when entering the Home page (either from fresh start
				// or coming back within the same instance of the app)
				this.stopDirectChatMonitoring();
				this.startDirectChatMonitoring();
				
			}
		
		}

		// Check on first run in order to Vacuum database (aka Shrink)
		/*
		var SQLVacuum = this.localstorage.getLocalValue('SQLVacuum');
		
		if (SQLVacuum == '' || SQLVacuum == null) {

			// If first run, check if platform is not web browser			
			if (this.DevicePlatform != "Browser") {
				
				// Reset AutoSync and then disable this section of code by setting 
				// the localstorage value to 1
				console.log('Performing SQLite vacuum function');
				this.localstorage.setLocalValue('SQLVacuum', '1');		
				this.syncprovider.DBCallQuery2('VACUUM');
			
			}
			
		}
		*/

		// Check on first run in order to reset AutoSync
		// Due to a bug with the UTC dates, saved itinerary items are not being
		// synced back to teh server.  This resets the sync to get all past items
		// up to the server on the next run of the app, then it disables itself.
		var FirstRunResync = this.localstorage.getLocalValue('FirstRunResync');
		
		if (FirstRunResync == '' || FirstRunResync == null) {

			// If first run, check if platform is not web browser			
			if (this.DevicePlatform != "Browser") {
				
				// Reset AutoSync and then disable this section of code by setting 
				// the localstorage value to 1
				console.log('Performing FirstRunResync function');
				this.localstorage.setLocalValue('LastSync', '2018-01-01T00:00:01Z');		
				this.localstorage.setLocalValue('FirstRunResync', '1');		
			
			}
			
		}
		
	
	}

	timeDifference(laterdate, earlierdate) {
		
		var difference = laterdate.getTime() - earlierdate.getTime();
	 
		var daysDifference = Math.floor(difference/1000/60/60/24);
		difference -= daysDifference*1000*60*60*24
	 
		var hoursDifference = Math.floor(difference/1000/60/60);
		difference -= hoursDifference*1000*60*60
	 
		var minutesDifference = Math.floor(difference/1000/60);
		difference -= minutesDifference*1000*60
	 
		var secondsDifference = Math.floor(difference/1000);
		var stringOutput = "";
		
		if (daysDifference>0) {
			
			stringOutput = daysDifference + ' day/s';
			
		} else {
		
			if (hoursDifference>0) {
				
				stringOutput = hoursDifference + ' hr/s';
			
			} else {
		
				if (minutesDifference>0) {

					stringOutput = minutesDifference + ' min/s';

				} else {

					if (hoursDifference==0) {
						
						stringOutput = secondsDifference + ' sec/s';
						
					}
				}
			}
		}
		
		console.log('timeDifference output: ' + stringOutput);
		
		return stringOutput;
		
	}

	UpdateLikes(activityFeedItem, activityfeedID) {

		console.log('Likes button tapped');
		
		this.localstorage.setLocalValue('ActivityFeedLikesButton', '1');
		
		var flags = "lu|" + activityfeedID;

		// Get the data
		this.databaseprovider.getActivityFeedData(flags, "0").then(data => {
			
			console.log(JSON.stringify(data));
			
			if (data['length']>0) {
				
				if (data[0].Status = "Saved") {
					activityFeedItem.ActivityFeedLikesCounter = data[0].NewLikes;
					this.cd.markForCheck();
				}
				
			}
			
		}).catch(function () {
			console.log("UpdateLikes Promise Rejected");
		});

	}


    ActivityFeedDetails(activityFeedItem, activityfeedID) {

		this.localstorage.setLocalValue('ActivityFeedObject', JSON.stringify(activityFeedItem));
					
		console.log('Activity details requested');
		
		if (activityfeedID != 0) {
			
			var LikesButton = "";
			LikesButton = this.localstorage.getLocalValue('ActivityFeedLikesButton');
			console.log('Likes button check: ' + LikesButton);
			if (LikesButton == '1') {
				this.localstorage.setLocalValue('ActivityFeedLikesButton', '0');
			} else {
				console.log('Going to activity feed: ' + activityfeedID);
				// Navigate to Activity Feed Details page
				this.localstorage.setLocalValue('ActivityFeedID', activityfeedID);
				this.navCtrl.push('ActivityFeedDetailsPage', {ActivityFeedID: activityfeedID}, {animate: true, direction: 'forward'});
			}
		}
		
    };

	AddPosting(fab: FabContainer) {
		
		// Disable other click event
		this.localstorage.setLocalValue('afFABClicked', '1');
		
		console.log('Set FAB Override, AddPosting');
		
		// Modal version
		// Disabled 2018-10-29 due to flickering caused by background server tasks
		// Switching to page-based version
		/*
		const AddPostingModalOptions: ModalOptions = {
			enableBackdropDismiss: false
		};

		const AddPostingModal: Modal = this.modal.create('ActivityFeedPostingPage', {}, AddPostingModalOptions);

		AddPostingModal.present();

		AddPostingModal.onDidDismiss((data) => {
			this.localstorage.setLocalValue('afFABClicked', '0');
			// If saved, then re-run ngOnInit to refresh the listing
			if (data == "Save") {
				this.ionViewWillEnter();
			}
		});
		*/
		fab.close();

		this.navCtrl.push('ActivityFeedPostingPage', {}, {animate: true, direction: 'forward'});
		
	}

	ViewLeaderboard(fab: FabContainer) {
		
		// Disable other click event
		this.localstorage.setLocalValue('afFABClicked', '1');

		console.log('Set FAB Override, ViewLeaderboard');
		
		const ViewLeaderboardModalOptions: ModalOptions = {
			enableBackdropDismiss: false
		};

		const ViewLeaderboardModal: Modal = this.modal.create('ActivityFeedLeaderboardPage', {}, ViewLeaderboardModalOptions);

		ViewLeaderboardModal.present();

		ViewLeaderboardModal.onDidDismiss((data) => {
			this.localstorage.setLocalValue('afFABClicked', '0');
		});
		
		fab.close();

	}

	startDirectChatMonitoring() {

		console.log('Start Direct Chat Monitoring');
		// Set sync interval
		// Entry is in milliseconds
		// 600000 for every 10 minutes
		// 60000 for every minute
		// 30000 for every 30 seconds (for testing)

		this.DCsubscription = Observable.interval(10000).subscribe(x => {

			// Previously successful sync time
			var LastDirectChatCheck = this.localstorage.getLocalValue('LastDirectChatCheck');
			if (LastDirectChatCheck == '' || LastDirectChatCheck === null) {
				LastDirectChatCheck = '2018-01-01T00:00:01Z';
			}
			
			// Current sync time in UTC
			var ThisDirectChatCheck2 = new Date().toUTCString();
			var ThisDirectChatCheck = dateFormat(ThisDirectChatCheck2, "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'");
			//var ThisDirectChatCheck = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
			
			console.log('Home: Direct Chat Monitoring event: ' + this.i);
			this.i++;
			
			// Call AutoSync service in providers
			this.syncprovider.DirectChatMonitor(LastDirectChatCheck, ThisDirectChatCheck).then(data => {
				//console.log('Home: Executed Direct Chat Monitoring');
				
				this.localstorage.setLocalValue('DirectChatMonitoringString', JSON.stringify(data));
				
				if (data[0].NewMessages == "0") {
					//console.log('No new messages');
					if (this.NewMessagesIndicator != false) {
						this.NewMessagesIndicator = false;
						this.cd.markForCheck();
					}
				} else {
					//console.log('New messages!');
					if (this.NewMessagesIndicator != true) {
						this.NewMessagesIndicator = true;
						this.cd.markForCheck();
					}
				}
				
				// Update LastSync date for next run
				this.localstorage.setLocalValue('LastDirectChatCheck', ThisDirectChatCheck);
			}).catch(function () {
				console.log("Home: Direct Chat Monitoring Promise Rejected");
			});

		});
	}

	stopDirectChatMonitoring() {

		if (this.DCsubscription != null) {
			console.log('Home: Stop Direct Chat Monitoring');
			this.DCsubscription.unsubscribe();
		}
		
	}
	
	startAutoSync() {

		console.log('Start AutoSync');
		// Set sync interval
		// Entry is in milliseconds
		// 600000 for every 10 minutes
		// 60000 for every minute
		// 30000 for every 30 seconds (for testing)

		this.subscription = Observable.interval(180000).subscribe(x => {
		
			// Previously successful sync time
			var LastSync3 = this.localstorage.getLocalValue('LastSync');
			if (LastSync3 == '' || LastSync3 === null) {
				LastSync3 = '2018-09-01T00:00:01Z';
			}
			var LastSync2 = new Date(LastSync3).toUTCString();
			var LastSync = dateFormat(LastSync2, "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'");
			
			// Current sync time in UTC
			var ThisSync2 = new Date().toUTCString();
			var ThisSync = dateFormat(ThisSync2, "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'");

			console.log('Home: AutoSync event: ' + this.i);
			console.log('Sync period: ' + LastSync + ' to ' + ThisSync);
			this.i++;
			
			// Call AutoSync service in providers
			this.syncprovider.DBSyncUpdateM2S(LastSync, ThisSync).then(data => {
				console.log('Home: Executed UpdateM2S Sync: ' + data);
				// Update LastSync date for next run
				this.localstorage.setLocalValue('LastSync', ThisSync);
			}).catch(function () {
				console.log("Home: UpdateM2S Sync Promise Rejected");
			});
			
			this.syncprovider.DBSyncUpdateS2M(LastSync, ThisSync).then(data => {
				console.log('Home: Executed UpdateS2M Sync: ' + data);
				// Update LastSync date for next run
				this.localstorage.setLocalValue('LastSync', ThisSync);
			}).catch(function () {
				console.log("Home: UpdateS2M Sync Promise Rejected");
			});
			
		});
	}
	
	stopAutoSync() {

		if (this.subscription != null) {
			console.log('Home: Stop AutoSync');
			this.subscription.unsubscribe();
		}
		
	}
	
	AvatarNavigation() {

		var AttendeeID = this.localstorage.getLocalValue('AttendeeID');

		if (AttendeeID !='' && AttendeeID != null) {
			this.navCtrl.push(ProfilePage, {}, {animate: true, direction: 'forward'});
		} else {
			this.localstorage.setLocalValue('LoginWarning', '0');
			this.localstorage.setLocalValue('ForwardingPage', 'Home');
			this.navCtrl.push(LoginPage, {}, {animate: true, direction: 'forward'});
		}
		
	}
	
	// The following pages require the user to be logged in.
	// If not, go to login page before continuing on
	// otherwise, go to requested page.
	NavigateToAuthenticatedPage(PageID) {
		
		var AttendeeID = this.localstorage.getLocalValue('AttendeeID');

		if (AttendeeID !='' && AttendeeID != null) {

			this.localstorage.setLocalValue('LoginWarning', '0');
			this.localstorage.setLocalValue('ForwardingPage', '');
			switch(PageID) {
				case "MyAgenda":
					this.navCtrl.push(MyAgenda, {}, {animate: true, direction: 'forward'});
					break;
				case "Notes":
					this.navCtrl.push(NotesPage, {}, {animate: true, direction: 'forward'});
					break;
				case "Home":
					this.navCtrl.push(HomePage, {}, {animate: true, direction: 'forward'});
					break;
				case "Networking":
					this.navCtrl.push(NetworkingPage, {}, {animate: true, direction: 'forward'});
					break;
				case "Exhibitors":
					this.navCtrl.push(ExhibitorsPage, {}, {animate: true, direction: 'forward'});
					break;
				case "Sponsors":
					this.navCtrl.push(SponsorsPage, {}, {animate: true, direction: 'forward'});
					break;
				case "ActivityFeed":
					var flags = "cn";

					this.databaseprovider.getDatabaseStats(flags, AttendeeID).then(data => {
						
						if (data[0].Status == "Connected") {
							
							// Navigate to Activity Feed page
							this.localstorage.setLocalValue('ActivityFeedID', '0');
							this.navCtrl.push(ActivityPage, {}, {animate: true, direction: 'forward'});
						
						} else {

							let alert = this.alertCtrl.create({
								title: 'Internet Error',
								subTitle: 'You need to have Internet access in order to use that feature.',
								buttons: ['OK']
							});
							
							alert.present();
						
						}
						
					});
					break;
			}
			
		} else {
			
			this.localstorage.setLocalValue('ForwardingPage', PageID);
			this.localstorage.setLocalValue('LoginWarning', '1');
			this.navCtrl.push(LoginPage, {}, {animate: true, direction: 'forward'});

		}
			
	
	}

	NavigateToLoginPage() {
		
		this.localstorage.setLocalValue('LoginWarning', '0');
		this.localstorage.setLocalValue('ForwardingPage', '');
		this.navCtrl.push(LoginPage, {}, {animate: true, direction: 'forward'});
	
	}
	
    EventDetails(EventID) {
		
		console.log("Btn ID: " + EventID);
		
        var IDSplit = EventID.split("|");

        var storeEventID = IDSplit[0].replace("'","");
        var storePersonalEventID = IDSplit[1].replace("'", "");
		console.log("Home: storeEventID: " + storeEventID);
		console.log("Home: storePersonalEventID: " + storePersonalEventID);

        if (storeEventID == "0" && storePersonalEventID == "0") {
            // Do nothing
        } else {
            if (storeEventID == "0") {

                // Set EventID to LocalStorage
				this.localstorage.setLocalValue('PersonalEventID', storePersonalEventID);

                // Navigate to Education Details page
				this.navCtrl.push('MyAgendaPersonal', {EventID: storePersonalEventID}, {animate: true, direction: 'forward'});

            } else {

                // Set EventID to LocalStorage
				this.localstorage.setLocalValue('EventID', storeEventID);

                // Navigate to Education Details page
				this.navCtrl.push('EducationDetailsPage', {EventID: storeEventID}, {animate: true, direction: 'forward'});

            }
        }
    };

}
