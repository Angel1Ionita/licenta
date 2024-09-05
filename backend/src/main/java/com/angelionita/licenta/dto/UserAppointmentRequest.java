package com.angelionita.licenta.dto;

public record UserAppointmentRequest(
        String specialization,
        String product,
        String hospital,
        String medic,
        String date,
        String time,
        String description) {
}

