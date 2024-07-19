import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AppointmentService } from '../../../service/appointment.service';
import { AppointmentResponse, UserAppointmentResponse } from '../../../dto/appointmentDto';
import { Observable, map } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { TimePipe } from '../../../time.pipe';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';

@Component({
  selector: 'app-user-appointment-list',
  standalone: true,
  imports: [MatCardModule, AsyncPipe, DatePipe, TimePipe, AppointmentFormComponent],
  templateUrl: './user-appointment-list.component.html',
  styleUrl: './user-appointment-list.component.css'
})
export class UserAppointmentListComponent implements OnInit {

  userAppointments?: Observable<UserAppointmentResponse[]>;
  appointments?: Observable<AppointmentResponse[]>;

  constructor(
    private appointmentService: AppointmentService
  ) { }

  ngOnInit(): void {
    this.userAppointments=this.appointmentService.getUserAppointmentsByUser();
    this.appointments=this.appointmentService.getAppointmentsByUser();
  }


}
