import { inject, Injectable } from '@angular/core';
import { User } from '../entities';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from '../../app.config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);

  user:User|undefined;

  fetchOneUserByEmail (email: string): Observable<User|undefined> {
    return this.http.get<any>(`${apiUrl}/users?email=${email}`).pipe(
      map((response => {
        if (response && response['hydra:member'] && response['hydra:member'].length > 0) {
          const user = response["hydra:member"][0];
          return {
            id: user.id,
            roles: user.roles,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname
          } as User;
          } return undefined;
        }) 
      )
    );
  }

}
