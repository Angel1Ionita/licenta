import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { StorageService } from '../storage.service';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterModule, MatDividerModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
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
  }

  onSubmitLogout(): void {
    this.authService.performLogout().subscribe();
    this.router.navigate(['/login']);
    this.storage.removeItem('email');
    this.storage.removeItem('role');
  }
}
