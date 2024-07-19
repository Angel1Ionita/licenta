package com.angelionita.licenta.dto;

import com.angelionita.licenta.model.Hospital;
import com.angelionita.licenta.model.Specialization;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MedicDto {
    private Long id;
    @JsonProperty("first_name") private String firstName;
    @JsonProperty("last_name") private String lastName;
    private String title;
    private Specialization specialization;
    private Hospital hospital;
    private String image;
}
