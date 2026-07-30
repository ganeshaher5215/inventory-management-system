package com.ganesh.inventory_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DepartmentResponse {
    private Long id;
    private String name;
}