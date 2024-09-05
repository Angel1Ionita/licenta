import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AppointmentDto, AppointmentResponse, UserAppointmentResponse } from '../../../dto/appointmentDto';
import { AppointmentService } from '../../../service/appointment.service';
import { MatCardModule } from '@angular/material/card';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { TimePipe } from '../../../time.pipe';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { jsPDF } from 'jspdf';
import { Router } from '@angular/router';
import { StorageService } from '../../../service/storage.service';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [MatCardModule, AsyncPipe, DatePipe, TimePipe, AppointmentFormComponent, CommonModule],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css'
})
export class AppointmentListComponent implements OnInit, OnDestroy {
  userAppointments?: UserAppointmentResponse[];
  appointments?: AppointmentResponse[];

  userAppointmentsSubscription!: Subscription;
  appointmentsSubscription!: Subscription;

  isStaff!: boolean;

  constructor(
    private appointmentService: AppointmentService,
    private storageService: StorageService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.isStaff = this.storageService.getUserRole() == 'MEDIC';
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
    if (this.isStaff) {
      this.userAppointmentsSubscription = this.appointmentService.getUserAppointmentsByMedic().subscribe(data => this.userAppointments = data);
      this.appointmentsSubscription = this.appointmentService.getAppointmentsByMedic().subscribe(data => this.appointments = data);
    }
    else{
      this.userAppointmentsSubscription = this.appointmentService.getUserAppointmentsByUser().subscribe(data => this.userAppointments = data);
      this.appointmentsSubscription = this.appointmentService.getAppointmentsByUser().subscribe(data => this.appointments = data);
    }
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
  isStaff!: boolean;
  constructor(
    private appointmentService: AppointmentService,
    private storageService: StorageService,
    public dialogRef: MatDialogRef<UserAppointmentDialog>,
    @Inject(MAT_DIALOG_DATA) public appointment: UserAppointmentResponse,
  ) {this.isStaff = this.storageService.getUserRole() == 'MEDIC'; }

  onCloseClick() {
    this.dialogRef.close();
  }

  onConfirmClick() {
    console.log('#onConfirmClick called!')
    this.dialogRef.close();
    const newAppointment: AppointmentDto = {
      userId: this.appointment.user.id.toString(),
      specialization: this.appointment.specialization.id.toString(),
      product: this.appointment.product.id.toString(),
      hospital: this.appointment.hospital.id.toString(),
      medic: this.appointment.medic.id.toString(),
      date: this.appointment.date as string,
      time: this.appointment.time,
      description: this.appointment.description
    }
    console.log(newAppointment);
    this.appointmentService.deleteUserAppointment(this.appointment.id).subscribe(() => console.log('User Appointment should be deleted'));
    this.appointmentService.createAppointment(newAppointment).subscribe(() => console.log('Appointment should be created'));
    this.storageService.refreshComponent();

  }

  onDeleteClick() {
    this.dialogRef.close();
    this.appointmentService.deleteUserAppointment(this.appointment.id).subscribe(() => console.log('#onDeleteClick called!'));
    this.storageService.refreshComponent();
    //delete from array
  }

}

@Component({
  selector: 'appointment-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, DatePipe, TimePipe, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './appointment-dialog.html',
})
export class AppointmentDialog {
  summary = new FormControl('');
  isStaff!: boolean;

  constructor(
    private appointmentService: AppointmentService,
    private storageService: StorageService,
    public dialogRef: MatDialogRef<AppointmentDialog>,
    @Inject(MAT_DIALOG_DATA) public appointment: AppointmentResponse,
  ) {this.isStaff = this.storageService.getUserRole() == 'MEDIC'; }

  addSummary() {
    this.appointment.summary = this.summary.getRawValue();
    this.appointmentService.addSummary(this.appointment.id, this.appointment.summary!).subscribe();
    console.log('#addSummary called!');
  }

  createPDF() {
    const doc = new jsPDF();
    doc.setFont('Times-Roman');
    doc.text('Numele pacientului: ' + this.appointment.user.firstName + ' ' + this.appointment.user.lastName, 10, 60);
    doc.text('Numele medicului: ' + this.appointment.medic.firstName + ' ' + this.appointment.medic.lastName, 10, 70);
    doc.text('Sectia: ' + this.appointment.specialization.name, 10, 80);
    doc.text('Investigatia: ' + this.appointment.specialization.name, 10, 90);
    doc.text('Spitalul: ' + this.appointment.hospital.name, 10, 100);
    doc.text('Observatiile medicului: ' + this.appointment.summary, 10, 120);
    var image = new Image();
    image.src = 'assets/images/logo.png';
    doc.addImage(image, 'png', 55, 10, 100, 15);
    console.log(image);
    doc.save("fisa_medicala.pdf");
  }
}



