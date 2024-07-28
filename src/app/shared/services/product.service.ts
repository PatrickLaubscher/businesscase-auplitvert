import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ApiListResponse, NewProduct, PatchProduct, PrestationWithAttribution, Product } from '../entities';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  fetchAllProduct (): Observable<Product[]> {
    return this.http.get<ApiListResponse<Product>>(`${this.apiUrl}/products`).pipe(
      map(response => response['hydra:member'])
    );
  }

  fetchOneProduct (id:  number|null): Observable<Product> {
    let idParam = id?.toString();
    return this.http.get<Product>(`${this.apiUrl}/products/${idParam}`);
  }

  updateProduct (id:number, product:PatchProduct): Observable<PatchProduct> {
    let idParam = id?.toString();
    return this.http.patch<PatchProduct>(`${this.apiUrl}/products/${idParam}`, product,{
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

  addNewProduct (newProduct: NewProduct): Observable<NewProduct> {
    return this.http.post<NewProduct>(`${this.apiUrl}/products`, newProduct).pipe(
      catchError((error) => {
        console.error('Erreur lors de la création de de l\'article', error);
        return throwError(() => error);
      })
    )
  }

  deleteProduct (id:number) {
    let idParam = id?.toString();
    return this.http.delete(`${this.apiUrl}/products/${idParam}`).pipe(
      catchError((error) => {
        console.error('Erreur lors de la suppression de l\'article', error);
        return throwError(() => error);
      })
    );
  }

}
