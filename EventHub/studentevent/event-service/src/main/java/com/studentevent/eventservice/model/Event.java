package com.studentevent.eventservice.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;

@Document(collection = "events")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Event {

    @Id
    private String id;

    @NotBlank
    private String eventName;

    @NotBlank
    private String location;

    @NotNull
    private LocalDate eventDate;

    @NotBlank
    private String description;

    @NotBlank
    private String facultyId;       // Faculty who created this event

    private String category;        // e.g., Technical, Cultural, Sports

    private int maxParticipants;
}