package com.sms.my_sms_backend.dto;

import java.time.LocalDateTime;

import com.sms.my_sms_backend.entity.CRM.InteractionType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CRMDTO {
    private Long crmId;
    private Long userId;
    private InteractionType interactionType;
    private String interactionDetails;
    private LocalDateTime recordedAt;
    private String subject;
    private String outcome;
}

