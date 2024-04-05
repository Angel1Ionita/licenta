import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { isPlatformBrowser } from '@angular/common';
import { StorageService } from '../storage.service';

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
    private storage: StorageService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {

    this.user = JSON.parse(this.storage.getItem('email')!);
    this.role = JSON.parse(this.storage.getItem('role')!);
    console.log(this.user);
    console.log(this.role);

  }

  onSubmitLogout(): void {
    this.authService.performLogout().subscribe();
    this.router.navigate(['/login'])
    this.storage.removeItem('email');
    this.storage.removeItem('role');

  }

}
