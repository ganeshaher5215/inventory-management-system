package com.ganesh.inventory_backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "stock_transactions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StockTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @Enumerated(EnumType.STRING)
    private TransactionType type; // IN or OUT

    private Integer quantity;

    private LocalDateTime date;

    private String performedBy;

    public enum TransactionType {
        IN, OUT
    }
}