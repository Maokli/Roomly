import { HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../models/member';
import { MemberUpdate } from '../models/memberUpdate';
import "automapper-ts/dist/automapper"
import { PaginatedResult } from '../models/pagination';
import { UserParams } from '../models/userParams';
import { AccountService } from './account.service';
import { User } from '../models/user';
import { GetPaginatedResults, getPaginationHeaders } from './paginationHelper';


@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.ApiUrl;
  members: Member[] = [];
  memberCache = new Map();
  user: User;
  userParams: UserParams;
  constructor(private http: HttpClient, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user =>{
      this.user = user;
      this.userParams = new UserParams(user);
   })
   }

   getUserParams() {
     return this.userParams;
   }
   setUserParams(userParams: UserParams){
     this.userParams = userParams;
   }
   resetUserParams() {
     this.userParams = new UserParams(this.user);
     return this.userParams;
   }

   addLike(username: string) {
     return this.http.post(this.baseUrl + "likes/"+username, {}, {responseType: 'text'});
   }
   getLikes(predicate: string, pageNumber: number, pageSize: number) {
     let params =  getPaginationHeaders(pageNumber, pageSize);
     params = params.append('predicate', predicate);
     return GetPaginatedResults<Partial<Member[]>>(this.baseUrl + "likes", params,this.http);
   }

  getMembers(userParams: UserParams) {
    let response = this.memberCache.get(Object.values(userParams).join('-'));
    if(response) return of(response);

    let params = getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('country', userParams.country);
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);

    return GetPaginatedResults<Member[]>(this.baseUrl + 'users', params, this.http)
      .pipe(map(response => {
        this.memberCache.set(Object.values(userParams).join('-'), response);
        return response;
      }))
  }

  
  getMember(username: string){
    const member = [...this.memberCache.values()]
      .reduce((arr, elem) => arr.concat(elem.result), [])
      .find((member: Member) => member.userName === username);
    
    if(member) return of(member);
    
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
