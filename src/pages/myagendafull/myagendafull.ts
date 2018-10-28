// Components, functions, plugins
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, NgModule } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Database } from './../../providers/database/database';
import { Localstorage } from '../../providers/localstorage/localstorage';

declare var dateFormat: any;
declare var formatTime: any;

@Component({
  selector: 'page-myagendafull',
  templateUrl: 'myagendafull.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MyAgendaFull {



	public ProgramListing: any[] = [];
	
	// Personal agenda
	public agendaTueItems: any[] = [];
	public agendaWedItems: any[] = [];
	public agendaThuItems: any[] = [];
	public agendaFriItems: any[] = [];
	public agendaSatItems: any[] = [];
	
	// Full agenda
	public fullagendaDay1Items: any[] = [];
	public fullagendaDay2Items: any[] = [];
	public fullagendaDay3Items: any[] = [];
	public fullagendaDay4Items: any[] = [];
	public fullagendaDay5Items: any[] = [];
	
	public agenda: string;





	constructor(public navCtrl: NavController, 
				public navParams: NavParams,
				private storage: Storage,
				private databaseprovider: Database,
				private cd: ChangeDetectorRef,
				public loadingCtrl: LoadingController,
				private localstorage: Localstorage) {
					
	}



	ionViewDidLoad() {
		
		console.log('ionViewDidLoad MyAgendaFull');
				
	}

	ngOnInit() {

		// Load initial data set here
		let loading = this.loadingCtrl.create({
			spinner: 'crescent',
			content: 'Please wait...'
		});

		loading.present();

		this.agenda = "myagenda";
		
		// Blank and show loading info
		this.agendaTueItems = [];
		this.agendaWedItems = [];
		this.agendaThuItems = [];
		this.agendaFriItems = [];
		this.agendaSatItems = [];

		this.fullagendaDay1Items = [];
		this.fullagendaDay2Items = [];
		this.fullagendaDay3Items = [];
		this.fullagendaDay4Items = [];
		this.fullagendaDay5Items = [];

		this.cd.markForCheck();

		// Temporary use variables
		var flags;
		var visStartTime;
		var visEndTime;
		var eventIcon;
		var visEventName;
		var CourseID;
	
		// Get the data
		var AttendeeID = this.localstorage.getLocalValue('AttendeeID');

		if (AttendeeID !='' && AttendeeID != null) {
				




			// -------------------
			// Get data: Saturday
			// -------------------
			flags = "li|2018-11-13";
			
			this.databaseprovider.getAgendaData(flags, AttendeeID).then(data => {
				
				console.log("getAgendaData: " + JSON.stringify(data));

				if (data['length']>0) {
					
					for (var i = 0; i < data['length']; i++) {

						visStartTime = formatTime(data[i].EventStartTime);
						visEndTime = formatTime(data[i].EventEndTime);

						if (data[i].EventID == "0") {
							eventIcon = "time";
							visEventName = data[i].EventName;
						} else {
							eventIcon = "list-box";
							visEventName = data[i].EventName;
						}
						
						// Status checks
						var SessionStatus = "";
						var StatusStyle = "SessionStatusNormal";
						
						// Room Capacity check
						if (parseInt(data[i].RoomCapacity) <= parseInt(data[i].Attendees)) {
							SessionStatus = "Course at Capacity";
							StatusStyle = "SessionStatusRed";
						}
						
						// Waitlist check
						if (data[i].Waitlist == "1") {
							if (SessionStatus == "") {
								SessionStatus = "You are Waitlisted";
								StatusStyle = "SessionStatusRed";
							} else {
								SessionStatus = SessionStatus + " / You are Waitlisted";
								StatusStyle = "SessionStatusRed";
							}
						}

						this.agendaTueItems.push({
							EventName: visEventName,
							visEventTimeframe: visStartTime + " to " + visEndTime,
							visEventID: "'" + data[i].EventID + "|" + data[i].mtgID + "'",
							EventLocation: data[i].EventLocation,
							eventTypeIcon: eventIcon,
							SessionStatusStyle: StatusStyle,
							SessionStatus: SessionStatus
						});

					}


				} else {
					
					this.agendaTueItems.push({
						EventName: "No entries made for Tuesday",
						visEventTimeframe: "",
						EventLocation: "",
						visEventID: "'0|0'",
						eventTypeIcon: "remove-circle",
						SessionStatusStyle: "",
						SessionStatus: ""
					});

				}

				this.cd.markForCheck();

				
				// -------------------
				// Get data: Sunday
				// -------------------
				flags = "li|2018-11-14";
				
				this.databaseprovider.getAgendaData(flags, AttendeeID).then(data => {
					
					console.log("getAgendaData: " + JSON.stringify(data));

					if (data['length']>0) {
						
						for (var i = 0; i < data['length']; i++) {

							visStartTime = formatTime(data[i].EventStartTime);
							visEndTime = formatTime(data[i].EventEndTime);

							if (data[i].EventID == "0") {
								eventIcon = "time";
								visEventName = data[i].EventName;
							} else {
								eventIcon = "list-box";
								visEventName = data[i].EventName;
							}

							// Status checks
							var SessionStatus = "";
							var StatusStyle = "SessionStatusNormal";
							
							// Room Capacity check
							if (parseInt(data[i].RoomCapacity) <= parseInt(data[i].Attendees)) {
								SessionStatus = "Course at Capacity";
								StatusStyle = "SessionStatusRed";
							}
							
							// Waitlist check
							if (data[i].Waitlist == "1") {
								if (SessionStatus == "") {
									SessionStatus = "You are Waitlisted";
									StatusStyle = "SessionStatusRed";
								} else {
									SessionStatus = SessionStatus + " / You are Waitlisted";
									StatusStyle = "SessionStatusRed";
								}
							}

							this.agendaWedItems.push({
								EventName: visEventName,
								visEventTimeframe: visStartTime + " to " + visEndTime,
								visEventID: "'" + data[i].EventID + "|" + data[i].mtgID + "'",
								EventLocation: data[i].EventLocation,
								eventTypeIcon: eventIcon,
								SessionStatusStyle: StatusStyle,
								SessionStatus: SessionStatus
							});

						}


					} else {
						
						this.agendaWedItems.push({
							EventName: "No entries made for Wednesday",
							visEventTimeframe: "",
							EventLocation: "",
							visEventID: "'0|0'",
							eventTypeIcon: "remove-circle",
							SessionStatusStyle: "",
							SessionStatus: ""
						});

					}

					this.cd.markForCheck();

					
					// -------------------
					// Get data: Monday
					// -------------------
					flags = "li|2018-11-15";
					
					this.databaseprovider.getAgendaData(flags, AttendeeID).then(data => {
						
						console.log("getAgendaData: " + JSON.stringify(data));

						if (data['length']>0) {
							
							for (var i = 0; i < data['length']; i++) {

								visStartTime = formatTime(data[i].EventStartTime);
								visEndTime = formatTime(data[i].EventEndTime);

								if (data[i].EventID == "0") {
									eventIcon = "time";
									visEventName = data[i].EventName;
								} else {
									eventIcon = "list-box";
									visEventName = data[i].EventName;
								}

								// Status checks
								var SessionStatus = "";
								var StatusStyle = "SessionStatusNormal";
								
								// Room Capacity check
								if (parseInt(data[i].RoomCapacity) <= parseInt(data[i].Attendees)) {
									SessionStatus = "Course at Capacity";
									StatusStyle = "SessionStatusRed";
								}
								
								// Waitlist check
								if (data[i].Waitlist == "1") {
									if (SessionStatus == "") {
										SessionStatus = "You are Waitlisted";
										StatusStyle = "SessionStatusRed";
									} else {
										SessionStatus = SessionStatus + " / You are Waitlisted";
										StatusStyle = "SessionStatusRed";
									}
								}

								console.log(SessionStatus);
								
								this.agendaThuItems.push({
									EventName: visEventName,
									visEventTimeframe: visStartTime + " to " + visEndTime,
									visEventID: "'" + data[i].EventID + "|" + data[i].mtgID + "'",
									EventLocation: data[i].EventLocation,
									eventTypeIcon: eventIcon,
									SessionStatusStyle: StatusStyle,
									SessionStatus: SessionStatus
								});

							}


						} else {
							
							this.agendaThuItems.push({
								EventName: "No agenda entries made for Thursday",
								visEventTimeframe: "",
								EventLocation: "",
								visEventID: "'0|0'",
								eventTypeIcon: "remove-circle",
								SessionStatusStyle: "",
								SessionStatus: ""
							});

						}

						this.cd.markForCheck();
						
						// -------------------
						// Get data: Tuesday
						// -------------------
						flags = "li|2018-11-16";
						
						this.databaseprovider.getAgendaData(flags, AttendeeID).then(data => {
							
							console.log("getAgendaData: " + JSON.stringify(data));

							if (data['length']>0) {
								
								for (var i = 0; i < data['length']; i++) {

									visStartTime = formatTime(data[i].EventStartTime);
									visEndTime = formatTime(data[i].EventEndTime);

									if (data[i].EventID == "0") {
										eventIcon = "time";
										visEventName = data[i].EventName;
									} else {
										eventIcon = "list-box";
										visEventName = data[i].EventName;
									}

									// Status checks
									var SessionStatus = "";
									var StatusStyle = "SessionStatusNormal";
									
									// Room Capacity check
									if (parseInt(data[i].RoomCapacity) <= parseInt(data[i].Attendees)) {
										SessionStatus = "Course at Capacity";
										StatusStyle = "SessionStatusRed";
									}
									
									// Waitlist check
									if (data[i].Waitlist == "1") {
										if (SessionStatus == "") {
											SessionStatus = "You are Waitlisted";
											StatusStyle = "SessionStatusRed";
										} else {
											SessionStatus = SessionStatus + " / You are Waitlisted";
											StatusStyle = "SessionStatusRed";
										}
									}

									this.agendaFriItems.push({
										EventName: visEventName,
										visEventTimeframe: visStartTime + " to " + visEndTime,
										visEventID: "'" + data[i].EventID + "|" + data[i].mtgID + "'",
										EventLocation: data[i].EventLocation,
										eventTypeIcon: eventIcon,
										SessionStatusStyle: StatusStyle,
										SessionStatus: SessionStatus
									});

								}


							} else {
								
								this.agendaFriItems.push({
									EventName: "No agenda entries made for Friday",
									visEventTimeframe: "",
									EventLocation: "",
									visEventID: "'0|0'",
									eventTypeIcon: "remove-circle",
									SessionStatusStyle: "",
									SessionStatus: ""
								});

							}

							this.cd.markForCheck();

							// -------------------
							// Get data: Wednesday
							// -------------------
							flags = "li|2018-11-17";
							
							this.databaseprovider.getAgendaData(flags, AttendeeID).then(data => {
								
								console.log("getAgendaData: " + JSON.stringify(data));

								if (data['length']>0) {
									
									for (var i = 0; i < data['length']; i++) {

										visStartTime = formatTime(data[i].EventStartTime);
										visEndTime = formatTime(data[i].EventEndTime);

										if (data[i].EventID == "0") {
											eventIcon = "time";
											visEventName = data[i].EventName;
										} else {
											eventIcon = "list-box";
											visEventName = data[i].EventName;
										}

										// Status checks
										var SessionStatus = "";
										var StatusStyle = "SessionStatusNormal";
										
										// Room Capacity check
										if (parseInt(data[i].room_capacity) <= parseInt(data[i].Attendees)) {
											SessionStatus = "Course at Capacity";
											StatusStyle = "SessionStatusRed";
										}
										
										// Waitlist check
										if (data[i].Waitlist == "1") {
											if (SessionStatus == "") {
												SessionStatus = "You are Waitlisted";
												StatusStyle = "SessionStatusRed";
											} else {
												SessionStatus = SessionStatus + " / You are Waitlisted";
												StatusStyle = "SessionStatusRed";
											}
										}

										this.agendaSatItems.push({
											EventName: visEventName,
											visEventTimeframe: visStartTime + " to " + visEndTime,
											visEventID: "'" + data[i].EventID + "|" + data[i].mtgID + "'",
											EventLocation: data[i].EventLocation,
											eventTypeIcon: eventIcon,
											SessionStatusStyle: StatusStyle,
											SessionStatus: SessionStatus
										});

									}


								} else {
									
									this.agendaSatItems.push({
										EventName: "No agenda entries made for Saturday",
										visEventTimeframe: "",
										EventLocation: "",
										visEventID: "'0|0'",
										eventTypeIcon: "remove-circle",
										SessionStatusStyle: "",
										SessionStatus: ""
									});

								}

								this.cd.markForCheck();

								// -------------------
								// Get data: All Sessions Day 1
								// -------------------
								flags = "li3|2018-11-13";
								
								this.databaseprovider.getLectureData(flags, AttendeeID).then(data => {
									
									console.log("getLectureData: " + JSON.stringify(data));

									if (data['length']>0) {
										
										for (var i = 0; i < data['length']; i++) {

											var dbEventDateTime = data[i].session_start_time;
											dbEventDateTime = dbEventDateTime.replace(/-/g, '/');
											dbEventDateTime = dbEventDateTime.replace(/T/g, ' ');
											var SQLDate = new Date(dbEventDateTime);
											visStartTime = dateFormat(SQLDate, "h:MMtt");
											
											// Display end time
											dbEventDateTime = data[i].session_end_time;
											dbEventDateTime = dbEventDateTime.replace(/-/g, '/');
											dbEventDateTime = dbEventDateTime.replace(/T/g, ' ');
											SQLDate = new Date(dbEventDateTime);
											visEndTime = dateFormat(SQLDate, "h:MMtt");

											eventIcon = "list-box";
											visEventName = data[i].session_title;

											CourseID = "ID: " + data[i].session_id;

											// Status checks
											var SessionStatus = "";
											var StatusStyle = "SessionStatusNormal";
											
											// Room Capacity check
											if (parseInt(data[i].room_capacity) <= parseInt(data[i].Attendees)) {
												SessionStatus = "Course at Capacity";
												StatusStyle = "SessionStatusRed";
											}

											this.fullagendaDay1Items.push({
												EventName: visEventName,
												visEventTimeframe: visStartTime + " to " + visEndTime,
												visEventID: data[i].session_id,
												EventLocation: data[i].RoomName,
												visCourseID: CourseID,
												eventTypeIcon: eventIcon,
												SessionStatusStyle: StatusStyle,
												SessionStatus: SessionStatus
											});

										}


									} else {
										
										this.fullagendaDay1Items.push({
											EventName: "No sessions for this day",
											visEventTimeframe: "",
											EventLocation: "",
											visCourseID: "",
											visEventID: "0",
											eventTypeIcon: "remove-circle",
											SessionStatusStyle: "",
											SessionStatus: ""
										});

									}

									// -------------------
									// Get data: All Sessions Day 2
									// -------------------
									flags = "li3|2018-11-14";
									
									this.databaseprovider.getLectureData(flags, AttendeeID).then(data => {
										
										console.log("getLectureData: " + JSON.stringify(data));

										if (data['length']>0) {
											
											for (var i = 0; i < data['length']; i++) {

												var dbEventDateTime = data[i].session_start_time;
												dbEventDateTime = dbEventDateTime.replace(/-/g, '/');
												dbEventDateTime = dbEventDateTime.replace(/T/g, ' ');
												var SQLDate = new Date(dbEventDateTime);
												visStartTime = dateFormat(SQLDate, "h:MMtt");
												
												// Display end time
												dbEventDateTime = data[i].session_end_time;
												dbEventDateTime = dbEventDateTime.replace(/-/g, '/');
												dbEventDateTime = dbEventDateTime.replace(/T/g, ' ');
												SQLDate = new Date(dbEventDateTime);
												visEndTime = dateFormat(SQLDate, "h:MMtt");

												eventIcon = "list-box";
												visEventName = data[i].session_title;

												CourseID = "ID: " + data[i].session_id;

												// Status checks
												var SessionStatus = "";
												var StatusStyle = "SessionStatusNormal";
												
												// Room Capacity check
												if (parseInt(data[i].room_capacity) <= parseInt(data[i].Attendees)) {
													SessionStatus = "Course at Capacity";
													StatusStyle = "SessionStatusRed";
												}

												this.fullagendaDay2Items.push({
													EventName: visEventName,
													visEventTimeframe: visStartTime + " to " + visEndTime,
													visEventID: data[i].session_id,
													visCourseID: CourseID,
													EventLocation: data[i].RoomName,
													eventTypeIcon: eventIcon,
													SessionStatusStyle: StatusStyle,
													SessionStatus: SessionStatus
												});

											}


										} else {
											
											this.fullagendaDay2Items.push({
												EventName: "No sessions for this day",
												visEventTimeframe: "",
												EventLocation: "",
												visCourseID: "",
												visEventID: "0",
												eventTypeIcon: "remove-circle",
												SessionStatusStyle: "",
												SessionStatus: ""
											});

										}

										// -------------------
										// Get data: All Sessions Day 3
										// -------------------
										flags = "li3|2018-11-15";
										
										this.databaseprovider.getLectureData(flags, AttendeeID).then(data => {
											
											console.log("getLectureData: " + JSON.stringify(data));

											if (data['length']>0) {
												
												for (var i = 0; i < data['length']; i++) {

													var dbEventDateTime = data[i].session_start_time;
													dbEventDateTime = dbEventDateTime.replace(/-/g, '/');
													dbEventDateTime = dbEventDateTime.replace(/T/g, ' ');
													var SQLDate = new Date(dbEventDateTime);
													visStartTime = dateFormat(SQLDate, "h:MMtt");
													
													// Display end time
													dbEventDateTime = data[i].session_end_time;
													dbEventDateTime = dbEventDateTime.replace(/-/g, '/');
													dbEventDateTime = dbEventDateTime.replace(/T/g, ' ');
													SQLDate = new Date(dbEventDateTime);
													visEndTime = dateFormat(SQLDate, "h:MMtt");

													eventIcon = "list-box";
													visEventName = data[i].session_title;

													CourseID = "ID: " + data[i].session_id;

													// Status checks
													var SessionStatus = "";
													var StatusStyle = "SessionStatusNormal";
													
													// Room Capacity check
													if (parseInt(data[i].room_capacity) <= parseInt(data[i].Attendees)) {
														SessionStatus = "Course at Capacity";
														StatusStyle = "SessionStatusRed";
													}

													this.fullagendaDay3Items.push({
														EventName: visEventName,
														visEventTimeframe: visStartTime + " to " + visEndTime,
														visEventID: data[i].session_id,
														EventLocation: data[i].RoomName,
														visCourseID: CourseID,
														eventTypeIcon: eventIcon,
														SessionStatusStyle: StatusStyle,
														SessionStatus: SessionStatus
													});

												}


											} else {
												
												this.fullagendaDay3Items.push({
													EventName: "No sessions for this day",
													visEventTimeframe: "",
													EventLocation: "",
													visCourseID: "",
													visEventID: "0",
													eventTypeIcon: "remove-circle",
													SessionStatusStyle: "",
													SessionStatus: ""
												});

											}

											// -------------------
											// Get data: All Sessions Day 4
											// -------------------
											flags = "li3|2018-11-16";
											
											this.databaseprovider.getLectureData(flags, AttendeeID).then(data => {
												
												console.log("getLectureData: " + JSON.stringify(data));

												if (data['length']>0) {
													
													for (var i = 0; i < data['length']; i++) {

														var dbEventDateTime = data[i].session_start_time;
														dbEventDateTime = dbEventDateTime.replace(/-/g, '/');
														dbEventDateTime = dbEventDateTime.replace(/T/g, ' ');
														var SQLDate = new Date(dbEventDateTime);
														visStartTime = dateFormat(SQLDate, "h:MMtt");
														
														// Display end time
														dbEventDateTime = data[i].session_end_time;
														dbEventDateTime = dbEventDateTime.replace(/-/g, '/');
														dbEventDateTime = dbEventDateTime.replace(/T/g, ' ');
														SQLDate = new Date(dbEventDateTime);
														visEndTime = dateFormat(SQLDate, "h:MMtt");

														eventIcon = "list-box";
														visEventName = data[i].session_title;

														CourseID = "ID: " + data[i].session_id;

														// Status checks
														var SessionStatus = "";
														var StatusStyle = "SessionStatusNormal";
														
														// Room Capacity check
														if (parseInt(data[i].room_capacity) <= parseInt(data[i].Attendees)) {
															SessionStatus = "Course at Capacity";
															StatusStyle = "SessionStatusRed";
														}

														this.fullagendaDay4Items.push({
															EventName: visEventName,
															visEventTimeframe: visStartTime + " to " + visEndTime,
															visEventID: data[i].session_id,
															visCourseID: CourseID,
															EventLocation: data[i].RoomName,
															eventTypeIcon: eventIcon,
															SessionStatusStyle: StatusStyle,
															SessionStatus: SessionStatus
														});

													}


												} else {
													
													this.fullagendaDay4Items.push({
														EventName: "No sessions for this day",
														visEventTimeframe: "",
														EventLocation: "",
														visCourseID: "",
														visEventID: "0",
														eventTypeIcon: "remove-circle",
														SessionStatusStyle: "",
														SessionStatus: ""
													});

												}

												// -------------------
												// Get data: All Sessions Day 5
												// -------------------
												flags = "li3|2018-11-17";
												
												this.databaseprovider.getLectureData(flags, AttendeeID).then(data => {
													
													console.log("getLectureData: " + JSON.stringify(data));

													if (data['length']>0) {
														
														for (var i = 0; i < data['length']; i++) {

															var dbEventDateTime = data[i].session_start_time;
															dbEventDateTime = dbEventDateTime.replace(/-/g, '/');
															dbEventDateTime = dbEventDateTime.replace(/T/g, ' ');
															var SQLDate = new Date(dbEventDateTime);
															visStartTime = dateFormat(SQLDate, "h:MMtt");
															
															// Display end time
															dbEventDateTime = data[i].session_end_time;
															dbEventDateTime = dbEventDateTime.replace(/-/g, '/');
															dbEventDateTime = dbEventDateTime.replace(/T/g, ' ');
															SQLDate = new Date(dbEventDateTime);
															visEndTime = dateFormat(SQLDate, "h:MMtt");

															eventIcon = "list-box";
															visEventName = data[i].session_title;

															CourseID = "ID: " + data[i].session_id;

															// Status checks
															var SessionStatus = "";
															var StatusStyle = "SessionStatusNormal";
															
															// Room Capacity check
															if (parseInt(data[i].room_capacity) <= parseInt(data[i].Attendees)) {
																SessionStatus = "Course at Capacity";
																StatusStyle = "SessionStatusRed";
															}

															this.fullagendaDay5Items.push({
																EventName: visEventName,
																visEventTimeframe: visStartTime + " to " + visEndTime,
																visEventID: data[i].session_id,
																EventLocation: data[i].RoomName,
																visCourseID: CourseID,
																eventTypeIcon: eventIcon,
																SessionStatusStyle: StatusStyle,
																SessionStatus: SessionStatus
															});

														}


													} else {
														
														this.fullagendaDay5Items.push({
															EventName: "No sessions for this day",
															visEventTimeframe: "",
															EventLocation: "",
															visCourseID: "",
															visEventID: "0",
															eventTypeIcon: "remove-circle",
															SessionStatusStyle: "",
															SessionStatus: ""
														});

													}
													loading.dismiss();

												}).catch(function () {
													console.log("Promise Rejected");
												});

											}).catch(function () {
												console.log("Promise Rejected");
											});

										}).catch(function () {
											console.log("Promise Rejected");
										});

									}).catch(function () {
										console.log("Promise Rejected");
									});

								}).catch(function () {
									console.log("Promise Rejected");
								});

							}).catch(function () {
								console.log("Promise Rejected");
							});

						}).catch(function () {
							console.log("Promise Rejected");
						});

					}).catch(function () {
						console.log("Promise Rejected");
					});
					
				}).catch(function () {
					console.log("Promise Rejected");
				});
				
			}).catch(function () {
				console.log("Promise Rejected");
			});
				
		} else {
			console.log('User not logged in');
			//loading.dismiss();
		}

	}
	
    EventDetails(EventID) {
		
		console.log("Btn ID: " + EventID);
		
        var IDSplit = EventID.split("|");

        var storeEventID = IDSplit[0].replace("'","");
        var storePersonalEventID = IDSplit[1].replace("'", "");
		console.log("storeEventID: " + storeEventID);
		console.log("storePersonalEventID: " + storePersonalEventID);

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

	SessionDetails(EventID) {
		
		console.log("Btn ID: " + EventID);
		
        if (EventID == "0") {
            // Do nothing
        } else {

			// Set EventID to LocalStorage
			this.localstorage.setLocalValue('EventID', EventID);

			// Navigate to Education Details page
			this.navCtrl.push('EducationDetailsPage', {EventID: EventID}, {animate: true, direction: 'forward'});

        }
    };

}

