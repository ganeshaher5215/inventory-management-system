package com.ganesh.inventory_backend.dto;

import com.ganesh.inventory_backend.entity.StockTransaction;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class StockTransactionRequest {

    @NotNull(message = "Product ID is required")
    private Long productId;

    @NotNull(message = "Transaction type is required")
    private StockTransaction.TransactionType type; // IN or OUT

    @NotNull(message = "Quantity is required")
    @Positive(message = "Quantity must be greater than zero")
    private Integer quantity;

    private String performedBy;
}