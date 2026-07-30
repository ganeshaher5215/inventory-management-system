package com.ganesh.inventory_backend.service;

import com.ganesh.inventory_backend.dto.DepartmentRequest;
import com.ganesh.inventory_backend.dto.DepartmentResponse;
import com.ganesh.inventory_backend.entity.Department;
import com.ganesh.inventory_backend.exception.ResourceNotFoundException;
import com.ganesh.inventory_backend.repository.DepartmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DepartmentService {

    private final DepartmentRepository departmentRepository;

    public List<DepartmentResponse> getAllDepartments() {
        return departmentRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    public DepartmentResponse getDepartmentById(Long id) {
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with id: " + id));
        return toResponse(department);
    }

    public DepartmentResponse createDepartment(DepartmentRequest request) {
        if (departmentRepository.existsByName(request.getName())) {
            throw new IllegalArgumentException("Department already exists: " + request.getName());
        }
        Department department = Department.builder()
                .name(request.getName())
                .build();
        Department saved = departmentRepository.save(department);
        return toResponse(saved);
    }

    public DepartmentResponse updateDepartment(Long id, DepartmentRequest request) {
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with id: " + id));
        department.setName(request.getName());
        Department updated = departmentRepository.save(department);
        return toResponse(updated);
    }

    public void deleteDepartment(Long id) {
        if (!departmentRepository.existsById(id)) {
            throw new ResourceNotFoundException("Department not found with id: " + id);
        }
        departmentRepository.deleteById(id);
    }

    private DepartmentResponse toResponse(Department department) {
        return new DepartmentResponse(department.getId(), department.getName());
    }
}