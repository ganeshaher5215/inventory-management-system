package com.ganesh.inventory_backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

@Data
public class ProductRequest {

    @NotBlank(message = "Product name is required")
    private String name;

    @NotBlank(message = "SKU is required")
    private String sku;

    private String category;

    @NotNull(message = "Quantity is required")
    @PositiveOrZero(message = "Quantity cannot be negative")
    private Integer quantity;

    @NotNull(message = "Price is required")
    @PositiveOrZero(message = "Price cannot be negative")
    private Double price;

    private String supplierName;
}