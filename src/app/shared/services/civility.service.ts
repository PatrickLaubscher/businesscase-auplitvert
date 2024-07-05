import { inject, Injectable } from '@angular/core';
import { Civility } from '../entities';
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
    return this.http.get<Civility[]>(`${this.apiUrl}/civilities`);
  }


}