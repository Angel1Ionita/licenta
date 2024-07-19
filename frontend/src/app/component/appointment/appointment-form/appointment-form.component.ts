import { Component, Input, OnInit } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, NonNullableFormBuilder, FormControl, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { SpecializationService } from '../../../service/specialization.service';
import { AppointmentService } from '../../../service/appointment.service';
import { Hospital, Medic } from '../../../dto/medic';
import { HospitalService } from '../../../service/hospital.service';
import { NavigationComponent } from '../../navigation/navigation.component';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { DoctorService } from '../../../service/doctor.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule,
    MatIconModule, MatButtonModule, MatCardModule,
    MatSelectModule, MatDatepickerModule, NavigationComponent, AsyncPipe],
  providers: [provideNativeDateAdapter()],
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.css'
})
export class AppointmentFormComponent implements OnInit {

  @Input({ required: true }) isStaff!: boolean;

  userAppointmentForm = this.formBuilder.group({
    specialization: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    hospital: [''],
    medic: [''],
    date: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    time: [''],
    description: [''],
  })
  appointmentForm = this.nonNullableFormBuilder.group({
    userId: ['', [Validators.required]],
    specialization: ['', [Validators.required]],
    hospital: ['', [Validators.required]],
    medic: ['', [Validators.required]],
    date: ['', [Validators.required]],
    time: ['', [Validators.required]],
    description: [''],
  })

  specializations?: Observable<{ id: number, name: string }[]>;
  hospitals?: Observable<Hospital[]>;
  medics?: Observable<Medic[]>;

  minDate?: Date;
  maxDate?: Date;

  constructor(
    private formBuilder: FormBuilder,
    private nonNullableFormBuilder: NonNullableFormBuilder,
    private specializationService: SpecializationService,
    private hospitalService: HospitalService,
    private appointmentService: AppointmentService,
    private doctorService: DoctorService,
    private activatedRoute: ActivatedRoute,
  ) { }

  onSubmitAppointment() {
    if (!this.isStaff) {
      if (this.userAppointmentForm.valid) {
        this.processForm(this.userAppointmentForm);
      }
    }
    else if (this.appointmentForm.valid) {
      this.processForm(this.appointmentForm);
    }
  }

  processForm(form: FormGroup) {
    let appointment = form.getRawValue();
    appointment.date = this.formatDate(appointment.date as unknown as Date);
    if (this.isStaff) { this.appointmentService.createAppointment(appointment).subscribe(); }
    else { this.appointmentService.createUserAppointment(appointment).subscribe(); }

    form.reset();
  }

  ngOnInit(): void {
    this.minDate = this.addDays(new Date(), 1);
    this.maxDate = this.addDays(new Date(), 14);
    this.specializations = this.specializationService.getSpecializations();
    this.hospitals = this.hospitalService.getHospitals();

    if (this.isStaff) { this.medics = this.doctorService.getDoctors(); }
    else {
      const medicId = this.activatedRoute.snapshot.queryParamMap.get('medic');
      if (medicId) {
        this.doctorService.getDoctorById(medicId).subscribe(data => {
          if (data) { this.userAppointmentForm.controls.medic.setValue(`${data.title} ${data.first_name} ${data.last_name}`); }
        });
      }
    }

  }

  addDays(date: Date, days: number) {
    date.setDate(date.getDate() + days);
    return date;
  }

  formatDate(date: Date) {
    return date.toISOString().slice(0, 10);
  }

}
