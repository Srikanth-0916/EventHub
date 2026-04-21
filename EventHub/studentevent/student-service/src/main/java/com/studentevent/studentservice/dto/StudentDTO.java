package com.studentevent.studentservice.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

public class StudentDTO {

    @Data
    public static class RegisterRequest {
        @NotBlank private String rollNumber;
        @NotBlank private String name;
        @Email @NotBlank private String email;
        @NotBlank private String password;
    }

    @Data
    public static class LoginRequest {
        @Email @NotBlank private String email;
        @NotBlank private String password;
    }

    @Data
    public static class StudentResponse {
        private String id;
        private String rollNumber;
        private String name;
        private String email;

        public StudentResponse(String id, String rollNumber, String name, String email) {
            this.id = id;
            this.rollNumber = rollNumber;
            this.name = name;
            this.email = email;
        }
    }

    @Data
    public static class LoginResponse {
        private String message;
        private StudentResponse student;

        public LoginResponse(String message, StudentResponse student) {
            this.message = message;
            this.student = student;
        }
    }
}