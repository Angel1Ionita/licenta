package com.angelionita.licenta.repository;

import com.angelionita.licenta.model.Product;
import com.angelionita.licenta.model.Specialization;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product,Long> {
    List<Product> findAllBySpecialization(Specialization specialization);
}
