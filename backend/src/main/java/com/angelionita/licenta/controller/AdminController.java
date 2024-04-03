package com.angelionita.licenta.controller;

import com.angelionita.licenta.dto.UserAdminRegisterDto;
import com.angelionita.licenta.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequiredArgsConstructor
@CrossOrigin(value = "http://localhost:4200", allowCredentials = "true")
@RequestMapping("/admin")
public class AdminController {
    private final UserService userService;

    @GetMapping("/greeting")
    public String protectedResponse(Principal principal) {
        return String.format("<h1>Hello, %s! This endpoint is protected<h1>", principal.getName());
    }

    @PostMapping("/register")
    public String registerUserAsAdmin(@Valid @RequestBody UserAdminRegisterDto userAdminRegisterDto) {
        userService.registerUserAsAdmin(userAdminRegisterDto);
        return "Register as Admin successful";
    }
}
