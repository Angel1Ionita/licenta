package com.angelionita.licenta.service;

import com.angelionita.licenta.dto.*;
import com.angelionita.licenta.model.*;
import com.angelionita.licenta.projection.AppointmentResponse;
import com.angelionita.licenta.projection.UserAppointmentResponse;
import com.angelionita.licenta.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final SpecializationRepository specializationRepository;
    private final HospitalRepository hospitalRepository;
    private final UserAppointmentRepository userAppointmentRepository;
    private final AppointmentRepository appointmentRepository;
    private final MedicRepository medicRepository;

    private final PasswordEncoder passwordEncoder;


    public void registerUser(UserRegisterDto userRegisterDto) {
        User user = new User(userRegisterDto);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(user);
    }

    public void registerUserAsAdmin(UserAdminRegisterDto userAdminRegisterDto) {
        String role = userAdminRegisterDto.getRole();
        User user;
        if ("MEDIC".equals(role)) {
            user = new Medic(userAdminRegisterDto);
        } else {
            user = new User(userAdminRegisterDto);
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    public void updateMedic(MedicEdit oldMedic, Principal principal) {
        Medic medic = (Medic) userRepository.findByEmail(principal.getName());
        medic.setFirstName(oldMedic.getFirstName());
        medic.setLastName(oldMedic.getLastName());
        //medic.setSpecialization(specializationRepository.findByName(oldMedic.getSpecialization()));
        medic.setImage(oldMedic.getImage());
        userRepository.save(medic);
    }

    public Map<String, String> getUserInfo(String email) {
        User user = userRepository.findByEmail(email);
        Map<String, String> map = new HashMap<>();
        map.put("email", email);
        map.put("role", user.getRole());
        return map;
    }

    public void createUserAppointment(Principal principal, UserAppointmentRequest userAppointmentRequest) {
        UserAppointment appointment = new UserAppointment();
        User user = userRepository.findByEmail(principal.getName());
        Specialization specialization = specializationRepository
                .findById(Long.valueOf(userAppointmentRequest.specialization())).orElseThrow();
        Hospital hospital = hospitalRepository
                .findById(Long.valueOf(userAppointmentRequest.hospital())).orElseThrow();
        LocalDate date = LocalDate.parse(userAppointmentRequest.date());
        LocalTime time = LocalTime.parse(userAppointmentRequest.time());

        appointment.setUser(user);
        appointment.setSpecialization(specialization);
        appointment.setHospital(hospital);
        appointment.setMedic(userAppointmentRequest.medic());
        appointment.setDate(date);
        appointment.setTime(time);
        appointment.setDescription(userAppointmentRequest.description());

        userAppointmentRepository.save(appointment);
    }

    public List<MedicDto> findAllMedics() {
        return userRepository.findAllMedics(Sort.by("id"));
    }

    public MedicDto findMedicById(Long id) {
        return userRepository.findMedicById(id);
    }
    public List<UserAppointmentResponse> findUserAppointmentsByUser(Principal principal) {
        User user = userRepository.findByEmail(principal.getName());
        return userAppointmentRepository.findByUser(user);
    }
    public List<UserAppointmentResponse> getUserAppointments() {
        return userAppointmentRepository.findBy();
    }

    public List<AppointmentResponse> findAppointmentsByUser(Principal principal) {
        User user = userRepository.findByEmail(principal.getName());
        return appointmentRepository.findByUser(user);
    }
    public List<AppointmentResponse> getAppointments() {
        return appointmentRepository.findBy();
    }


    public void createAppointment(AppointmentRequest appointmentRequest) {
        Appointment appointment=new Appointment();
        User user=userRepository
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

        appointmentRepository.save(appointment);

    }


}
