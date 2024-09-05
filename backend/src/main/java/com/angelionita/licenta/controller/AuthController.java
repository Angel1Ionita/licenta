package com.angelionita.licenta.controller;

import com.angelionita.licenta.dto.LoginRequest;
import com.angelionita.licenta.dto.UserRegisterDto;
import com.angelionita.licenta.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextHolderStrategy;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin(value = "http://localhost:4200", allowCredentials = "true")
public class AuthController {

    private final SecurityContextRepository securityContextRepository =
            new HttpSessionSecurityContextRepository();
    private final SecurityContextHolderStrategy securityContextHolderStrategy = SecurityContextHolder.getContextHolderStrategy();
    private final AuthenticationManager authenticationManager;
    private final UserService userService;

    @PostMapping("/register")
    public String registerUser(@Valid @RequestBody UserRegisterDto userRegisterDto) {
        userService.registerUser(userRegisterDto);
        return userRegisterDto.getEmail();
    }

    @PostMapping("/login")
    public Map<String, String> login(@Valid @RequestBody LoginRequest loginRequest,
                                     HttpServletRequest request, HttpServletResponse response) {
        UsernamePasswordAuthenticationToken token = UsernamePasswordAuthenticationToken.unauthenticated(
                loginRequest.getEmail(), loginRequest.getPassword());
        Authentication authentication = authenticationManager.authenticate(token);
        SecurityContext context = securityContextHolderStrategy.createEmptyContext();
        context.setAuthentication(authentication);
        securityContextHolderStrategy.setContext(context);
        securityContextRepository.saveContext(context, request, response);
        return userService.getUserInfo(loginRequest.getEmail());
    }

    @GetMapping("/user")
    public Map<String, String> getUserInfo(Principal principal){
        return userService.getUserInfo(principal.getName());
    }
}
