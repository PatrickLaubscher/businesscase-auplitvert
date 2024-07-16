import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ApiListResponse, Category, NewCategory } from '../entities';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  fetchAllCategory (): Observable<Category[]> {
    return this.http.get<ApiListResponse<Category>>(`${this.apiUrl}/categories`).pipe(
      map(response => response['hydra:member'])
    );
  }

  fetchOneCategory (id:number|null): Observable<Category> {
    let idParam = id?.toString();
    return this.http.get<Category>(`${this.apiUrl}/categories/${idParam}`);
  }

  updateCategory (id:number, category:Category): Observable<Category> {
    let idParam = id?.toString();
    return this.http.patch<Category>(`${this.apiUrl}/categories/${idParam}`, category,{
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

  addNewCategory(newCategory: NewCategory): Observable<NewCategory> {
    return this.http.post<NewCategory>(`${this.apiUrl}/categories`, newCategory).pipe(
      catchError((error) => {
        console.error('Erreur lors de la création de de la catégorie', error);
        return throwError(() => error);
      })
    )
  }

  deleteCategory(id:number) {
    let idParam = id?.toString();
    return this.http.delete(`${this.apiUrl}/categories/${idParam}`).pipe(
      catchError((error) => {
        console.error('Erreur lors de la suppression de la catégorie', error);
        return throwError(() => error);
      })
    );
  }

}
