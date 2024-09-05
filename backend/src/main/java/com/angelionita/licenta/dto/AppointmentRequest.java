package com.angelionita.licenta.dto;

public record AppointmentRequest(

        String userId,
        String specialization,
        String product,
        String hospital,
        String medic,
        String date,
        String time,
        String description) {
}

