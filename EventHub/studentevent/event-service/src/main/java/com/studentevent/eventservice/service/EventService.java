package com.studentevent.eventservice.service;

import com.studentevent.eventservice.dto.EventDTO.*;
import com.studentevent.eventservice.model.Event;
import com.studentevent.eventservice.model.EventRegistration;
import com.studentevent.eventservice.repository.EventRepository;
import com.studentevent.eventservice.repository.EventRegistrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private EventRegistrationRepository registrationRepository;

    // ─── Event CRUD ───────────────────────────────────────────

    public EventResponse createEvent(CreateEventRequest request) {
        Event event = Event.builder()
                .eventName(request.getEventName())
                .location(request.getLocation())
                .eventDate(request.getEventDate())
                .description(request.getDescription())
                .facultyId(request.getFacultyId())
                .category(request.getCategory())
                .maxParticipants(request.getMaxParticipants())
                .build();
        return toEventResponse(eventRepository.save(event));
    }

    public List<EventResponse> getAllEvents() {
        return eventRepository.findAll()
                .stream().map(this::toEventResponse).collect(Collectors.toList());
    }

    public EventResponse getEventById(String id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found: " + id));
        return toEventResponse(event);
    }

    public List<EventResponse> getEventsByFaculty(String facultyId) {
        return eventRepository.findByFacultyId(facultyId)
                .stream().map(this::toEventResponse).collect(Collectors.toList());
    }

    public EventResponse updateEvent(String id, CreateEventRequest request) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found: " + id));
        event.setEventName(request.getEventName());
        event.setLocation(request.getLocation());
        event.setEventDate(request.getEventDate());
        event.setDescription(request.getDescription());
        event.setCategory(request.getCategory());
        event.setMaxParticipants(request.getMaxParticipants());
        return toEventResponse(eventRepository.save(event));
    }

    public void deleteEvent(String id) {
        eventRepository.deleteById(id);
    }

    // ─── Student Registration ─────────────────────────────────

    public RegistrationResponse registerStudentToEvent(String eventId, RegisterStudentRequest request) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found: " + eventId));

        if (registrationRepository.existsByEventIdAndRollNumber(eventId, request.getRollNumber())) {
            throw new RuntimeException("Student already registered for this event");
        }

        if (event.getMaxParticipants() > 0) {
            long currentCount = registrationRepository.findByEventId(eventId).size();
            if (currentCount >= event.getMaxParticipants()) {
                throw new RuntimeException("Event is full");
            }
        }

        EventRegistration reg = EventRegistration.builder()
                .event(event)
                .rollNumber(request.getRollNumber())
                .studentName(request.getStudentName())
                .build();

        return toRegistrationResponse(registrationRepository.save(reg));
    }

    public List<RegistrationResponse> getRegistrationsByStudent(String rollNumber) {
        return registrationRepository.findByRollNumber(rollNumber)
                .stream().map(this::toRegistrationResponse).collect(Collectors.toList());
    }

    public List<RegistrationResponse> getRegistrationsByEvent(String eventId) {
        return registrationRepository.findByEventId(eventId)
                .stream().map(this::toRegistrationResponse).collect(Collectors.toList());
    }

    public void cancelRegistration(String eventId, String rollNumber) {
        EventRegistration reg = registrationRepository
                .findByEventIdAndRollNumber(eventId, rollNumber)
                .orElseThrow(() -> new RuntimeException("Registration not found"));
        registrationRepository.delete(reg);
    }

    // ─── Mappers ──────────────────────────────────────────────

    private EventResponse toEventResponse(Event e) {
        EventResponse r = new EventResponse();
        r.setId(e.getId());
        r.setEventName(e.getEventName());
        r.setLocation(e.getLocation());
        r.setEventDate(e.getEventDate());
        r.setDescription(e.getDescription());
        r.setFacultyId(e.getFacultyId());
        r.setCategory(e.getCategory());
        r.setMaxParticipants(e.getMaxParticipants());
        return r;
    }

    private RegistrationResponse toRegistrationResponse(EventRegistration reg) {
        RegistrationResponse r = new RegistrationResponse();
        r.setId(reg.getId());
        r.setEventName(reg.getEvent().getEventName());
        r.setLocation(reg.getEvent().getLocation());
        r.setEventDate(reg.getEvent().getEventDate());
        r.setDescription(reg.getEvent().getDescription());
        r.setStudentName(reg.getStudentName());
        r.setRollNumber(reg.getRollNumber());
        r.setRegisteredAt(reg.getRegisteredAt());
        return r;
    }
}