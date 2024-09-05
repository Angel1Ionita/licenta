import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../service/doctor.service';
import { Hospital, Medic, Specialization } from '../../dto/medic';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NavigationComponent } from '../navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { Observable } from 'rxjs';
import { SpecializationService } from '../../service/specialization.service';
import { HospitalService } from '../../service/hospital.service';
import { StorageService } from '../../service/storage.service';

@Component({
  selector: 'app-doctor-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, NavigationComponent, RouterModule, MatFormFieldModule, MatSelectModule, MatOptionModule, AsyncPipe],
  templateUrl: './doctor-card.component.html',
  styleUrls: ['./doctor-card.component.css'] // Note the plural "styleUrls"
})
export class DoctorCardComponent implements OnInit {
  medics?: Medic[];

  specializations$?: Observable<Specialization[]>
  hospitals$?: Observable<Hospital[]>

  selectedSpecialization?: string;
  selectedHospital?: string;
  selectedCity?: string;

  filteredMedics?: Medic[];

  isUser!: boolean;

  constructor(
    private doctorService: DoctorService,
    private specializationService: SpecializationService,
    private hospitalService: HospitalService,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.isUser=this.storageService.getUserRole() == 'USER';
    this.doctorService.getDoctors().subscribe(data => {this.medics = data;
      this.filteredMedics=this.medics;
      console.log(this.filteredMedics)
    });

    this.hospitals$=this.hospitalService.getHospitals();
    this.specializations$=this.specializationService.getSpecializations();

  
    
  }

  getImage(image: string | null): string {
    return image ? `http://localhost:8080/images/${image}.webp` : 'assets/images/default.webp';
  }

  onSelectChange() {
    this.filteredMedics=this.medics?.filter(medic =>
      (!this.selectedCity || medic.hospital?.city==this.selectedCity) &&
      (!this.selectedHospital || medic.hospital?.name == this.selectedHospital) &&
      (!this.selectedSpecialization || medic.specialization?.name == this.selectedSpecialization)
    );
  }
}
