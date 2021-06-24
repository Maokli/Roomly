import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'src/app/models/message';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.scss']
})
export class MemberMessagesComponent implements OnInit {
  messages: Message[];

  constructor(private messageService: MessageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadMessagesThread();
  }

  loadMessagesThread(){
    this.messageService
      .getMessageThread(this.route.snapshot.paramMap.get('username'))
      .subscribe(messages => this.messages = messages);
  }
}
