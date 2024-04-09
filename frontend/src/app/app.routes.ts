import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { adminGuard } from './admin.guard';
import { DoctorCardComponent } from './doctor-card/doctor-card.component';
import { ContactComponent } from './contact/contact.component';
import { BlogComponent } from './blog/blog.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'medics', component: DoctorCardComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'blog', component: BlogComponent },
    { path: 'admin', component: AdminComponent, canActivate: [adminGuard] },
    { path: '', component: HomeComponent },
    { path: '**', pathMatch: "full", redirectTo: '' },  
];
