package com.ganesh.inventory_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProductResponse {
    private Long id;
    private String name;
    private String sku;
    private String category;
    private Integer quantity;
    private Double price;
    private String supplierName;
}