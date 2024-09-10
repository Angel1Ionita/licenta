import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../service/auth.service';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [MatFormFieldModule, MatCardModule, MatInputModule, MatIconModule,MatButtonModule , ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {

  hidePassword = true;
  passwordChangeForm = new FormGroup({
    newPassword: new FormControl('')
  })

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  onSubmit() {
    let tokenString=this.route.snapshot.queryParamMap.get('token');
    console.log(tokenString);
    let passwordReset={
      token: tokenString!, 
      new_password: this.passwordChangeForm.getRawValue().newPassword!
    }; 
    this.authService.finishPasswordReset(passwordReset).subscribe();
  }
  

}
