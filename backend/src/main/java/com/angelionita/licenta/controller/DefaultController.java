package com.angelionita.licenta.controller;

import com.angelionita.licenta.dto.AppointmentRequest;
import com.angelionita.licenta.dto.UserAppointmentRequest;
import com.angelionita.licenta.dto.MedicDto;
import com.angelionita.licenta.model.Product;
import com.angelionita.licenta.projection.AppointmentResponse;
import com.angelionita.licenta.projection.UserAppointmentResponse;
import com.angelionita.licenta.model.Hospital;
import com.angelionita.licenta.model.Specialization;
import com.angelionita.licenta.repository.HospitalRepository;
import com.angelionita.licenta.repository.ProductRepository;
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

}

