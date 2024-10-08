package com.angelionita.licenta.projection;

import java.time.LocalDate;
import java.time.LocalTime;

public interface UserAppointmentResponse {
    Long getId();

    UserResponse getUser();//patient

    HospitalResponse getHospital();

    MedicResponse getMedic();

    SpecializationResponse getSpecialization();

    ProductResponse getProduct();

    LocalDate getDate();

    LocalTime getTime();

    String getDescription();

    interface UserResponse {
        Long getId();
        String getFirstName();

        String getLastName();

        String getEmail();
    }

    interface MedicResponse {
        Long getId();
        String getFirstName();

        String getLastName();
        String getImage();
    }
    interface HospitalResponse {
        Long getId();
        String getName();
    }

    interface SpecializationResponse {
        Long getId();
        String getName();
    }

    interface ProductResponse {
        Long getId();
        String getName();
    }
}





