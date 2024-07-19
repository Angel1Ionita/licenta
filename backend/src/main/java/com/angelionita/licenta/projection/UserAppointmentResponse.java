package com.angelionita.licenta.projection;

import java.time.LocalDate;
import java.time.LocalTime;

public interface UserAppointmentResponse {
    Long getId();

    UserResponse getUser();//patient

    HospitalResponse getHospital();

    String getMedic();

    SpecializationResponse getSpecialization();

    LocalDate getDate();

    LocalTime getTime();

    String getDescription();

    interface UserResponse {
        String getFirstName();

        String getLastName();

        String getEmail();
    }

    interface HospitalResponse {
        String getName();
    }

    interface SpecializationResponse {
        String getName();
    }
}





