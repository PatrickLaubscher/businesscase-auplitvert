import { inject, Injectable } from '@angular/core';
import { Civility } from '../entities';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from '../../app.config';

@Injectable({
  providedIn: 'root'
})
export class CivilityService {

  private http = inject(HttpClient);

  civilities:Civility[] = [];

  fetchAllCivilities (): Observable<Civility[]> {
    return this.http.get<any>(`${apiUrl}/civilities`).pipe(
      map((response => {
        if (response['hydra:member'].length > 0) {
          return response["hydra:member"].map((civility: any) => ({
            id: civility.id.toString(), 
            name: civility.name,
            abreviation: civility.abreviation
          })) as Civility[]
          } else {
            throw new Error('Liste Civilitées non trouvé'); 
          } 
        }) 
      )
    );
  }


}