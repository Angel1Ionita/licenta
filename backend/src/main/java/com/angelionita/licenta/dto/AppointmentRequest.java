package com.angelionita.licenta.dto;

public record AppointmentRequest(

        String userId,
        String specialization,
        String hospital,
        String medic,
        String date,
        String time,
        String description) {
}

