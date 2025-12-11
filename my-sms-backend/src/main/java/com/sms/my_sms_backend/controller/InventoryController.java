package com.sms.my_sms_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sms.my_sms_backend.dto.InventoryDTO;
import com.sms.my_sms_backend.service.InventoryService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    @PostMapping
    public ResponseEntity<InventoryDTO> createInventoryItem(@RequestBody InventoryDTO inventoryDTO) {
        InventoryDTO createdItem = inventoryService.createInventoryItem(inventoryDTO);
        return new ResponseEntity<>(createdItem, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<InventoryDTO>> getAllInventoryItems(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Boolean lowStock) {
        
        if (Boolean.TRUE.equals(lowStock)) {
            return ResponseEntity.ok(inventoryService.getLowStockItems());
        }
        if (category != null) {
            return ResponseEntity.ok(inventoryService.getInventoryItemsByCategory(category));
        }
        return ResponseEntity.ok(inventoryService.getAllInventoryItems());
    }

    @GetMapping("/{id}")
    public ResponseEntity<InventoryDTO> getInventoryItemById(@PathVariable Long id) {
        InventoryDTO item = inventoryService.getInventoryItemById(id);
        return ResponseEntity.ok(item);
    }

    @GetMapping("/barcode/{barcode}")
    public ResponseEntity<InventoryDTO> getInventoryItemByBarcode(@PathVariable String barcode) {
        InventoryDTO item = inventoryService.getInventoryItemByBarcode(barcode);
        return ResponseEntity.ok(item);
    }

    @PutMapping("/{id}")
    public ResponseEntity<InventoryDTO> updateInventoryItem(@PathVariable Long id, @RequestBody InventoryDTO inventoryDTO) {
        InventoryDTO updatedItem = inventoryService.updateInventoryItem(id, inventoryDTO);
        return ResponseEntity.ok(updatedItem);
    }

    @PatchMapping("/{id}/quantity")
    public ResponseEntity<InventoryDTO> updateQuantity(@PathVariable Long id, @RequestParam Integer quantity) {
        InventoryDTO updatedItem = inventoryService.updateQuantity(id, quantity);
        return ResponseEntity.ok(updatedItem);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInventoryItem(@PathVariable Long id) {
        if (inventoryService.deleteInventoryItem(id)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}

