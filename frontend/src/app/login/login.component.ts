import { Component } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  hidePassword = true;

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  constructor(
    private authService: AuthService,
    private formBuilder: NonNullableFormBuilder,
  ) { }

  onSubmitLogin(): void {
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      this.authService.performLogin(this.loginForm.getRawValue().email, this.loginForm.getRawValue().password).subscribe();
      this.loginForm.reset();
    }
  }

  onSubmitLogout(): void {
    this.authService.performLogout().subscribe();
  }

}
