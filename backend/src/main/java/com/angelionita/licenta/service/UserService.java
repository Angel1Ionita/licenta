package com.angelionita.licenta.service;

import com.angelionita.licenta.dto.UserAdminRegisterDto;
import com.angelionita.licenta.dto.UserRegisterDto;
import com.angelionita.licenta.model.User;
import com.angelionita.licenta.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public void registerUser(UserRegisterDto userRegisterDto) {
        User user = new User(userRegisterDto);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(user);
    }

    public void registerUserAsAdmin(UserAdminRegisterDto userAdminRegisterDto) {
        User user = new User(userAdminRegisterDto);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(user);
    }

    public Map<String, String> getUserInfo(String email) {
        User user = userRepository.findByEmail(email);
        Map<String, String> map=new HashMap<>();
        map.put("email",email);
        map.put("role",user.getRole());
        return map;
    }
}
