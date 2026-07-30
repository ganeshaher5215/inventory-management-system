package com.ganesh.inventory_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class EmployeeResponse {
   private Long id;
   private String name;
   private String departmentName;
   private String designation;
   private Double salary;
   private LocalDate joiningDate;
}