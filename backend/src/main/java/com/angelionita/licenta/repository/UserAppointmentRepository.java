package com.angelionita.licenta.repository;

import com.angelionita.licenta.entity.Medic;
import com.angelionita.licenta.projection.UserAppointmentResponse;
import com.angelionita.licenta.entity.UserAppointment;
import com.angelionita.licenta.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserAppointmentRepository extends JpaRepository<UserAppointment, Long> {
    List<UserAppointmentResponse> findBy();
    List<UserAppointmentResponse> findByUser(User user);

    List<UserAppointmentResponse> findByMedic(Medic medic);
}
