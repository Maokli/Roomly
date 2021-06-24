import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-message-card',
  templateUrl: './message-card.component.html',
  styleUrls: ['./message-card.component.scss']
})
export class MessageCardComponent implements OnInit {

  @Input() message : Message;

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
  }

}
