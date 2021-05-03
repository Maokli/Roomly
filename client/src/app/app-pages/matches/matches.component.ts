import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/models/member';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {
  members: Partial<Member[]>;
  predicate = "liked";

  constructor(private membersService: MembersService) { }

  ngOnInit(): void {
    this.loadLikes();
  }

  loadLikes() {
    this.membersService.getLikes(this.predicate).subscribe(response => {
      this.members = response;
      this.resizeCards();
    })
  }

  resizeCards(){
    setTimeout(() => {
      const cards = document.querySelectorAll<HTMLElement>('.card');
      console.log(cards);
      cards.forEach(card => card.style.height = "auto");
    },500)

  }
}
