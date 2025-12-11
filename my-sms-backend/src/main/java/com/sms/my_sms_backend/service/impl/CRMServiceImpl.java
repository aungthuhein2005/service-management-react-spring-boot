package com.sms.my_sms_backend.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sms.my_sms_backend.dto.CRMDTO;
import com.sms.my_sms_backend.entity.CRM;
import com.sms.my_sms_backend.entity.CRM.InteractionType;
import com.sms.my_sms_backend.entity.User;
import com.sms.my_sms_backend.repository.CRMRepository;
import com.sms.my_sms_backend.repository.UserRepository;
import com.sms.my_sms_backend.service.CRMService;

@Service
public class CRMServiceImpl implements CRMService {

    @Autowired
    private CRMRepository crmRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public CRMDTO createCRMInteraction(CRMDTO crmDTO) {
        User user = userRepository.findById(crmDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + crmDTO.getUserId()));

        CRM crm = CRM.builder()
                .user(user)
                .interactionType(crmDTO.getInteractionType())
                .interactionDetails(crmDTO.getInteractionDetails())
                .subject(crmDTO.getSubject())
                .outcome(crmDTO.getOutcome())
                .recordedAt(crmDTO.getRecordedAt() != null ? crmDTO.getRecordedAt() : LocalDateTime.now())
                .build();

        CRM savedCRM = crmRepository.save(crm);
        return convertToDTO(savedCRM);
    }

    @Override
    public CRMDTO getCRMInteractionById(Long id) {
        CRM crm = crmRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("CRM interaction not found with id: " + id));
        return convertToDTO(crm);
    }

    @Override
    public List<CRMDTO> getAllCRMInteractions() {
        return crmRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<CRMDTO> getCRMInteractionsByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        return crmRepository.findByUser(user).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<CRMDTO> getCRMInteractionsByType(InteractionType interactionType) {
        return crmRepository.findByInteractionType(interactionType).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<CRMDTO> getCRMInteractionsByDateRange(Long userId, LocalDateTime start, LocalDateTime end) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        return crmRepository.findByUserAndRecordedAtBetween(user, start, end).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public CRMDTO updateCRMInteraction(Long id, CRMDTO crmDTO) {
        CRM crm = crmRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("CRM interaction not found with id: " + id));

        if (crmDTO.getInteractionType() != null) crm.setInteractionType(crmDTO.getInteractionType());
        if (crmDTO.getInteractionDetails() != null) crm.setInteractionDetails(crmDTO.getInteractionDetails());
        if (crmDTO.getSubject() != null) crm.setSubject(crmDTO.getSubject());
        if (crmDTO.getOutcome() != null) crm.setOutcome(crmDTO.getOutcome());

        CRM updatedCRM = crmRepository.save(crm);
        return convertToDTO(updatedCRM);
    }

    @Override
    public boolean deleteCRMInteraction(Long id) {
        if (crmRepository.existsById(id)) {
            crmRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private CRMDTO convertToDTO(CRM crm) {
        return new CRMDTO(
                crm.getCrmId(),
                crm.getUser().getUserId(),
                crm.getInteractionType(),
                crm.getInteractionDetails(),
                crm.getRecordedAt(),
                crm.getSubject(),
                crm.getOutcome()
        );
    }
}

