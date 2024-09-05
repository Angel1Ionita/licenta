import { Routes } from '@angular/router';
import { LoginComponent } from './component/auth/login/login.component';
import { RegisterComponent } from './component/auth/register/register.component';
import { HomeComponent } from './component/home/home.component';
import { AdminComponent } from './component/admin/admin.component';
import { adminGuard } from './admin.guard';
import { DoctorCardComponent } from './component/doctor-card/doctor-card.component';
import { ContactComponent } from './component/contact/contact.component';
import { MainComponent } from './component/main/main.component';
import { AppointmentListComponent as AppointmentListComponent } from './component/appointment/staff-appointment-list/appointment-list.component';
import { MedicComponent } from './component/medic/medic.component';
import { PricesComponent } from './component/prices/prices.component';
import { ArticleComponent } from './component/article/article.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: '', component: MainComponent, children: [
            { path: '', component: HomeComponent },
            { path: 'medics', component: DoctorCardComponent },
            { path: 'medics/:id', component: MedicComponent },
            { path: 'contact', component: ContactComponent },
            { path: 'appointments', component: AppointmentListComponent },
            { path: 'prices', component: PricesComponent },
            { path: 'articole/:id', component: ArticleComponent }
        ]
    },

    { path: 'admin', component: AdminComponent, canActivate: [adminGuard] },

    { path: '**', pathMatch: "full", redirectTo: '' },
];
