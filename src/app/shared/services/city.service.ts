import { inject, Injectable } from '@angular/core';
import { ApiListResponse, City } from '../entities';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CityService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  cities:City[] = [];

  fetchAllCities (): Observable<City[]> {
    return this.http.get<ApiListResponse<City>>(`${this.apiUrl}/cities`).pipe(
      map(response => response['hydra:member'])
    );
  }

}
