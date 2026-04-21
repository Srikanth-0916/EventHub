package com.studentevent.eventservice.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;
import lombok.*;

import java.time.LocalDateTime;

@Document(collection = "event_registrations")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventRegistration {

    @Id
    private String id;

    @DocumentReference
    private Event event;

    private String rollNumber;

    private String studentName;

    private LocalDateTime registeredAt = LocalDateTime.now();
}