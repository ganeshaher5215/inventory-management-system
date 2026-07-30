package com.ganesh.inventory_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class StockTransactionResponse {
    private Long id;
    private String productName;
    private String type;
    private Integer quantity;
    private LocalDateTime date;
    private String performedBy;
    private Integer resultingProductQuantity;
}