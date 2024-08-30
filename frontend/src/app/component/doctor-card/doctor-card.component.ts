import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../service/doctor.service';
import { Medic } from '../../dto/medic';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NavigationComponent } from '../navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, NavigationComponent, RouterModule, CommonModule],
  templateUrl: './doctor-card.component.html',
  styleUrls: ['./doctor-card.component.css'] // Note the plural "styleUrls"
})
export class DoctorCardComponent implements OnInit {
  medics?: Medic[];

  constructor(private doctorService: DoctorService) { }

  ngOnInit(): void {
    this.doctorService.getDoctors().subscribe(data => this.medics = data);
  }

  getImage(image: string | null): string {
    return image ? `http://localhost:8080/images/${image}.webp` : 'assets/images/default.webp';
  }

  onHoverCard(event: Event): void {
    const target = event.currentTarget as HTMLElement;
    target.style.transform = 'scale(1.05)';
    target.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)';
  }

  onLeaveCard(event: Event): void {
    const target = event.currentTarget as HTMLElement;
    target.style.transform = 'scale(1)';
    target.style.boxShadow = 'none';
  }

  onHoverButton(event: Event): void {
    const target = event.currentTarget as HTMLElement;
    target.style.transform = 'scale(1.1)';
  }

  onLeaveButton(event: Event): void {
    const target = event.currentTarget as HTMLElement;
    target.style.transform = 'scale(1)';
  }

  trackByMedics(index: number, medic: Medic): number {
    return medic.id; // Assuming 'id' is a unique identifier in Medic
  }
}
