package com.sms.my_sms_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.sms.my_sms_backend.entity.Inventory;

import java.util.List;
import java.util.Optional;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long>, PagingAndSortingRepository<Inventory, Long> {
    Optional<Inventory> findByBarcode(String barcode);
    List<Inventory> findByCategory(String category);
    List<Inventory> findByQuantityLessThan(Integer threshold);
}

