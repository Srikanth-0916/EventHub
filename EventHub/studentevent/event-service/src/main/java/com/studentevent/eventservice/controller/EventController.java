package com.studentevent.eventservice.controller;

import com.studentevent.eventservice.dto.EventDTO.*;
import com.studentevent.eventservice.service.EventService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "*")
public class EventController {

    @Autowired
    private EventService eventService;

    // ─── Event Endpoints ──────────────────────────────────────

    @PostMapping
    public ResponseEntity<?> createEvent(@Valid @RequestBody CreateEventRequest request) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(eventService.createEvent(request));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<EventResponse>> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getEventById(@PathVariable String id) {
        try {
            return ResponseEntity.ok(eventService.getEventById(id));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/faculty/{facultyId}")
    public ResponseEntity<List<EventResponse>> getEventsByFaculty(@PathVariable String facultyId) {
        return ResponseEntity.ok(eventService.getEventsByFaculty(facultyId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateEvent(@PathVariable String id,
                                         @Valid @RequestBody CreateEventRequest request) {
        try {
            return ResponseEntity.ok(eventService.updateEvent(id, request));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEvent(@PathVariable String id) {
        eventService.deleteEvent(id);
        return ResponseEntity.ok("Event deleted");
    }

    // ─── Registration Endpoints ───────────────────────────────

    @PostMapping("/{eventId}/register")
    public ResponseEntity<?> registerStudent(@PathVariable String eventId,
                                             @Valid @RequestBody RegisterStudentRequest request) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(eventService.registerStudentToEvent(eventId, request));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/registrations/student/{rollNumber}")
    public ResponseEntity<List<RegistrationResponse>> getRegistrationsByStudent(
            @PathVariable String rollNumber) {
        return ResponseEntity.ok(eventService.getRegistrationsByStudent(rollNumber));
    }

    @GetMapping("/{eventId}/registrations")
    public ResponseEntity<List<RegistrationResponse>> getRegistrationsByEvent(
            @PathVariable String eventId) {
        return ResponseEntity.ok(eventService.getRegistrationsByEvent(eventId));
    }

    @DeleteMapping("/{eventId}/register/{rollNumber}")
    public ResponseEntity<String> cancelRegistration(@PathVariable String eventId,
                                                     @PathVariable String rollNumber) {
        try {
            eventService.cancelRegistration(eventId, rollNumber);
            return ResponseEntity.ok("Registration cancelled");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}