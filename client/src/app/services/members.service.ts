import { HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../models/member';
import { MemberUpdate } from '../models/memberUpdate';
import "automapper-ts/dist/automapper"
import { PaginatedResult } from '../models/pagination';


@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.ApiUrl;
  members: Member[] = [];
  paginatedResult: PaginatedResult<Member[]> = new PaginatedResult<Member[]>();
  constructor(private http: HttpClient) { }

  getMembers(page?: number, itemsPerPage?: number) {
    let params = new HttpParams();
    if(page !== null && itemsPerPage !== null){
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }
    //if(this.members.length > 0) return of(this.members);
    return this.http.get<Member[]>(this.baseUrl + 'users', {observe: "response", params})
    .pipe(map(response => {
      response.body.forEach(member => member.interestsArray = member.interests?.split(','));
      
      this.paginatedResult.result = response.body;

      if(response.headers.get('Pagination') !== null)
        this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
      return this.paginatedResult;
    }))
  }

  getMember(username: string){
    const member = this.members.find(x => x.userName === username);
    if(member !== undefined) return of(member)
    
    return this.http.get<Member>(this.baseUrl + 'users/'+username).pipe(map(response => {
      if(response.interestsArray) 
        response.interestsArray = response.interests.split(',');
      return response;
    }))
  }

  updateMember(member: MemberUpdate) {
    return this.http.put(this.baseUrl + 'users/',member).pipe(map(
      () => {
        const index = this.members.findIndex(x => x.userName === member.userName);
        this.members[index] = member;
      }
    ));
  }

}
