package com.sms.my_sms_backend.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "mobile_access")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MobileAccess {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long accessId;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    private String deviceInfo;
    
    private String deviceType; // iOS, Android, etc.
    
    private String ipAddress;
    
    private LocalDateTime lastAccess;
    
    private Boolean isActive;
    
    @PrePersist
    protected void onCreate() {
        if (lastAccess == null) {
            lastAccess = LocalDateTime.now();
        }
        if (isActive == null) {
            isActive = true;
        }
    }
}

