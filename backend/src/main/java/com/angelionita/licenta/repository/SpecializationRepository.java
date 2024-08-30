package com.angelionita.licenta.repository;

import com.angelionita.licenta.model.Product;
import com.angelionita.licenta.model.Specialization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SpecializationRepository extends JpaRepository<Specialization, Long> {

}
