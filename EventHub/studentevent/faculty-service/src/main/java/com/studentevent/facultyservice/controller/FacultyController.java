package com.studentevent.facultyservice.controller;

import com.studentevent.facultyservice.dto.FacultyDTO.*;
import com.studentevent.facultyservice.service.FacultyService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faculties")
@CrossOrigin(origins = "*")
public class FacultyController {

    @Autowired
    private FacultyService facultyService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        try {
            FacultyResponse response = facultyService.register(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        try {
            LoginResponse response = facultyService.login(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @GetMapping("/faculty-id/{facultyId}")
    public ResponseEntity<?> getByFacultyId(@PathVariable String facultyId) {
        try {
            return ResponseEntity.ok(facultyService.getByFacultyId(facultyId));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<FacultyResponse>> getAllFaculties() {
        return ResponseEntity.ok(facultyService.getAllFaculties());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFaculty(@PathVariable String id) {
        facultyService.deleteFaculty(id);
        return ResponseEntity.ok("Faculty deleted successfully");
    }
}