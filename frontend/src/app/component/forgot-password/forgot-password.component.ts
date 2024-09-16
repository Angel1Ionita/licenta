import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../../service/auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  forgotPasswordForm = new FormGroup({
    email: new FormControl('', Validators.required),
  });

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router,
  ) { }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      this.dialog.open(ForgotPasswordDialog);
      let requester = this.forgotPasswordForm.getRawValue().email!;
      this.authService.requestPasswordReset({ email: requester }).subscribe();
      this.router.navigateByUrl('');
    }
  }
}

@Component({
  selector: 'forgot-password-dialog',
  standalone: true,
  imports: [MatDialogContent, MatDialogTitle],
  templateUrl: './forgot-password-dialog.html',
})

class ForgotPasswordDialog {

}
