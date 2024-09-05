package com.angelionita.licenta.repository;

import com.angelionita.licenta.entity.Appointment;
import com.angelionita.licenta.entity.Medic;
import com.angelionita.licenta.entity.User;
import com.angelionita.licenta.projection.AppointmentResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<AppointmentResponse> findBy();
    List<AppointmentResponse> findByUser(User user);
    List<AppointmentResponse> findByMedic(Medic medic);
}
