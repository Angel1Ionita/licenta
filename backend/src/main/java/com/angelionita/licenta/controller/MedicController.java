package com.angelionita.licenta.controller;

import com.angelionita.licenta.dto.MedicEdit;
import com.angelionita.licenta.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequiredArgsConstructor
@CrossOrigin(value = "http://localhost:4200", allowCredentials = "true")
@RequestMapping("/medic")
public class MedicController {
    private final UserService userService;

    @PutMapping
    public String updateMedic(MedicEdit medic, Principal principal){
        userService.updateMedic(medic,principal);
        return "Updated info for medic "+principal.getName();
    }
}
