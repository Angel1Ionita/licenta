package com.angelionita.licenta.controller;

import com.angelionita.licenta.dto.AppointmentRequest;
import com.angelionita.licenta.dto.UserAppointmentRequest;
import com.angelionita.licenta.dto.MedicDto;
import com.angelionita.licenta.projection.AppointmentResponse;
import com.angelionita.licenta.projection.UserAppointmentResponse;
import com.angelionita.licenta.model.Hospital;
import com.angelionita.licenta.model.Specialization;
import com.angelionita.licenta.repository.HospitalRepository;
import com.angelionita.licenta.repository.SpecializationRepository;
import com.angelionita.licenta.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(value = "http://localhost:4200", allowCredentials = "true")
//allow credentials is required to be able to set session cookie in browser
public class DefaultController {

    private final UserService userService;

    private final SpecializationRepository specializationRepository;
    private final HospitalRepository hospitalRepository;

    @GetMapping("/specializations")
    public List<Specialization> getSpecializations() {
        return specializationRepository.findAll();
    }

    @GetMapping("/hospitals")
    public List<Hospital> getHospitals() {
        return hospitalRepository.findAll();
    }

    @GetMapping("/medics")
    public List<MedicDto> getMedics() {
        return userService.findAllMedics();
    }

    @GetMapping("/medics/{id}")
    public MedicDto getMedicById(@PathVariable Long id) {
        return userService.findMedicById(id);
    }

    @GetMapping("/user-appointments")
    public List<UserAppointmentResponse> getUserAppointments(){
        return userService.getUserAppointments();
    }

    @GetMapping("/appointments/user")
    public List<AppointmentResponse> getAppointments(Principal principal){
        return userService.findAppointmentsByUser(principal);
    }

    @GetMapping("/appointments")
    public List<AppointmentResponse> getAppointments(){
        return userService.getAppointments();
    }

    @GetMapping("/user-appointments/user")
    public List<UserAppointmentResponse> getUserAppointments(Principal principal){
        return userService.findUserAppointmentsByUser(principal);
    }

    @PostMapping("/user-appointments")
    public String createUserAppointment(Principal principal, @RequestBody UserAppointmentRequest userAppointmentRequest){
        userService.createUserAppointment(principal, userAppointmentRequest);
        return "User appointment created!";
    }

    @PostMapping("/appointments")
    public String createAppointment(@RequestBody AppointmentRequest appointmentRequest){
        userService.createAppointment(appointmentRequest);
        return "Appointment created!";
    }

//    @PostMapping("/appointments")
//    public String createAppointment(Principal principal, @RequestBody UserAppointmentRequest userAppointmentRequest){
//        userService.createAppointment(principal, userAppointmentRequest);
//        return "User appointment created!";
//    }






    //to do:

    // Operators can see all appointment requests and edit them to become appointments
    // create-appointment-request -> for users
    // create-appointment -> for operators
    // get-appointment-requests
    // get-appointments

    //edit form
}

