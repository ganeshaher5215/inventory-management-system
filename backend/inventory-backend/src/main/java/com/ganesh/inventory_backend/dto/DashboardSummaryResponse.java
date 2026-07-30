package com.ganesh.inventory_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
public class DashboardSummaryResponse {
    private long totalEmployees;
    private long totalDepartments;
    private long totalProducts;
    private double totalStockValue;
    private long lowStockCount;
    private Map<String, Long> employeesPerDepartment;
    private List<ProductResponse> lowStockProducts;
    private Map<String, Long> productsPerCategory;
    private Map<String, Double> stockValuePerCategory;
}