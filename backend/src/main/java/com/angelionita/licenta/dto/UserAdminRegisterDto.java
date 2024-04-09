package com.angelionita.licenta.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class UserAdminRegisterDto {
    @JsonProperty("first_name")
    @NotBlank
    private String firstName;

    @JsonProperty("last_name")
    @NotBlank
    private String lastName;

    @NotBlank
    @Email(regexp = "^(\\S+)@(\\S+)$")
    private String email;

    @NotBlank
    @Size(min = 5, max = 50)
    private String password;

    @NotBlank
    @Pattern(regexp = "^(USER|ADMIN|MEDIC)$", message = "must be a valid role")
    private String role;

}
