package com.angelionita.licenta.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class PasswordResetRequest {
    private String token;
    @JsonProperty("new_password") private String newPassword;

}
