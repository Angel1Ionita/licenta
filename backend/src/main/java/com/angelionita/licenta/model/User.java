package com.angelionita.licenta.model;

import com.angelionita.licenta.dto.UserAdminRegisterDto;
import com.angelionita.licenta.dto.UserRegisterDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_user")
@Inheritance(strategy = InheritanceType.JOINED)
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role;

    public User(UserRegisterDto userRegisterDto) {
        this.firstName = userRegisterDto.getFirstName();
        this.lastName = userRegisterDto.getLastName();
        this.email = userRegisterDto.getEmail();
        this.password = userRegisterDto.getPassword();
        this.role = "USER";
    }

    public User(UserAdminRegisterDto userAdminRegisterDto) {
        this.firstName = userAdminRegisterDto.getFirstName();
        this.lastName = userAdminRegisterDto.getLastName();
        this.email = userAdminRegisterDto.getEmail();
        this.password = userAdminRegisterDto.getPassword();
        this.role = userAdminRegisterDto.getRole();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + role));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
