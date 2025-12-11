package com.sms.my_sms_backend.service;

import java.util.List;

import com.sms.my_sms_backend.dto.InventoryDTO;

public interface InventoryService {
    InventoryDTO createInventoryItem(InventoryDTO inventoryDTO);
    InventoryDTO getInventoryItemById(Long id);
    InventoryDTO getInventoryItemByBarcode(String barcode);
    List<InventoryDTO> getAllInventoryItems();
    List<InventoryDTO> getInventoryItemsByCategory(String category);
    List<InventoryDTO> getLowStockItems();
    InventoryDTO updateInventoryItem(Long id, InventoryDTO inventoryDTO);
    InventoryDTO updateQuantity(Long id, Integer quantity);
    boolean deleteInventoryItem(Long id);
}

