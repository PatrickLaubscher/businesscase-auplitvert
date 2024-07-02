import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { SubscriptionComponent } from './subscription/subscription.component';




export const routes: Routes = [
    {path: '', component: HomepageComponent},
    {path: 'login', component: LoginComponent},
    {path: 'subscription', component: SubscriptionComponent},
    {path: '**', component: HomepageComponent}
];
