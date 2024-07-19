package com.angelionita.licenta.projection;

import java.time.LocalDate;
import java.time.LocalTime;

public interface AppointmentResponse {

    Long getId();

    UserResponse getUser();//patient

    HospitalResponse getHospital();

    MedicResponse getMedic();

    SpecializationResponse getSpecialization();

    LocalDate getDate();

    LocalTime getTime();

    String getDescription();

    interface UserResponse {
        String getFirstName();

        String getLastName();

        String getEmail();
    }

    interface MedicResponse {
        String getFirstName();

        String getLastName();
        String getImage();
    }

    interface HospitalResponse {
        String getName();
    }

    interface SpecializationResponse {
        String getName();
    }
}
