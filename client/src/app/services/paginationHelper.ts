import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Member } from "../models/member";
import { PaginatedResult } from "../models/pagination";

export function GetPaginatedResults<T>(url,params: HttpParams, http: HttpClient) {
  const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
  const typeToTestWith: Partial<Member[]> = [];
  return http.get<T>(url, { observe: "response", params })
    .pipe(map(response => {
      if(typeof(response) == typeof(typeToTestWith)){
        (response as unknown as HttpResponse<Partial<Member[]>>).body
            .forEach(member => member.interestsArray = member.interests?.split(','));
        
      }
      
      paginatedResult.result = response.body;

      if (response.headers.get('Pagination') !== null)
        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
      return paginatedResult;
    }));
}

export function getPaginationHeaders(pageNumber: number, pageSize: number) {
  let params = new HttpParams();

  params = params.append('pageNumber', pageNumber.toString());
  params = params.append('pageSize', pageSize.toString());

  return params;
}