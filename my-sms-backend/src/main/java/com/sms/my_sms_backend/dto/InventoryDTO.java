package com.sms.my_sms_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InventoryDTO {
    private Long itemId;
    private String name;
    private String category;
    private Integer quantity;
    private Integer restockThreshold;
    private String barcode;
    private String description;
    private Double unitPrice;
}

