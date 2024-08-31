import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AppointmentDto, AppointmentResponse, UserAppointmentResponse } from '../../../dto/appointmentDto';
import { AppointmentService } from '../../../service/appointment.service';
import { MatCardModule } from '@angular/material/card';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { TimePipe } from '../../../time.pipe';
import { AppointmentFormComponent } from '../../appointment/appointment-form/appointment-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { jsPDF } from 'jspdf';
import { Router } from '@angular/router';
import { StorageService } from '../../../service/storage.service';

@Component({
  selector: 'app-staff-appointment-list',
  standalone: true,
  imports: [MatCardModule, AsyncPipe, DatePipe, TimePipe, AppointmentFormComponent, CommonModule],
  templateUrl: './staff-appointment-list.component.html',
  styleUrl: './staff-appointment-list.component.css'
})
export class StaffAppointmentListComponent implements OnInit, OnDestroy {
  userAppointments?: UserAppointmentResponse[];
  appointments?: AppointmentResponse[];

  userAppointmentsSubscription!: Subscription;
  appointmentsSubscription!: Subscription;

  constructor(
    private appointmentService: AppointmentService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  openUserAppointmentDialog(appointment: UserAppointmentResponse) {
    const dialogRef = this.dialog.open(UserAppointmentDialog, {
      data: appointment,
    });

    dialogRef.afterClosed().subscribe(result =>
      console.log('set the form'));
    // this.appointments.
  }

  openAppointmentDialog(appointment: AppointmentResponse) {
    const dialogRef = this.dialog.open(AppointmentDialog, {
      data: appointment,
    });

    dialogRef.afterClosed().subscribe(result =>
      console.log('set the form'));
    // this.appointments.
  }

  subscribe(): void {
    this.userAppointmentsSubscription = this.appointmentService.getUserAppointmentsByMedic().subscribe(data => this.userAppointments = data);
    this.appointmentsSubscription = this.appointmentService.getAppointmentsByMedic().subscribe(data => this.appointments = data);
  }

  unsubscribe(): void {
    this.userAppointmentsSubscription.unsubscribe();
    this.appointmentsSubscription.unsubscribe();
  }

}


@Component({
  selector: 'user-appointment-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, DatePipe, TimePipe],
  templateUrl: './user-appointment-dialog.html',
})
export class UserAppointmentDialog {

  constructor(
    private appointmentService: AppointmentService,
    private storageSerice: StorageService,
    public dialogRef: MatDialogRef<UserAppointmentDialog>,
    @Inject(MAT_DIALOG_DATA) public appointment: UserAppointmentResponse,
  ) { }

  onCloseClick() {
    this.dialogRef.close();
  }

  onConfirmClick() {
    console.log('#onConfirmClick called!')
    this.dialogRef.close();
    const newAppointment: AppointmentDto = {
      userId: this.appointment.user.id.toString(),
      specialization: this.appointment.specialization.id.toString(),
      hospital: this.appointment.hospital.id.toString(),
      medic: this.appointment.medic.id.toString(),
      date: this.appointment.date as string,
      time: this.appointment.time,
      description: this.appointment.description
    }
    console.log(newAppointment);
    this.appointmentService.deleteUserAppointment(this.appointment.id).subscribe(() => console.log('User Appointment should be deleted'));
    this.appointmentService.createAppointment(newAppointment).subscribe(() => console.log('Appointment should be created'));
    this.storageSerice.refreshComponent();

  }

  onDeleteClick() {
    this.dialogRef.close();
    this.appointmentService.deleteUserAppointment(this.appointment.id).subscribe(() => console.log('#onDeleteClick called!'));
    this.storageSerice.refreshComponent();
    //delete from array
  }

}

@Component({
  selector: 'appointment-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, DatePipe, TimePipe, MatFormFieldModule,MatInputModule,ReactiveFormsModule, MatButtonModule],
  templateUrl: './appointment-dialog.html',
})
export class AppointmentDialog {
  summary = new FormControl('');

  constructor(
    private appointmentService: AppointmentService,
    private storageSerice: StorageService,
    public dialogRef: MatDialogRef<AppointmentDialog>,
    @Inject(MAT_DIALOG_DATA) public appointment: AppointmentResponse,
  ) { }

  addSummary() {
    this.appointment.summary=this.summary.getRawValue();
    this.appointmentService.addSummary(this.appointment.id,this.appointment.summary!).subscribe();
    console.log('#addSummary called!');
  }

  createPDF() {
    const doc = new jsPDF();
    doc.text(this.appointment.summary!, 10, 10);
    doc.save("fisa_medicala.pdf"); // will save the file in the current working directory
  }
}



