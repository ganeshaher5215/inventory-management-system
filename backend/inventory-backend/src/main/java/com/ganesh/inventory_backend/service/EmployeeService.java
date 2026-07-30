package com.ganesh.inventory_backend.service;

import com.ganesh.inventory_backend.dto.EmployeeRequest;
import com.ganesh.inventory_backend.dto.EmployeeResponse;
import com.ganesh.inventory_backend.entity.Department;
import com.ganesh.inventory_backend.entity.Employee;
import com.ganesh.inventory_backend.exception.ResourceNotFoundException;
import com.ganesh.inventory_backend.repository.DepartmentRepository;
import com.ganesh.inventory_backend.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeService {

   private final EmployeeRepository employeeRepository;
   private final DepartmentRepository departmentRepository;

   public List<EmployeeResponse> getAllEmployees() {
      return employeeRepository.findAll().stream()
            .map(this::toResponse)
            .toList();
   }

   public EmployeeResponse getEmployeeById(Long id) {
      Employee employee = employeeRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));
      return toResponse(employee);
   }

   public List<EmployeeResponse> getEmployeesByDepartment(Long departmentId) {
      return employeeRepository.findByDepartmentId(departmentId).stream()
            .map(this::toResponse)
            .toList();
   }

   public EmployeeResponse createEmployee(EmployeeRequest request) {
      Department department = departmentRepository.findById(request.getDepartmentId())
            .orElseThrow(() -> new ResourceNotFoundException(
                  "Department not found with id: " + request.getDepartmentId()));

      Employee employee = Employee.builder()
            .name(request.getName())
            .department(department)
            .designation(request.getDesignation())
            .salary(request.getSalary())
            .joiningDate(request.getJoiningDate())
            .build();

      Employee saved = employeeRepository.save(employee);
      return toResponse(saved);
   }

   public EmployeeResponse updateEmployee(Long id, EmployeeRequest request) {
      Employee employee = employeeRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));

      Department department = departmentRepository.findById(request.getDepartmentId())
            .orElseThrow(() -> new ResourceNotFoundException(
                  "Department not found with id: " + request.getDepartmentId()));

      employee.setName(request.getName());
      employee.setDepartment(department);
      employee.setDesignation(request.getDesignation());
      employee.setSalary(request.getSalary());
      employee.setJoiningDate(request.getJoiningDate());

      Employee updated = employeeRepository.save(employee);
      return toResponse(updated);
   }

   public void deleteEmployee(Long id) {
      if (!employeeRepository.existsById(id)) {
         throw new ResourceNotFoundException("Employee not found with id: " + id);
      }
      employeeRepository.deleteById(id);
   }

   private EmployeeResponse toResponse(Employee employee) {
      return new EmployeeResponse(
            employee.getId(),
            employee.getName(),
            employee.getDepartment() != null ? employee.getDepartment().getName() : null,
            employee.getDesignation(),
            employee.getSalary(),
            employee.getJoiningDate());
   }
}