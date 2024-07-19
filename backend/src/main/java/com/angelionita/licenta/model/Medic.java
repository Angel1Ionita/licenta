package com.angelionita.licenta.model;

import com.angelionita.licenta.dto.UserAdminRegisterDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Medic extends User{

    private String title;
    @ManyToOne
    private Hospital hospital;
    @ManyToOne
    private Specialization specialization;
    private String image;

    public Medic(UserAdminRegisterDto userAdminRegisterDto) {
        super(userAdminRegisterDto);
    }
}
