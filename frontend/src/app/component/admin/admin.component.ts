import { Component } from '@angular/core';
import { RegisterAdminComponent } from '../auth/register-admin/register-admin.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RegisterAdminComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {


}
