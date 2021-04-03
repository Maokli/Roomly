import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../models/member';


@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.ApiUrl;
  constructor(private http: HttpClient) { }

  getMembers() {
    return this.http.get<Member[]>(this.baseUrl + 'users').pipe(map(response => {
      response.forEach(member => member.interestsArray = member.interests.split(','));
      return response;
    }))
  }
  getMember(username: string){
    return this.http.get<Member>(this.baseUrl + 'users/'+username).pipe(map(response => {
      response.interestsArray = response.interests.split(',')
      return response;
    }))
  }
}
