package com.studentevent.eventservice.repository;

import com.studentevent.eventservice.model.EventRegistration;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EventRegistrationRepository extends MongoRepository<EventRegistration, String> {
    List<EventRegistration> findByRollNumber(String rollNumber);
    List<EventRegistration> findByEventId(String eventId);
    Optional<EventRegistration> findByEventIdAndRollNumber(String eventId, String rollNumber);
    boolean existsByEventIdAndRollNumber(String eventId, String rollNumber);
}