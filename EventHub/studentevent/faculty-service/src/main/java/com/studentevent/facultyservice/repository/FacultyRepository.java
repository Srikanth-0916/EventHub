package com.studentevent.facultyservice.repository;

import com.studentevent.facultyservice.model.Faculty;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FacultyRepository extends MongoRepository<Faculty, String> {
    Optional<Faculty> findByEmail(String email);
    Optional<Faculty> findByFacultyId(String facultyId);
    boolean existsByEmail(String email);
    boolean existsByFacultyId(String facultyId);
}