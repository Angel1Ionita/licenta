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



    public List<MedicDto> findAllMedics() {
        return userRepository.findAllMedics(Sort.by("id"));
    }

    public MedicDto findMedicById(Long id) {
        return userRepository.findMedicById(id);
    }






}
