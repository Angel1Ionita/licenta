package com.angelionita.licenta.dto;

public record UserAppointmentRequest(
        String specialization,
        String hospital,
        String medic,
        String date,
        String time,
        String description) {
}

