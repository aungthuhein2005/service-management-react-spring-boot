package com.sms.my_sms_backend.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "crm")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CRM {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long crmId;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Enumerated(EnumType.STRING)
    private InteractionType interactionType;
    
    private String interactionDetails;
    
    private LocalDateTime recordedAt;
    
    private String subject;
    
    private String outcome;
    
    @PrePersist
    protected void onCreate() {
        if (recordedAt == null) {
            recordedAt = LocalDateTime.now();
        }
    }
    
    public enum InteractionType {
        CALL, EMAIL, CHAT, MEETING
    }
}

