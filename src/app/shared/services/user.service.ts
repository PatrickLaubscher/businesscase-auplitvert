import { inject, Injectable } from '@angular/core';
import { Employee, patchAdmin, patchCustomer, patchEmployee, User } from '../entities';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  user:User|undefined;

  fetchUserLogged (): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/me`);
  }

  fetchOneUserByEmail (email: string): Observable<User|undefined> {
    return this.http.get<any>(`${this.apiUrl}/users?email=${email}`);
  }

  fetchOneUserEmployeeById (id: string): Observable<Employee|undefined> {
    return this.http.get<Employee>(`${this.apiUrl}/users/${id}`);
  }


  updateUserCustomer (id:string, customer:patchCustomer): Observable<patchCustomer|undefined> {
    return this.http.patch<patchCustomer>(`${this.apiUrl}/users/${id}`, customer,{
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

  updateUserEmployee (id:string, employee:patchEmployee): Observable<patchEmployee|undefined> {
    return this.http.patch<patchEmployee>(`${this.apiUrl}/users/${id}`, employee,{
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

  updateUserAdmin (id:string, admin:patchAdmin): Observable<patchAdmin|undefined> {
    return this.http.patch<patchAdmin>(`${this.apiUrl}/users/${id}`, admin,{
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

  setUser(user: User): void {
    return localStorage.setItem('user', JSON.stringify([user]));
  }

  getUser(): User | null {
    const userStr = localStorage.getItem('user');
    const users = userStr ? JSON.parse(userStr) : null;
    return users ? users[0] : null;
  }

  getRoles(): string[] | null {
    const user = this.getUser();
    return user ? user.roles : null;
  }


}
