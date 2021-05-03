import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/models/member';
import { PaginatedResult, Pagination } from 'src/app/models/pagination';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {
  members: Partial<Member[]>;
  predicate = "liked";
  pageNumber = 1;
  pageSize = 5;
  pagination: Pagination;

  constructor(private membersService: MembersService) { }

  ngOnInit(): void {
    this.loadLikes();
  }

  loadLikes() {
    this.membersService.getLikes(this.predicate, this.pageNumber, this.pageSize).subscribe(response => {
      this.members = response.result;
      this.pagination = response.pagination;
      this.resizeCards();
    })
  }

  resizeCards(){
    setTimeout(() => {
      const cards = document.querySelectorAll<HTMLElement>('.card');
      cards.forEach(card => card.style.height = "auto");
    },500)
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadLikes();
  }
}
