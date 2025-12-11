package com.sms.my_sms_backend.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sms.my_sms_backend.dto.InventoryDTO;
import com.sms.my_sms_backend.entity.Inventory;
import com.sms.my_sms_backend.repository.InventoryRepository;
import com.sms.my_sms_backend.service.InventoryService;

@Service
public class InventoryServiceImpl implements InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

    @Override
    public InventoryDTO createInventoryItem(InventoryDTO inventoryDTO) {
        Inventory inventory = Inventory.builder()
                .name(inventoryDTO.getName())
                .category(inventoryDTO.getCategory())
                .quantity(inventoryDTO.getQuantity() != null ? inventoryDTO.getQuantity() : 0)
                .restockThreshold(inventoryDTO.getRestockThreshold() != null ? inventoryDTO.getRestockThreshold() : 5)
                .barcode(inventoryDTO.getBarcode())
                .description(inventoryDTO.getDescription())
                .unitPrice(inventoryDTO.getUnitPrice())
                .build();

        Inventory savedInventory = inventoryRepository.save(inventory);
        return convertToDTO(savedInventory);
    }

    @Override
    public InventoryDTO getInventoryItemById(Long id) {
        Inventory inventory = inventoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inventory item not found with id: " + id));
        return convertToDTO(inventory);
    }

    @Override
    public InventoryDTO getInventoryItemByBarcode(String barcode) {
        Inventory inventory = inventoryRepository.findByBarcode(barcode)
                .orElseThrow(() -> new RuntimeException("Inventory item not found with barcode: " + barcode));
        return convertToDTO(inventory);
    }

    @Override
    public List<InventoryDTO> getAllInventoryItems() {
        return inventoryRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<InventoryDTO> getInventoryItemsByCategory(String category) {
        return inventoryRepository.findByCategory(category).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<InventoryDTO> getLowStockItems() {
        return inventoryRepository.findAll().stream()
                .filter(item -> item.getQuantity() < item.getRestockThreshold())
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public InventoryDTO updateInventoryItem(Long id, InventoryDTO inventoryDTO) {
        Inventory inventory = inventoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inventory item not found with id: " + id));

        if (inventoryDTO.getName() != null) inventory.setName(inventoryDTO.getName());
        if (inventoryDTO.getCategory() != null) inventory.setCategory(inventoryDTO.getCategory());
        if (inventoryDTO.getQuantity() != null) inventory.setQuantity(inventoryDTO.getQuantity());
        if (inventoryDTO.getRestockThreshold() != null) inventory.setRestockThreshold(inventoryDTO.getRestockThreshold());
        if (inventoryDTO.getBarcode() != null) inventory.setBarcode(inventoryDTO.getBarcode());
        if (inventoryDTO.getDescription() != null) inventory.setDescription(inventoryDTO.getDescription());
        if (inventoryDTO.getUnitPrice() != null) inventory.setUnitPrice(inventoryDTO.getUnitPrice());

        Inventory updatedInventory = inventoryRepository.save(inventory);
        return convertToDTO(updatedInventory);
    }

    @Override
    public InventoryDTO updateQuantity(Long id, Integer quantity) {
        Inventory inventory = inventoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inventory item not found with id: " + id));
        inventory.setQuantity(quantity);
        Inventory updatedInventory = inventoryRepository.save(inventory);
        return convertToDTO(updatedInventory);
    }

    @Override
    public boolean deleteInventoryItem(Long id) {
        if (inventoryRepository.existsById(id)) {
            inventoryRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private InventoryDTO convertToDTO(Inventory inventory) {
        return new InventoryDTO(
                inventory.getItemId(),
                inventory.getName(),
                inventory.getCategory(),
                inventory.getQuantity(),
                inventory.getRestockThreshold(),
                inventory.getBarcode(),
                inventory.getDescription(),
                inventory.getUnitPrice()
        );
    }
}

