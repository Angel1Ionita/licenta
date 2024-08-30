package com.angelionita.licenta.controller;

import com.angelionita.licenta.dto.AppointmentRequest;
import com.angelionita.licenta.dto.UserAppointmentRequest;
import com.angelionita.licenta.model.Appointment;
import com.angelionita.licenta.model.UserAppointment;
import com.angelionita.licenta.projection.AppointmentResponse;
import com.angelionita.licenta.projection.UserAppointmentResponse;
import com.angelionita.licenta.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin(value = "http://localhost:4200", allowCredentials = "true")
public class AppointmentController {

    private final AppointmentService appointmentService;

    //Appointment Requests

    @GetMapping("/user-appointments")
    public List<UserAppointmentResponse> getUserAppointments() {
        return appointmentService.getUserAppointments();
    }

    @PostMapping("/user-appointments")
    public UserAppointment createUserAppointment(Principal principal, @RequestBody UserAppointmentRequest userAppointmentRequest) {
        return appointmentService.createUserAppointment(principal, userAppointmentRequest);
    }

    @DeleteMapping("/user-appointments/{id}")
    public UserAppointment deleteUserAppointment(@PathVariable Long id){
        return appointmentService.deleteUserAppointment(id);
    }

    @GetMapping("/user-appointments/user")
    public List<UserAppointmentResponse> getUserAppointmentsByUser(Principal principal) {
        return appointmentService.findUserAppointmentsByUser(principal);
    }

    @GetMapping("/user-appointments/medic")
    public List<UserAppointmentResponse> getUserAppointmentsByMedic(Principal principal) {
        return appointmentService.findUserAppointmentsByMedic(principal);
    }

    //Appointments

    @GetMapping("/appointments")
    public List<AppointmentResponse> getAppointments() {
        return appointmentService.getAppointments();
    }

    @PostMapping("/appointments")
    public Appointment createAppointment(@RequestBody AppointmentRequest appointmentRequest) {
        return appointmentService.createAppointment(appointmentRequest);
    }

    @GetMapping("/appointments/user")
    public List<AppointmentResponse> getAppointmentsByUser(Principal principal) {
        return appointmentService.findAppointmentsByUser(principal);
    }

    @GetMapping("/appointments/medic")
    public List<AppointmentResponse> getAppointmentsByMedic(Principal principal) {
        return appointmentService.findAppointmentsByMedic(principal);
    }

    @PutMapping("/appointments/summary/{id}")
    public Map<String, Object> addSummary(@PathVariable Long id, @RequestBody String summary){
        appointmentService.addSummary(id,summary);
        Map<String, Object> map=new HashMap<>();
        map.put("id",id);
        map.put("summary",summary);
        return map;
    }

}
