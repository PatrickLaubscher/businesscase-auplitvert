import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiListResponse, PaymentMode } from '../entities';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentModeService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  PaymentMode:PaymentMode[] = [];

  fetchAllPaymentMode (): Observable<PaymentMode[]> {
    return this.http.get<ApiListResponse<PaymentMode>>(`${this.apiUrl}/payment_modes`).pipe(
      map(response => response['hydra:member'])
    );
  }

}
