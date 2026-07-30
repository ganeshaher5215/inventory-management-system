package com.ganesh.inventory_backend.repository;

import com.ganesh.inventory_backend.entity.StockTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StockTransactionRepository extends JpaRepository<StockTransaction, Long> {
    List<StockTransaction> findByProductId(Long productId);
}