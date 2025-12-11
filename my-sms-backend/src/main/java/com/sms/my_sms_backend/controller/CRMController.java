package com.sms.my_sms_backend.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sms.my_sms_backend.dto.CRMDTO;
import com.sms.my_sms_backend.entity.CRM.InteractionType;
import com.sms.my_sms_backend.service.CRMService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/crm")
public class CRMController {

    @Autowired
    private CRMService crmService;

    @PostMapping
    public ResponseEntity<CRMDTO> createCRMInteraction(@RequestBody CRMDTO crmDTO) {
        CRMDTO createdInteraction = crmService.createCRMInteraction(crmDTO);
        return new ResponseEntity<>(createdInteraction, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<CRMDTO>> getAllCRMInteractions(
            @RequestParam(required = false) Long userId,
            @RequestParam(required = false) InteractionType interactionType,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        
        if (userId != null && startDate != null && endDate != null) {
            return ResponseEntity.ok(crmService.getCRMInteractionsByDateRange(userId, startDate, endDate));
        }
        if (userId != null) {
            return ResponseEntity.ok(crmService.getCRMInteractionsByUser(userId));
        }
        if (interactionType != null) {
            return ResponseEntity.ok(crmService.getCRMInteractionsByType(interactionType));
        }
        return ResponseEntity.ok(crmService.getAllCRMInteractions());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CRMDTO> getCRMInteractionById(@PathVariable Long id) {
        CRMDTO crm = crmService.getCRMInteractionById(id);
        return ResponseEntity.ok(crm);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CRMDTO> updateCRMInteraction(@PathVariable Long id, @RequestBody CRMDTO crmDTO) {
        CRMDTO updatedInteraction = crmService.updateCRMInteraction(id, crmDTO);
        return ResponseEntity.ok(updatedInteraction);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCRMInteraction(@PathVariable Long id) {
        if (crmService.deleteCRMInteraction(id)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}

