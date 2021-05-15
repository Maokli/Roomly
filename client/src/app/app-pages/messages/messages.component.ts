import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message';
import { Pagination } from 'src/app/models/pagination';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  container = 'Unread';
  pageNumber = 1;
  PageSize = 5;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    this.messageService.getMessages(this.pageNumber, this.PageSize, this.container)
      .subscribe(response => {
        this.messages = response.result;
        this.pagination = response.pagination;
      })
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadMessages();
  }
}
