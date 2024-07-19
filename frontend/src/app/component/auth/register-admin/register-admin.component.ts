import { Component } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../service/auth.service';
import { UserAdminRegister } from '../../../dto/userAdminRegister';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-register-admin',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatCardModule, MatSelectModule],
  templateUrl: './register-admin.component.html',
  styleUrl: './register-admin.component.css'
})
export class RegisterAdminComponent {
  hidePassword = true;

  userAdminRegisterForm = this.formBuilder.group({
    first_name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern("^(\\S+)@(\\S+)$")]],
    password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
    role: ['',[Validators.required]],
  })

  constructor(
    private authService: AuthService,
    private formBuilder: NonNullableFormBuilder,
  ) { }

  onSubmitRegisterAdmin(): void {
    console.log(this.userAdminRegisterForm.value)
    if (this.userAdminRegisterForm.valid) {
      let user: UserAdminRegister = this.userAdminRegisterForm.getRawValue();
      this.authService.performRegisterAdmin(user).subscribe();
      this.userAdminRegisterForm.reset();
    }
  }
}
