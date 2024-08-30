package com.angelionita.licenta.service;

import com.angelionita.licenta.dto.AppointmentRequest;
import com.angelionita.licenta.dto.UserAppointmentRequest;
import com.angelionita.licenta.model.*;
import com.angelionita.licenta.projection.AppointmentResponse;
import com.angelionita.licenta.projection.UserAppointmentResponse;
import com.angelionita.licenta.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AppointmentService {
    private final UserRepository userRepository;
    private final SpecializationRepository specializationRepository;
    private final HospitalRepository hospitalRepository;
    private final MedicRepository medicRepository;
    private final AppointmentRepository appointmentRepository;
    private final UserAppointmentRepository userAppointmentRepository;
    public UserAppointment createUserAppointment(Principal principal, UserAppointmentRequest userAppointmentRequest) {
        UserAppointment appointment = new UserAppointment();
        User user = userRepository.findByEmail(principal.getName());
        Specialization specialization = specializationRepository
                .findById(Long.valueOf(userAppointmentRequest.specialization())).orElseThrow();
        Hospital hospital = hospitalRepository
                .findById(Long.valueOf(userAppointmentRequest.hospital())).orElseThrow();
        Medic medic = medicRepository
                .findById(Long.valueOf(userAppointmentRequest.medic())).orElseThrow();
        LocalDate date = LocalDate.parse(userAppointmentRequest.date());
        LocalTime time = LocalTime.parse(userAppointmentRequest.time());

        appointment.setUser(user);
        appointment.setSpecialization(specialization);
        appointment.setHospital(hospital);
        appointment.setMedic(medic);
        appointment.setDate(date);
        appointment.setTime(time);
        appointment.setDescription(userAppointmentRequest.description());

        return userAppointmentRepository.save(appointment);
    }

    public Appointment createAppointment(AppointmentRequest appointmentRequest) {
        Appointment appointment = new Appointment();
        User user = userRepository
                .findById(Long.valueOf(appointmentRequest.userId())).orElseThrow();
        Specialization specialization = specializationRepository
                .findById(Long.valueOf(appointmentRequest.specialization())).orElseThrow();
        Hospital hospital = hospitalRepository
                .findById(Long.valueOf(appointmentRequest.hospital())).orElseThrow();
        Medic medic = medicRepository
                .findById(Long.valueOf(appointmentRequest.medic())).orElseThrow();
        LocalDate date = LocalDate.parse(appointmentRequest.date());
        LocalTime time = LocalTime.parse(appointmentRequest.time());

        appointment.setUser(user);
        appointment.setSpecialization(specialization);
        appointment.setHospital(hospital);
        appointment.setMedic(medic);
        appointment.setDate(date);
        appointment.setTime(time);
        appointment.setDescription(appointmentRequest.description());

        return appointmentRepository.save(appointment);

    }

    public List<UserAppointmentResponse> findUserAppointmentsByUser(Principal principal) {
        User user = userRepository.findByEmail(principal.getName());
        return userAppointmentRepository.findByUser(user);
    }

    public List<UserAppointmentResponse> findUserAppointmentsByMedic(Principal principal) {
        Medic medic = medicRepository.findByEmail(principal.getName());
        return userAppointmentRepository.findByMedic(medic);
    }

    public List<UserAppointmentResponse> getUserAppointments() {
        return userAppointmentRepository.findBy();
    }

    public UserAppointment deleteUserAppointment(Long userAppointmentId) {
        UserAppointment userAppointment = userAppointmentRepository.findById(userAppointmentId).orElseThrow();
        userAppointmentRepository.delete(userAppointment);
        return userAppointment;
    }

    public List<AppointmentResponse> findAppointmentsByUser(Principal principal) {
        User user = userRepository.findByEmail(principal.getName());
        return appointmentRepository.findByUser(user);
    }

    public List<AppointmentResponse> findAppointmentsByMedic(Principal principal) {
        Medic medic = medicRepository.findByEmail(principal.getName());
        return appointmentRepository.findByMedic(medic);
    }


    public List<AppointmentResponse> getAppointments() {
        return appointmentRepository.findBy();
    }

    public void addSummary(Long id, String summary){
        Appointment appointment=appointmentRepository.findById(id).orElseThrow();
        appointment.setSummary(summary);
        appointmentRepository.save(appointment);
    }

}
