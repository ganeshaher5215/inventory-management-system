package com.ganesh.inventory_backend.repository;

import com.ganesh.inventory_backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {

   Optional<Product> findBySku(String sku);

   boolean existsBySku(String sku);

   @Query("SELECT COALESCE(SUM(p.price * p.quantity), 0) FROM Product p")
   Double calculateTotalStockValue();

   @Query("SELECT p.category AS category, COUNT(p) AS productCount " +
         "FROM Product p GROUP BY p.category")
   List<Object[]> countProductsGroupedByCategory();

   @Query("SELECT p.category AS category, COALESCE(SUM(p.price * p.quantity), 0) AS stockValue " +
         "FROM Product p GROUP BY p.category")
   List<Object[]> sumStockValueGroupedByCategory();

   @Query("SELECT COUNT(p) FROM Product p WHERE p.quantity < :threshold")
   long countLowStockProducts(int threshold);

   @Query("SELECT p FROM Product p WHERE p.quantity < :threshold")
   List<Product> findLowStockProducts(int threshold);
}