import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'src/app/models/message';
import { MembersService } from 'src/app/services/members.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.scss']
})
export class MemberMessagesComponent implements OnInit {
  @ViewChild('messageForm') messageForm: NgForm;
  messages: Message[];
  messageContent: string;

  constructor(private messageService: MessageService,
     private route: ActivatedRoute,
     private memberService: MembersService) { }

  ngOnInit(): void {
    this.loadMessagesThread();
  }

  loadMessagesThread(){
    this.messageService
      .getMessageThread(this.route.snapshot.paramMap.get('username'))
      .subscribe(messages => this.messages = messages);
  }

  sendMessage() {
    this.messageService
      .sendMessage(this.route.snapshot.paramMap.get('username'),this.messageContent)
      .subscribe(message =>{ 
        this.messages.push(message);
        this.messageForm.reset();
      });
  }
}
