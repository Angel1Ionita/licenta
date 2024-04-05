import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  user?: string;
  role?: string;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.user = JSON.parse(localStorage.getItem('email')!);
      this.role = JSON.parse(localStorage.getItem('role')!);
      console.log(this.user);
      console.log(this.role);
    }
  }

  onSubmitLogout(): void {
    this.authService.performLogout().subscribe();
    this.router.navigate(['/login'])
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('email');
      localStorage.removeItem('role');
    }
    //authenticated=false
  }

}
