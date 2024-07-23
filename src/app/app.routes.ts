import { Routes } from '@angular/router';
import { HomepageComponent } from './public/homepage/homepage.component';
import { LoginComponent } from './public/login/login.component';
import { SubscriptionComponent } from './public/subscription/subscription.component';
import { PublicLayoutComponent } from './public/public-layout/public-layout.component';
import { PrivateLayoutComponent } from './private/private-layout/private-layout.component';
import { AdminDashboardComponent } from './private/admin/admin-dashboard/admin-dashboard.component';
import { authGuard } from './shared/auth.guard';
import { adminGuard } from './shared/admin.guard';
import { AdminHomeComponent } from './private/admin/admin-home/admin-home.component';
import { EmployeeListComponent } from './private/admin/employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './private/admin/employee-details/employee-details.component';
import { AddEmployeeComponent } from './private/admin/add-employee/add-employee.component';
import { OrderListComponent } from './private/admin/order-list/order-list.component';
import { PrestationListComponent } from './private/admin/prestation-list/prestation-list.component';
import { ProductListComponent } from './private/admin/product-list/product-list.component';
import { OrderLineListComponent } from './private/admin/order-line-list/order-line-list.component';
import { OrderProcessLandingPageComponent } from './public/order-process/order-process-landing-page/order-process-landing-page.component';



export const routes: Routes = [
    {path: '', component: PublicLayoutComponent,
        children: [
            {path: '', component: HomepageComponent},
            {path: 'login', component: LoginComponent},
            {path: 'inscription', component: SubscriptionComponent},
            {path: 'faire-un-dépot', component:OrderProcessLandingPageComponent}
        ]
    },
    {path: 'espace-prive', component: PrivateLayoutComponent, canActivate:[authGuard],
        children: [
            {path: 'admin', component: AdminDashboardComponent, canActivate:[adminGuard], 
                children: [
                    {path: '', component: AdminHomeComponent},
                    {path: 'employes', component: EmployeeListComponent},
                    {path: 'employee/:id', component: EmployeeDetailsComponent},
                    {path: 'ajouter-employe', component: AddEmployeeComponent},
                    {path: 'commandes', component: OrderListComponent},
                    {path: 'ligne-de-commandes', component: OrderLineListComponent},
                    {path: 'prestations-et-catégories', component: PrestationListComponent},
                    {path: 'articles', component: ProductListComponent}
                ]
            },
        ]
    },
    {path: '**', component: HomepageComponent}
];
