package com.ganesh.inventory_backend.repository;

import com.ganesh.inventory_backend.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
    boolean existsByName(String name);
}