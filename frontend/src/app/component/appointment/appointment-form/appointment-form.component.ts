import { Component, inject, Input, OnInit } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormBuilder, NonNullableFormBuilder, FormControl, ReactiveFormsModule, Validators, FormGroup, FormGroupDirective } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { SpecializationService } from '../../../service/specialization.service';
import { AppointmentService } from '../../../service/appointment.service';
import { Hospital, Medic, Product, Specialization } from '../../../dto/medic';
import { HospitalService } from '../../../service/hospital.service';
import { NavigationComponent } from '../../navigation/navigation.component';
import { AsyncPipe } from '@angular/common';
import { Observable, debounceTime, map, of, startWith } from 'rxjs';
import { DoctorService } from '../../../service/doctor.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule,
    MatIconModule, MatButtonModule, MatCardModule,
    MatSelectModule, MatDatepickerModule, MatAutocompleteModule, NavigationComponent, AsyncPipe, MatSnackBarModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.css'
})
export class AppointmentFormComponent implements OnInit {

  @Input({ required: true }) isStaff!: boolean;
  _snackBar = inject(MatSnackBar);

  openSnackBar() {
    this._snackBar.open('Programare realizata!', 'Ok');
  }

  userAppointmentForm = this.formBuilder.group({
    specialization: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    product: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    hospital: [''],
    medic: ['', [Validators.required]],
    date: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    time: [''],
    description: [''],
  })
  appointmentForm = this.nonNullableFormBuilder.group({
    userId: ['', [Validators.required]],
    specialization: ['', [Validators.required]],
    product: ['', [Validators.required]],
    hospital: ['', [Validators.required]],
    medic: ['', [Validators.required]],
    date: ['', [Validators.required]],
    time: ['', [Validators.required]],
    description: [''],
  })

  specializations?: Specialization[];
  hospitals$?: Observable<Hospital[]>;
  products?: {
    specialization_name: string;
    id: number;
    name: string;
  }[];


  medics$?: Observable<Medic[]>;

  minDate?: Date;
  maxDate?: Date;

  filteredMedics$?: Observable<Medic[]>;
  medicOptions: Medic[] = [];
  //medicOptionsMap: Map<number,string>;

  constructor(
    private formBuilder: FormBuilder,
    private nonNullableFormBuilder: NonNullableFormBuilder,
    private specializationService: SpecializationService,
    private hospitalService: HospitalService,
    private appointmentService: AppointmentService,
    private doctorService: DoctorService,
    private activatedRoute: ActivatedRoute,
  ) { }

  onSubmitAppointment(formDirective: FormGroupDirective) {
    if (!this.isStaff) {
      if (this.userAppointmentForm.valid) {
        this.processForm(this.userAppointmentForm, formDirective);
      }
    }
    else if (this.appointmentForm.valid) {
      this.processForm(this.appointmentForm, formDirective);
    }
  }

  processForm(form: FormGroup, formDirective: FormGroupDirective) {
    let appointment = form.getRawValue();
    appointment.date = this.formatDate(appointment.date as unknown as Date);
    if (this.isStaff) { this.appointmentService.createAppointment(appointment).subscribe(); }
    else { this.appointmentService.createUserAppointment(appointment).subscribe(); }

    formDirective.resetForm();
    form.reset();
    this.openSnackBar();
  }

  ngOnInit(): void {
    this.medics$ = this.doctorService.getDoctors();
    this.medics$.subscribe(data => this.medicOptions = data);
    this.specializationService.getSpecializations().subscribe(data => {
      this.specializations = data; 
      this.products = this.specializations?.flatMap(specialization =>
        specialization.products.map(product => ({
          specialization_name: specialization.name,
          id: product.id,
          name: product.name
        }))
      );
    });
    this.hospitals$ = this.hospitalService.getHospitals();

    this.minDate = this.addDays(new Date(), 1);
    this.maxDate = this.addDays(new Date(), 14);

    this.filteredMedics$ = this.userAppointmentForm.get('medic')!.valueChanges.pipe(
      startWith(''),
      debounceTime(200),
      map(value => {
        if (!value) {
          console.log(value);
          return this._filter('');
        }
        console.log(value + '!')
        const filter = Number.isNaN(+value) ? value : this.displayMedicOptions(value);
        return this._filter(filter);
      })
    );

    const medicId = this.activatedRoute.snapshot.queryParamMap.get('medic');
    if (medicId) {
      this.doctorService.getDoctorById(medicId).subscribe(data => {
        if (data) { this.userAppointmentForm.controls.medic.setValue(medicId); }
      });
    }


  }

  addDays(date: Date, days: number) {
    date.setDate(date.getDate() + days);
    return date;
  }

  formatDate(date: Date) {
    return date.toISOString().slice(0, 10);
  }


  _filter(value: string): Medic[] {
    const filterValue = value.toLowerCase();
    return this.medicOptions.filter(option => `${option.first_name} ${option.last_name}`.toLowerCase().includes(filterValue));
  }


  displayMedicOptions = (id: any) => {
    for (const option of this.medicOptions) {
      if (option.id == id) {
        return option.first_name + " " + option.last_name;
      }
    }
    return '';
  }

}
