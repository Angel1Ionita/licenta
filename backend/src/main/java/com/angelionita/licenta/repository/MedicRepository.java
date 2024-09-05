package com.angelionita.licenta.repository;

import com.angelionita.licenta.entity.Medic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicRepository extends JpaRepository<Medic, Long> {

    Medic findByEmail(String email);
}
