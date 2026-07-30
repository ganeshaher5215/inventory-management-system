package com.ganesh.inventory_backend.controller;

import com.ganesh.inventory_backend.dto.ProductRequest;
import com.ganesh.inventory_backend.dto.ProductResponse;
import com.ganesh.inventory_backend.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

   private final ProductService productService;

   @GetMapping
   public ResponseEntity<List<ProductResponse>> getAll() {
      return ResponseEntity.ok(productService.getAllProducts());
   }

   @GetMapping("/{id}")
   public ResponseEntity<ProductResponse> getById(@PathVariable Long id) {
      return ResponseEntity.ok(productService.getProductById(id));
   }

   @GetMapping("/low-stock")
   public ResponseEntity<List<ProductResponse>> getLowStock() {
      return ResponseEntity.ok(productService.getLowStockProducts());
   }

   @PostMapping
   @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
   public ResponseEntity<ProductResponse> create(@Valid @RequestBody ProductRequest request) {
      return ResponseEntity.ok(productService.createProduct(request));
   }

   @PutMapping("/{id}")
   @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
   public ResponseEntity<ProductResponse> update(@PathVariable Long id, @Valid @RequestBody ProductRequest request) {
      return ResponseEntity.ok(productService.updateProduct(id, request));
   }

   @DeleteMapping("/{id}")
   @PreAuthorize("hasRole('ADMIN')")
   public ResponseEntity<Void> delete(@PathVariable Long id) {
      productService.deleteProduct(id);
      return ResponseEntity.noContent().build();
   }
}