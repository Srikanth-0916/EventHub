package com.studentevent.eventservice.repository;

import com.studentevent.eventservice.model.Event;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends MongoRepository<Event, String> {
    List<Event> findByFacultyId(String facultyId);
    List<Event> findByCategory(String category);
}