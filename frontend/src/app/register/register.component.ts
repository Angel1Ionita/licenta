import { Component } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UserRegister } from '../dto/userRegister';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatCardModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  
  hidePassword = true;

  userRegisterForm = this.formBuilder.group({
    first_name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern("^(\\S+)@(\\S+)$")]],
    password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
  })

  constructor(
    private authService: AuthService,
    private formBuilder: NonNullableFormBuilder,
    private router: Router,
  ) { }

  onSubmitRegister(): void {
    console.log(this.userRegisterForm.value);
    if (this.userRegisterForm.valid) {
      let user: UserRegister = this.userRegisterForm.getRawValue();
      this.authService.performRegister(user).subscribe();
      this.userRegisterForm.reset();
      this.router.navigate(['/login']);
    }
  }

}
