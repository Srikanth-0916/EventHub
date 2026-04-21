package com.studentevent.eventservice.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class EventDTO {

    @Data
    public static class CreateEventRequest {
        @NotBlank private String eventName;
        @NotBlank private String location;
        @NotNull  private LocalDate eventDate;
        @NotBlank private String description;
        @NotBlank private String facultyId;
        private String category;
        private int maxParticipants;
    }

    @Data
    public static class EventResponse {
        private String id;
        private String eventName;
        private String location;
        private LocalDate eventDate;
        private String description;
        private String facultyId;
        private String category;
        private int maxParticipants;
    }

    @Data
    public static class RegisterStudentRequest {
        @NotBlank private String rollNumber;
        @NotBlank private String studentName;
    }

    @Data
    public static class RegistrationResponse {
        private String id;
        private String eventName;
        private String location;
        private LocalDate eventDate;
        private String description;
        private String studentName;
        private String rollNumber;
        private LocalDateTime registeredAt;
    }
}