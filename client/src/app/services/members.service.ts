import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../models/member';
import { MemberUpdate } from '../models/memberUpdate';
import "automapper-ts/dist/automapper"


@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.ApiUrl;
  members: Member[] = [];
  constructor(private http: HttpClient) { }

  getMembers() {
    if(this.members.length > 0) return of(this.members);
    return this.http.get<Member[]>(this.baseUrl + 'users').pipe(map(response => {
      response.forEach(member => member.interestsArray = member.interests?.split(','));
      this.members = response;
      return response;
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
