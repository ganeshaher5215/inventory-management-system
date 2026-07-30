package com.ganesh.inventory_backend.controller;

import com.ganesh.inventory_backend.dto.EmployeeRequest;
import com.ganesh.inventory_backend.dto.EmployeeResponse;
import com.ganesh.inventory_backend.service.EmployeeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
public class EmployeeController {

   private final EmployeeService employeeService;

   @GetMapping
   public ResponseEntity<List<EmployeeResponse>> getAll() {
      return ResponseEntity.ok(employeeService.getAllEmployees());
   }

   @GetMapping("/{id}")
   public ResponseEntity<EmployeeResponse> getById(@PathVariable Long id) {
      return ResponseEntity.ok(employeeService.getEmployeeById(id));
   }

   @GetMapping("/department/{departmentId}")
   public ResponseEntity<List<EmployeeResponse>> getByDepartment(@PathVariable Long departmentId) {
      return ResponseEntity.ok(employeeService.getEmployeesByDepartment(departmentId));
   }

   @PostMapping
   @PreAuthorize("hasRole('ADMIN')")
   public ResponseEntity<EmployeeResponse> create(@Valid @RequestBody EmployeeRequest request) {
      return ResponseEntity.ok(employeeService.createEmployee(request));
   }

   @PutMapping("/{id}")
   @PreAuthorize("hasRole('ADMIN')")
   public ResponseEntity<EmployeeResponse> update(@PathVariable Long id, @Valid @RequestBody EmployeeRequest request) {
      return ResponseEntity.ok(employeeService.updateEmployee(id, request));
   }

   @DeleteMapping("/{id}")
   @PreAuthorize("hasRole('ADMIN')")
   public ResponseEntity<Void> delete(@PathVariable Long id) {
      employeeService.deleteEmployee(id);
      return ResponseEntity.noContent().build();
   }
}