package com.studentevent.studentservice.service;

import com.studentevent.studentservice.dto.StudentDTO.*;
import com.studentevent.studentservice.model.Student;
import com.studentevent.studentservice.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public StudentResponse register(RegisterRequest request) {
        if (studentRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }
        if (studentRepository.existsByRollNumber(request.getRollNumber())) {
            throw new RuntimeException("Roll number already exists");
        }

        Student student = Student.builder()
                .rollNumber(request.getRollNumber())
                .name(request.getName())
                .email(request.getEmail())
                .password(request.getPassword()) // In production, encode with BCrypt
                .build();

        Student saved = studentRepository.save(student);
        return new StudentResponse(saved.getId(), saved.getRollNumber(), saved.getName(), saved.getEmail());
    }

    public LoginResponse login(LoginRequest request) {
        Student student = studentRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        if (!student.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        StudentResponse response = new StudentResponse(
                student.getId(), student.getRollNumber(), student.getName(), student.getEmail());
        return new LoginResponse("Login successful", response);
    }

    public StudentResponse getByRollNumber(String rollNumber) {
        Student student = studentRepository.findByRollNumber(rollNumber)
                .orElseThrow(() -> new RuntimeException("Student not found with roll number: " + rollNumber));
        return new StudentResponse(student.getId(), student.getRollNumber(), student.getName(), student.getEmail());
    }

    public List<StudentResponse> getAllStudents() {
        return studentRepository.findAll()
                .stream()
                .map(s -> new StudentResponse(s.getId(), s.getRollNumber(), s.getName(), s.getEmail()))
                .collect(Collectors.toList());
    }

    public void deleteStudent(String id) {
        studentRepository.deleteById(id);
    }
}