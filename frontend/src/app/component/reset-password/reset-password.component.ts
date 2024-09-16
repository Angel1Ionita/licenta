import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { error } from 'console';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [MatFormFieldModule, MatCardModule, MatInputModule, MatIconModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {

  hidePassword = true;
  showError = false;
  passwordChangeForm = new FormGroup({
    newPassword: new FormControl('')
  })

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  onSubmit() {
    this.showError = false;
    let tokenString = this.route.snapshot.queryParamMap.get('token');
    console.log(tokenString);
    let passwordReset = {
      token: tokenString!,
      new_password: this.passwordChangeForm.getRawValue().newPassword!
    };
    this.authService.finishPasswordReset(passwordReset).subscribe({
      complete: () => this.router.navigateByUrl('/login'),
      error: (error1) => { this.showError = true; console.log(error1) }
    }
    );
  }


}
