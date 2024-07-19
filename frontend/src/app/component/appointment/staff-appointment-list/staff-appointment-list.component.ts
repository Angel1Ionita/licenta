import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppointmentResponse, UserAppointmentResponse } from '../../../dto/appointmentDto';
import { AppointmentService } from '../../../service/appointment.service';
import { MatCardModule } from '@angular/material/card';
import { AsyncPipe, DatePipe } from '@angular/common';
import { TimePipe } from '../../../time.pipe';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-staff-appointment-list',
  standalone: true,
  imports: [MatCardModule, AsyncPipe, DatePipe, TimePipe, AppointmentFormComponent],
  templateUrl: './staff-appointment-list.component.html',
  styleUrl: './staff-appointment-list.component.css'
})
export class StaffAppointmentListComponent implements OnInit {
  userAppointments?: Observable<UserAppointmentResponse[]>;
  appointments?: Observable<AppointmentResponse[]>;

  constructor(
    private appointmentService: AppointmentService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.userAppointments = this.appointmentService.getAllUserAppointments();
    this.appointments = this.appointmentService.getAllAppointments();
  }

  openDialog(appointment: UserAppointmentResponse) {
    this.dialog.open(StaffAppointmentListDialog, {
      data: appointment,
    });
  }
}

@Component({
  selector: 'staff-appointment-list-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, DatePipe, TimePipe],
  templateUrl: './staff-appointment-list-dialog.html',
})
export class StaffAppointmentListDialog {

  constructor(
    public dialogRef: MatDialogRef<StaffAppointmentListDialog>,
    @Inject(MAT_DIALOG_DATA) public appointment: UserAppointmentResponse,
  ) {}

  onCloseClick() {
    this.dialogRef.close();
  }
}
