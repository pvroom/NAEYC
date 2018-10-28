// Components, functions, plugins
import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef, NgModule } from '@angular/core';
import { NavParams, Events, NavController, Content } from 'ionic-angular';
import { ChatService, ChatMessage, UserInfo } from './../../services/chat-service';
import { Localstorage } from './../../providers/localstorage/localstorage';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'page-conversation',
  templateUrl: 'conversation.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
 })

export class ConversationPage implements OnInit {
	
	@ViewChild(Content) content: Content;
	@ViewChild('chat_input') messageInput: ElementRef;
	msgList: ChatMessage[] = [];
	user: UserInfo;
	toUser: UserInfo;
	editorMsg = '';
	showEmojiPicker = false;
	setIntervalID: any;
	public AttendeeName: string;
	
	constructor(navParams: NavParams,
				public nav: NavController, 
				public chatService: ChatService,
				private localstorage: Localstorage,
				private cd: ChangeDetectorRef,
				private events: Events) {
					

	}

	ngOnInit() {
		console.log('Conversation entered');

		var AttendeeID = this.localstorage.getLocalValue('AttendeeID');
		var UserFullName = this.localstorage.getLocalValue('LoginFullName');
		var rAttendeeID = this.localstorage.getLocalValue('ConversationAttendeeID');
		var rAttendeeName = this.localstorage.getLocalValue('ConversationAttendeeName');
		this.AttendeeName = rAttendeeName;
		
		// Set up sender
		this.user = {
			id:	AttendeeID,
			name: UserFullName,
			avatar: 'https://naeyc.convergence-us.com/AdminGateway/images/Attendees/' + AttendeeID + '.jpg'
		};
		
		// Set up receiver
		this.toUser = {
			id: rAttendeeID,
			name: rAttendeeName,
			avatar: 'https://naeyc.convergence-us.com/AdminGateway/images/Attendees/' + rAttendeeID + '.jpg'
		};
		
		var temp = this;
		this.setIntervalID = setInterval(function(){ 
			console.log('Calling getNewMessages(' + AttendeeID + ', ' + rAttendeeID + ')');
			temp.chatService.getNewMessages(AttendeeID, rAttendeeID);
		}, 4000);

	}

	ionViewWillLeave() {
		// unsubscribe
		this.events.unsubscribe('chat:received');
		clearInterval(this.setIntervalID);
	}

	ionViewDidEnter() {
		//get message list
		var AttendeeID = this.localstorage.getLocalValue('AttendeeID');
		var rAttendeeID = this.localstorage.getLocalValue('ConversationAttendeeID');
		this.getMsg(AttendeeID, rAttendeeID);

		// Subscribe to receive new message events
		this.events.subscribe('chat:received', msg => {
			this.pushNewMsg(msg);
		})
	}

	onFocus() {
		this.showEmojiPicker = false;
		this.content.resize();
		this.scrollToBottom();
	}

	/**
	* @name getMsg
	* @returns {Promise<ChatMessage[]>}
	*/
	getMsg(sAttendeeID, rAttendeeID) {
		return this.chatService
			.getMsgList(sAttendeeID, rAttendeeID)
			.subscribe(res => {
				
				console.log('Initial message list: ' + JSON.stringify(res));
				
				this.msgList = res;
				this.content.resize();
				this.cd.markForCheck();
				this.scrollToBottom();
				
			});
	}

	/**
	* @name sendMsg
	*/
	sendMsg() {
		if (!this.editorMsg.trim()) return;

		var AttendeeID = this.localstorage.getLocalValue('AttendeeID');
		// Mock message
		var DateNow = new Date().toISOString();
		console.log('Datestamp: ' + DateNow);
		
		const id = Date.now().toString();
		let newMsg: ChatMessage = {
			messageId: DateNow,
			userId: this.user.id,
			userName: this.user.name,
			userAvatar: this.user.avatar,
			toUserId: this.toUser.id,
			time: DateNow,
			message: this.editorMsg,
			status: 'pending'
		};

		this.pushNewMsg(newMsg);
		this.editorMsg = '';

		//if (!this.showEmojiPicker) {
		//	this.focus();
		//}

		this.chatService.sendMsg(newMsg, AttendeeID).then(() => {
			let index = this.getMsgIndexById(id);
			if (index !== -1) {
				this.msgList[index].status = 'success';
			}
		})
	}

	/**
	* @name pushNewMsg
	* @param msg
	*/
	pushNewMsg(msg: ChatMessage) {
		/*
		const userId = this.user.id,
		toUserId = this.toUser.id;

		// Verify user relationships
		if (msg.userId === userId && msg.toUserId === toUserId) {
			this.msgList.push(msg);
		} else if (msg.toUserId === userId && msg.userId === toUserId) {
			this.msgList.push(msg);
		}
		*/
		this.msgList.push(msg);
		this.content.resize();
		this.cd.markForCheck();
		this.scrollToBottom();
	}

	getMsgIndexById(id: string) {
		return this.msgList.findIndex(e => e.messageId === id)
	}

	scrollToBottom() {
		setTimeout(() => {
			if (this.content.scrollToBottom !== null) {
				if (this.content.scrollToBottom) {
					this.content.scrollToBottom();
				}
			}
		}, 400)
	}

	private focus() {
		if (this.messageInput && this.messageInput.nativeElement) {
			this.messageInput.nativeElement.focus();
		}
	}

	private setTextareaScroll() {
		const textarea = this.messageInput.nativeElement;
		textarea.scrollTop = textarea.scrollHeight;
	}

}