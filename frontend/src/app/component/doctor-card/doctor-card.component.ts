import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../service/doctor.service';
import { Hospital, Medic, Specialization } from '../../dto/medic';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NavigationComponent } from '../navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { Observable } from 'rxjs';
import { SpecializationService } from '../../service/specialization.service';
import { HospitalService } from '../../service/hospital.service';
import { StorageService } from '../../service/storage.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-doctor-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, NavigationComponent, RouterModule,
    MatFormFieldModule, MatSelectModule, MatOptionModule, AsyncPipe, ReactiveFormsModule],
  templateUrl: './doctor-card.component.html',
  styleUrls: ['./doctor-card.component.css']
})
export class DoctorCardComponent implements OnInit {
  medics?: Medic[];
  hospitals?: Hospital[];

  specializations$?: Observable<Specialization[]>;

  selectedSpecialization?: string;
  selectedHospital?: Hospital;
  selectedCity?: string;


  filteredMedics?: Medic[];
  hospitalOptions?: Hospital[];

  isUser!: boolean;

  constructor(
    private doctorService: DoctorService,
    private specializationService: SpecializationService,
    private hospitalService: HospitalService,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.isUser = this.storageService.getUserRole() == 'USER';
    this.doctorService.getDoctors().subscribe(data => {
      this.medics = data;
      this.filteredMedics = this.medics;
      console.log(this.filteredMedics)
    });

    this.hospitalService.getHospitals().subscribe(data => {
      this.hospitals = data;
      this.hospitalOptions = this.hospitals;
    }
    );
    this.specializations$ = this.specializationService.getSpecializations();



  }

  getImage(image: string | null): string {
    return image ? `http://localhost:8080/images/${image}.webp` : 'assets/images/default.webp';
  }

  onSelectChange($event: MatSelectChange) {
    this.filteredMedics = this.medics?.filter(medic =>
      (!this.selectedCity || medic.hospital?.city == this.selectedCity) &&
      (!this.selectedHospital || medic.hospital?.name == this.selectedHospital.name) &&
      (!this.selectedSpecialization || medic.specialization?.name == this.selectedSpecialization)
    );
    console.log('DoctorCardComponent#onSelectChange called !');
    console.log('Selected value is ', $event.value);
  }

  onHospitalChange($event: MatSelectChange) {
    let hospital = $event.value as Hospital;
    if (hospital) {
      this.selectedCity = hospital.city;
    }
    console.log('DoctorCardComponent#onHospitalChange called !');
    this.onSelectChange($event);
  }


  onCityChange($event: MatSelectChange) {
    let city = $event.value;
    if(this.selectedHospital?.city != city) {
      this.selectedHospital = undefined;
    }
    this.hospitalOptions = city ? this.hospitals?.filter(hospital => hospital.city == city) : this.hospitals;
    console.log('DoctorCardComponent#onCityChange called !');
    this.onSelectChange($event);
  }


}
