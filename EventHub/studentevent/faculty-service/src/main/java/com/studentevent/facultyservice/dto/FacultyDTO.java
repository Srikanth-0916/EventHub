package com.studentevent.facultyservice.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

public class FacultyDTO {

    @Data
    public static class RegisterRequest {
        @NotBlank private String name;
        @Email @NotBlank private String email;
        @NotBlank private String password;
        @NotBlank private String department;
        @NotBlank private String facultyId;
    }

    @Data
    public static class LoginRequest {
        @Email @NotBlank private String email;
        @NotBlank private String password;
    }

    @Data
    public static class FacultyResponse {
        private String id;
        private String name;
        private String email;
        private String department;
        private String facultyId;

        public FacultyResponse(String id, String name, String email, String department, String facultyId) {
            this.id = id;
            this.name = name;
            this.email = email;
            this.department = department;
            this.facultyId = facultyId;
        }
    }

    @Data
    public static class LoginResponse {
        private String message;
        private FacultyResponse faculty;

        public LoginResponse(String message, FacultyResponse faculty) {
            this.message = message;
            this.faculty = faculty;
        }
    }
}