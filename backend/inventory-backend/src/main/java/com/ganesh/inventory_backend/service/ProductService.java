package com.ganesh.inventory_backend.service;

import com.ganesh.inventory_backend.dto.ProductRequest;
import com.ganesh.inventory_backend.dto.ProductResponse;
import com.ganesh.inventory_backend.entity.Product;
import com.ganesh.inventory_backend.exception.ResourceNotFoundException;
import com.ganesh.inventory_backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private static final int LOW_STOCK_THRESHOLD = 10;

    private final ProductRepository productRepository;

    public List<ProductResponse> getAllProducts() {
        return productRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    public ProductResponse getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        return toResponse(product);
    }

    public List<ProductResponse> getLowStockProducts() {
        return productRepository.findLowStockProducts(LOW_STOCK_THRESHOLD).stream()
                .map(this::toResponse)
                .toList();
    }

    public ProductResponse createProduct(ProductRequest request) {
        if (productRepository.existsBySku(request.getSku())) {
            throw new IllegalArgumentException("Product with SKU already exists: " + request.getSku());
        }
        Product product = Product.builder()
                .name(request.getName())
                .sku(request.getSku())
                .category(request.getCategory())
                .quantity(request.getQuantity())
                .price(request.getPrice())
                .supplierName(request.getSupplierName())
                .build();
        Product saved = productRepository.save(product);
        return toResponse(saved);
    }

    public ProductResponse updateProduct(Long id, ProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));

        product.setName(request.getName());
        product.setSku(request.getSku());
        product.setCategory(request.getCategory());
        product.setQuantity(request.getQuantity());
        product.setPrice(request.getPrice());
        product.setSupplierName(request.getSupplierName());

        Product updated = productRepository.save(product);
        return toResponse(updated);
    }

    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Product not found with id: " + id);
        }
        productRepository.deleteById(id);
    }

    private ProductResponse toResponse(Product product) {
        return new ProductResponse(
                product.getId(),
                product.getName(),
                product.getSku(),
                product.getCategory(),
                product.getQuantity(),
                product.getPrice(),
                product.getSupplierName());
    }
}