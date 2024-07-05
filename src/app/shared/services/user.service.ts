import { inject, Injectable } from '@angular/core';
import { User } from '../entities';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  user:User|undefined;

  fetchOneUserByEmail (email: string): Observable<User|undefined> {
    return this.http.get<any>(`${this.apiUrl}/users?email=${email}`);
  }

  setUser(user: User): void {
    return localStorage.setItem('user', JSON.stringify(user));
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
