import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttributionPrestationCategoryService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private headers = new HttpHeaders({
    'Content-Type': 'application/ld+json'
  });



  addNewAttributionCategoryForPrestation(idPrestation:number, idCategory:number) {
    return this.http.post(`${this.apiUrl}/attribution_prestation_categories`, 
      {
        Prestation: [`/api/prestations/${idPrestation}`],
        prestation: [`/api/prestations/${idPrestation}`],
        Category: [`/api/categories/${idCategory}`],
        category: [`/api/categories/${idCategory}`]
      },{'headers': this.headers}
      ).pipe(
      catchError((error) => {
        console.error('Erreur lors de la création de de la prestation', error);
        return throwError(() => error);
      })
    )
  }

  deleteAttributionCategoryForPrestation(id:number) {
    return this.http.delete(`${this.apiUrl}/attribution_prestation_categories/${id}`).pipe(
      catchError((error) => {
        console.error('Erreur lors de la suppression de l\'attribution', error);
        return throwError(() => error);
      })
    )
  }

}
