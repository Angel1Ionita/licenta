import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffAppointmentListComponent } from './staff-appointment-list.component';

describe('StaffAppointmentListComponent', () => {
  let component: StaffAppointmentListComponent;
  let fixture: ComponentFixture<StaffAppointmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffAppointmentListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StaffAppointmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
