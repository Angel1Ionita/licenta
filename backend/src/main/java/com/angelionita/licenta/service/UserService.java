package com.angelionita.licenta.service;

import com.angelionita.licenta.dto.UserAdminRegisterDto;
import com.angelionita.licenta.dto.UserRegisterDto;
import com.angelionita.licenta.model.User;
import com.angelionita.licenta.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    public User registerUser(UserRegisterDto userRegisterDto) {
        User user = new User(userRegisterDto);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }
    public User registerUserAsAdmin(UserAdminRegisterDto userAdminRegisterDto) {
        User user = new User(userAdminRegisterDto);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }
}
