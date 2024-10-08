import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../service/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { error } from 'node:console';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatCardModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  hidePassword = true;
  user?: string | null;
  role?: string | null;
  wrongCredentials = false;

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  constructor(
    private authService: AuthService,
    private formBuilder: NonNullableFormBuilder,
    private router: Router,
  ) { }

  onSubmitLogin(): void {
    console.log(this.loginForm.value);
    this.wrongCredentials=false;
    if (this.loginForm.valid) {
      this.authService.performLogin(this.loginForm.getRawValue().email, this.loginForm.getRawValue().password)
        .subscribe(data => {
          localStorage.setItem('email', JSON.stringify(data.email));
          localStorage.setItem('role', JSON.stringify(data.role));
          this.loginForm.reset();
          this.router.navigate(['']);
        },
        error => {
          this.wrongCredentials=true;
          this.loginForm.reset();
        }
        );

    }
  }



}
