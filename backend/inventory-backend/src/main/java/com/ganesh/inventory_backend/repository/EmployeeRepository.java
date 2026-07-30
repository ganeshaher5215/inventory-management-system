package com.ganesh.inventory_backend.repository;

import com.ganesh.inventory_backend.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Map;
import org.springframework.data.jpa.repository.Query;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
   List<Employee> findByDepartmentId(Long departmentId);

   @Query("SELECT e.department.name AS deptName, COUNT(e) AS empCount " +
         "FROM Employee e GROUP BY e.department.name")
   List<Object[]> countEmployeesGroupedByDepartment();
}