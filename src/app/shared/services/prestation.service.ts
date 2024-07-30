import { inject, Injectable } from '@angular/core';
import { ApiListResponse, NewPrestation, PatchPrestation, Prestation, PrestationWithAttribution } from '../entities';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PrestationService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;


  fetchAllPrestation (): Observable<Prestation[]> {
    return this.http.get<ApiListResponse<Prestation>>(`${this.apiUrl}/prestations`).pipe(
      map(response => response['hydra:member'])
    );
  }

  fetchAllPrestationWithAttribution (): Observable<PrestationWithAttribution[]> {
    return this.http.get<ApiListResponse<PrestationWithAttribution>>(`${this.apiUrl}/prestations`).pipe(
      map(response => response['hydra:member'])
    );
  }
  

  fetchOnePrestation (id:number|null): Observable<Prestation> {
    let idParam = id?.toString();
    return this.http.get<Prestation>(`${this.apiUrl}/prestations/${idParam}`);
  }

  fetchOnePrestationWithAttribution (id:number|null): Observable<PrestationWithAttribution> {
    let idParam = id?.toString();
    return this.http.get<PrestationWithAttribution>(`${this.apiUrl}/prestations/${idParam}`);
  }


  updatePrestation (id:number, prestation:PatchPrestation): Observable<PatchPrestation> {
    let idParam = id?.toString();
    return this.http.patch<PatchPrestation>(`${this.apiUrl}/prestations/${idParam}`, prestation,{
      headers: {
        'Content-Type': 'application/merge-patch+json'
      }
    }).pipe(
      catchError((error) => {
        console.error('Erreur lors de la modification des informations', error);
        return throwError(() => error);
      })
    )
  }

  addNewPrestation(newPrestation: NewPrestation): Observable<NewPrestation> {
    return this.http.post<NewPrestation>(`${this.apiUrl}/prestations`, newPrestation).pipe(
      catchError((error) => {
        console.error('Erreur lors de la création de de la prestation', error);
        return throwError(() => error);
      })
    )
  }

  deletePrestation(id:number) {
    let idParam = id?.toString();
    return this.http.delete(`${this.apiUrl}/prestations/${idParam}`).pipe(
      catchError((error) => {
        console.error('Erreur lors de la suppression de la prestation', error);
        return throwError(() => error);
      })
    );
  }


}

