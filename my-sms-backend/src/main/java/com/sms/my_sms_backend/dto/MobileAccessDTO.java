package com.sms.my_sms_backend.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MobileAccessDTO {
    private Long accessId;
    private Long userId;
    private String deviceInfo;
    private String deviceType;
    private String ipAddress;
    private LocalDateTime lastAccess;
    private Boolean isActive;
}

