package com.sms.my_sms_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "inventory")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Inventory {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long itemId;
    
    private String name;
    
    private String category;
    
    private Integer quantity = 0;
    
    private Integer restockThreshold = 5;
    
    @Column(unique = true)
    private String barcode;
    
    private String description;
    
    private Double unitPrice;
}

