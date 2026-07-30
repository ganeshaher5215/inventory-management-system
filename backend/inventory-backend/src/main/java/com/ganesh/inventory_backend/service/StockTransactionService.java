package com.ganesh.inventory_backend.service;

import com.ganesh.inventory_backend.dto.StockTransactionRequest;
import com.ganesh.inventory_backend.dto.StockTransactionResponse;
import com.ganesh.inventory_backend.entity.Product;
import com.ganesh.inventory_backend.entity.StockTransaction;
import com.ganesh.inventory_backend.exception.InsufficientStockException;
import com.ganesh.inventory_backend.exception.ResourceNotFoundException;
import com.ganesh.inventory_backend.repository.ProductRepository;
import com.ganesh.inventory_backend.repository.StockTransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StockTransactionService {

    private final StockTransactionRepository stockTransactionRepository;
    private final ProductRepository productRepository;

    @Transactional
    public StockTransactionResponse createTransaction(StockTransactionRequest request) {
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Product not found with id: " + request.getProductId()));

        if (request.getType() == StockTransaction.TransactionType.OUT) {
            if (product.getQuantity() < request.getQuantity()) {
                throw new InsufficientStockException(
                        "Insufficient stock for product '" + product.getName() +
                        "'. Available: " + product.getQuantity() + ", Requested: " + request.getQuantity());
            }
            product.setQuantity(product.getQuantity() - request.getQuantity());
        } else {
            product.setQuantity(product.getQuantity() + request.getQuantity());
        }

        productRepository.save(product);

        StockTransaction transaction = StockTransaction.builder()
                .product(product)
                .type(request.getType())
                .quantity(request.getQuantity())
                .date(LocalDateTime.now())
                .performedBy(request.getPerformedBy())
                .build();

        StockTransaction saved = stockTransactionRepository.save(transaction);

        return toResponse(saved, product.getQuantity());
    }

    public List<StockTransactionResponse> getAllTransactions() {
        return stockTransactionRepository.findAll().stream()
                .map(t -> toResponse(t, t.getProduct().getQuantity()))
                .toList();
    }

    public List<StockTransactionResponse> getTransactionsByProduct(Long productId) {
        return stockTransactionRepository.findByProductId(productId).stream()
                .map(t -> toResponse(t, t.getProduct().getQuantity()))
                .toList();
    }

    private StockTransactionResponse toResponse(StockTransaction transaction, Integer resultingQuantity) {
        return new StockTransactionResponse(
                transaction.getId(),
                transaction.getProduct().getName(),
                transaction.getType().name(),
                transaction.getQuantity(),
                transaction.getDate(),
                transaction.getPerformedBy(),
                resultingQuantity
        );
    }
}