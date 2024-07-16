import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ApiListResponse } from '../entities';

@Injectable({
  providedIn: 'root'
})
export class EntityService<T> {

  constructor(    
    protected http: HttpClient,
    @Inject('apiUrl') protected entityBaseUri: string
  ) {}

  fetchAll(): Observable<ApiListResponse<T>> {
    return this.http.get<ApiListResponse<T>>(
      `${environment.apiUrl}${this.entityBaseUri}`);
  }



}
