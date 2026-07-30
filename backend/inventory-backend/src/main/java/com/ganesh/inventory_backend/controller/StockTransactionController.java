package com.ganesh.inventory_backend.controller;

import com.ganesh.inventory_backend.dto.StockTransactionRequest;
import com.ganesh.inventory_backend.dto.StockTransactionResponse;
import com.ganesh.inventory_backend.service.StockTransactionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stock-transactions")
@RequiredArgsConstructor
public class StockTransactionController {

   private final StockTransactionService stockTransactionService;

   @GetMapping
   public ResponseEntity<List<StockTransactionResponse>> getAll() {
      return ResponseEntity.ok(stockTransactionService.getAllTransactions());
   }

   @GetMapping("/product/{productId}")
   public ResponseEntity<List<StockTransactionResponse>> getByProduct(@PathVariable Long productId) {
      return ResponseEntity.ok(stockTransactionService.getTransactionsByProduct(productId));
   }

   @PostMapping
   @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
   public ResponseEntity<StockTransactionResponse> create(@Valid @RequestBody StockTransactionRequest request) {
      return ResponseEntity.ok(stockTransactionService.createTransaction(request));
   }
}