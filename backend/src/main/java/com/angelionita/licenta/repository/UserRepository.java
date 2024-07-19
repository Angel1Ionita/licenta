package com.angelionita.licenta.repository;

import com.angelionita.licenta.dto.MedicDto;
import com.angelionita.licenta.model.User;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);

    @Query(value = "select new com.angelionita.licenta.dto.MedicDto(m.id,m.firstName,m.lastName,m.title,s,h,m.image) " +
                   "from Medic m " +
                   "left join Specialization s on m.specialization.id=s.id " +
                   "left join Hospital h on m.hospital.id=h.id")
    List<MedicDto> findAllMedics(Sort sort);

    @Query(value = "select new com.angelionita.licenta.dto.MedicDto(m.id,m.firstName,m.lastName,m.title,s,h,m.image) " +
            "from Medic m " +
            "left join Specialization s on m.specialization.id=s.id " +
            "left join Hospital h on m.hospital.id=h.id " +
            "where m.id=:id")
    MedicDto findMedicById(@Param("id") Long id);

}
