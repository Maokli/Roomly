import { HttpClient, HttpParams} from '@angular/common/http';
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

  getMembers(userParams: UserParams) {
    let response = this.memberCache.get(Object.values(userParams).join('-'));
    if(response) return of(response);

    let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('country', userParams.country);
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);

    return this.GetPaginatedResults(this.baseUrl + 'users', params)
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

  private GetPaginatedResults(url,params: HttpParams) {
    const paginatedResult: PaginatedResult<Member[]> = new PaginatedResult<Member[]>();

    return this.http.get<Member[]>(url, { observe: "response", params })
      .pipe(map(response => {
        response.body.forEach(member => 
            member.interestsArray = member.interests?.split(','));

        paginatedResult.result = response.body;

        if (response.headers.get('Pagination') !== null)
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        return paginatedResult;
      }));
  }

  private getPaginationHeaders(pageNumber: number, pageSize: number) {
    let params = new HttpParams();

    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    return params;
  }


}
