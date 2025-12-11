package com.sms.my_sms_backend.service;

import java.time.LocalDateTime;
import java.util.List;

import com.sms.my_sms_backend.dto.CRMDTO;
import com.sms.my_sms_backend.entity.CRM.InteractionType;

public interface CRMService {
    CRMDTO createCRMInteraction(CRMDTO crmDTO);
    CRMDTO getCRMInteractionById(Long id);
    List<CRMDTO> getAllCRMInteractions();
    List<CRMDTO> getCRMInteractionsByUser(Long userId);
    List<CRMDTO> getCRMInteractionsByType(InteractionType interactionType);
    List<CRMDTO> getCRMInteractionsByDateRange(Long userId, LocalDateTime start, LocalDateTime end);
    CRMDTO updateCRMInteraction(Long id, CRMDTO crmDTO);
    boolean deleteCRMInteraction(Long id);
}

