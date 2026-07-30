package com.ganesh.inventory_backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.time.LocalDate;

@Data
public class EmployeeRequest {

   @NotBlank(message = "Name is required")
   private String name;

   @NotNull(message = "Department ID is required")
   private Long departmentId;

   private String designation;

   @Positive(message = "Salary must be positive")
   private Double salary;

   private LocalDate joiningDate;
}