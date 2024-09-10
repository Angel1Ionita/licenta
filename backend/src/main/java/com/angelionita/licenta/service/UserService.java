package com.angelionita.licenta.service;

import com.angelionita.licenta.dto.*;
import com.angelionita.licenta.entity.*;
import com.angelionita.licenta.repository.*;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final MailService mailService;

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

    private PasswordResetToken createPasswordResetToken(String email) {
        String tokenString = UUID.randomUUID().toString();

        PasswordResetToken passwordResetToken = new PasswordResetToken();

        passwordResetToken.setUser(userRepository.findByEmail(email));
        passwordResetToken.setExpiryDate(LocalDateTime.now().plusMinutes(PasswordResetToken.EXPIRATION_MINUTES));
        passwordResetToken.setToken(tokenString);

        return passwordResetTokenRepository.save(passwordResetToken);
    }

    public void initiatePasswordReset(String email) throws MessagingException {
        PasswordResetToken token = createPasswordResetToken(email);
        mailService.sendPasswordResetEmail(token);
    }

    public void resetPassword(String tokenString, String newPassword) throws Exception {
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(tokenString);
        if (isTokenValid(resetToken)) {
            var user = resetToken.getUser();
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
        } else
            throw new Exception("Token invalid");
    }

    private boolean isTokenValid(PasswordResetToken token) {
        return token.getExpiryDate().isAfter(LocalDateTime.now());
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
