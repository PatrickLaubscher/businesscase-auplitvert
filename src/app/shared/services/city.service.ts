import { inject, Injectable } from '@angular/core';
import { City } from '../entities';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from '../../app.config';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private http = inject(HttpClient);

  cities:City[] = [];

  fetchAllCities (): Observable<City[]> {
    return this.http.get<any>(`${apiUrl}/cities`).pipe(
      map((response => {
        if (response['hydra:member'].length > 0) {
          return response["hydra:member"].map((city: any) => ({
            id: city.id.toString(), 
            name: city.name,
            cp: city.zip_code
          })) as City[]
          } else {
            throw new Error('Villes non trouvées'); 
          } 
        }) 
      )
    );
  }


}
