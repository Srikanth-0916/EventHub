package com.studentevent.facultyservice.service;

import com.studentevent.facultyservice.dto.FacultyDTO.*;
import com.studentevent.facultyservice.model.Faculty;
import com.studentevent.facultyservice.repository.FacultyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FacultyService {

    @Autowired
    private FacultyRepository facultyRepository;

    public FacultyResponse register(RegisterRequest request) {
        if (facultyRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }
        if (facultyRepository.existsByFacultyId(request.getFacultyId())) {
            throw new RuntimeException("Faculty ID already exists");
        }

        Faculty faculty = Faculty.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(request.getPassword())
                .department(request.getDepartment())
                .facultyId(request.getFacultyId())
                .build();

        Faculty saved = facultyRepository.save(faculty);
        return toResponse(saved);
    }

    public LoginResponse login(LoginRequest request) {
        Faculty faculty = facultyRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Faculty not found"));

        if (!faculty.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        return new LoginResponse("Login successful", toResponse(faculty));
    }

    public FacultyResponse getByFacultyId(String facultyId) {
        Faculty faculty = facultyRepository.findByFacultyId(facultyId)
                .orElseThrow(() -> new RuntimeException("Faculty not found: " + facultyId));
        return toResponse(faculty);
    }

    public List<FacultyResponse> getAllFaculties() {
        return facultyRepository.findAll()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public void deleteFaculty(String id) {
        facultyRepository.deleteById(id);
    }

    private FacultyResponse toResponse(Faculty f) {
        return new FacultyResponse(f.getId(), f.getName(), f.getEmail(), f.getDepartment(), f.getFacultyId());
    }
}