package com.sms.my_sms_backend.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "reports")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Report {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reportId;
    
    @Enumerated(EnumType.STRING)
    private ReportType reportType;
    
    private LocalDateTime generatedAt;
    
    @Column(columnDefinition = "TEXT")
    private String data; // JSON data stored as text
    
    private String title;
    
    private String description;
    
    @PrePersist
    protected void onCreate() {
        if (generatedAt == null) {
            generatedAt = LocalDateTime.now();
        }
    }
    
    public enum ReportType {
        PERFORMANCE, REVENUE, CUSTOMER_SATISFACTION, ASSET_UTILIZATION, TICKET_ANALYTICS
    }
}

