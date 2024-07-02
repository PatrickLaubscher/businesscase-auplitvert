import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User, UserAuthen } from '../shared/entities';
import { AuthentificationService } from '../shared/services/authentification.service';
import { UserService } from '../shared/services/user.service';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  form: FormGroup = new FormGroup({
    email: new FormControl('', {validators: [Validators.required, Validators.email]}),
    password: new FormControl('', {validators: [Validators.required, Validators.minLength(4)]})
  });
  router = inject(Router);
  auth = inject(AuthentificationService);
  userService = inject(UserService);

  user: User|undefined;
  
  async onSubmit() {
    const userAuthen:UserAuthen = {
      username : this.form.value.email,
      password : this.form.value.password
    };
    this.form.reset();

    try {
      const response = await firstValueFrom(this.auth.login(userAuthen));
        if(response.token != null) {
          this.userService.fetchOneUserByEmail(userAuthen.username).subscribe(
            (data) => {this.user = data;
            localStorage.setItem('user', JSON.stringify(this.user));
            console.log(localStorage.getItem('user'));
          }
          ),
          (err:any) => {
            console.log(err.message);
          }
        };
      } catch(err:any) {
        console.log(err.message);
    }
  } 

}
