package com.sms.my_sms_backend.dto;

import java.time.LocalDateTime;

import com.sms.my_sms_backend.entity.Asset.AssetStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssetDTO {
    private Long assetId;
    private String name;
    private String serialNumber;
    private String category;
    private AssetStatus status;
    private String location;
    private LocalDateTime lastMaintenanceDate;
    private LocalDateTime nextMaintenanceDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

