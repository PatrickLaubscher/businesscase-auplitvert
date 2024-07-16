import { inject, Injectable } from '@angular/core';
import { ApiListResponse, Civility } from '../entities';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CivilityService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  civilities:Civility[] = [];

  fetchAllCivilities (): Observable<Civility[]> {
    return this.http.get<ApiListResponse<Civility>>(`${this.apiUrl}/civilities`).pipe(
      map(response => response['hydra:member'])
    );
  }

}