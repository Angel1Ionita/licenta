package com.angelionita.licenta.entity;

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
    @ManyToOne
    private Medic medic;
    @ManyToOne
    private Specialization specialization;
    @ManyToOne
    private Product product;
    private LocalDate date;
    private LocalTime time;
    private String description;
}
