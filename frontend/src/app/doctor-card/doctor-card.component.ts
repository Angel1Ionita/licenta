import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { Doctor } from '../dto/doctor';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-doctor-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, NavigationComponent],
  templateUrl: './doctor-card.component.html',
  styleUrl: './doctor-card.component.css'
})
export class DoctorCardComponent implements OnInit {
  doctors?: Doctor[];

  constructor(
    private doctorService: DoctorService,
  ) { }

  ngOnInit(): void {
    // this.doctorService.getDoctors().subscribe(data => this.doctors = data);
    this.doctors = [
      { "id": 1, "first_name": "First1", "last_name": "Last1", "title": "Director", "image": "http://localhost:8080/images/1.webp" },
      { "id": 2, "first_name": "First2", "last_name": "Last2", "title": "Director", "image": "http://localhost:8080/images/2.webp" },
      { "id": 3, "first_name": "First3", "last_name": "Last3", "title": "Director", "image": "http://localhost:8080/images/3.webp" },
      { "id": 4, "first_name": "First4", "last_name": "Last4", "title": "Director", "image": "http://localhost:8080/images/4.webp" },
      { "id": 5, "first_name": "First5", "last_name": "Last5", "title": "Director", "image": "http://localhost:8080/images/5.webp" },
      { "id": 6, "first_name": "First6", "last_name": "Last6", "title": "Director", "image": "http://localhost:8080/images/6.webp" }
    ]

  }


}
