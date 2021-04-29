import { HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../models/member';
import { MemberUpdate } from '../models/memberUpdate';
import "automapper-ts/dist/automapper"
import { PaginatedResult } from '../models/pagination';
import { UserParams } from '../models/userParams';


@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.ApiUrl;
  members: Member[] = [];
  constructor(private http: HttpClient) { }

  getMembers(userParams: UserParams) {
    let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('country', userParams.country);
    params = params.append('gender', userParams.gender);

    return this.GetPaginatedResults(this.baseUrl + 'users', params);
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
