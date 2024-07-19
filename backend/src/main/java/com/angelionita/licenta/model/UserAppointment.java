package com.angelionita.licenta.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "appointment_request")
public class UserAppointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private User user;//patient
    @ManyToOne
    private Hospital hospital;
    private String medic;
    @ManyToOne
    private Specialization specialization;
    private LocalDate date;
    private LocalTime time;
    private String description;
}
