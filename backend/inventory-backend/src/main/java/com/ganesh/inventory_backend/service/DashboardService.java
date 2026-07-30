package com.ganesh.inventory_backend.service;

import java.util.HashMap;
import com.ganesh.inventory_backend.dto.DashboardSummaryResponse;
import com.ganesh.inventory_backend.dto.ProductResponse;
import com.ganesh.inventory_backend.entity.Product;
import com.ganesh.inventory_backend.repository.DepartmentRepository;
import com.ganesh.inventory_backend.repository.EmployeeRepository;
import com.ganesh.inventory_backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DashboardService {

   private static final int LOW_STOCK_THRESHOLD = 10;

   private final EmployeeRepository employeeRepository;
   private final DepartmentRepository departmentRepository;
   private final ProductRepository productRepository;

   public DashboardSummaryResponse getSummary() {

      long totalEmployees = employeeRepository.count();
      long totalDepartments = departmentRepository.count();
      long totalProducts = productRepository.count();

      double totalStockValue = productRepository.calculateTotalStockValue();
      long lowStockCount = productRepository.countLowStockProducts(LOW_STOCK_THRESHOLD);

      Map<String, Long> employeesPerDepartment = new LinkedHashMap<>();
      for (Object[] row : employeeRepository.countEmployeesGroupedByDepartment()) {
         String deptName = (String) row[0];
         Long count = (Long) row[1];
         employeesPerDepartment.put(deptName, count);
      }
      Map<String, Long> productsPerCategory = new LinkedHashMap<>();
      for (Object[] row : productRepository.countProductsGroupedByCategory()) {
         String category = (String) row[0];
         Long count = (Long) row[1];
         productsPerCategory.put(category != null ? category : "Uncategorized", count);
      }

      Map<String, Double> stockValuePerCategory = new LinkedHashMap<>();
      for (Object[] row : productRepository.sumStockValueGroupedByCategory()) {
         String category = (String) row[0];
         Double value = (Double) row[1];
         stockValuePerCategory.put(category != null ? category : "Uncategorized", value);
      }
      List<ProductResponse> lowStockProducts = productRepository.findLowStockProducts(LOW_STOCK_THRESHOLD)
            .stream()
            .map(this::toProductResponse)
            .toList();

      return new DashboardSummaryResponse(
            totalEmployees,
            totalDepartments,
            totalProducts,
            totalStockValue,
            lowStockCount,
            employeesPerDepartment,
            lowStockProducts,
            productsPerCategory, // new
            stockValuePerCategory // new
      );

   }

   private ProductResponse toProductResponse(Product product) {
      return new ProductResponse(
            product.getId(),
            product.getName(),
            product.getSku(),
            product.getCategory(),
            product.getQuantity(),
            product.getPrice(),
            product.getSupplierName());
   }
}