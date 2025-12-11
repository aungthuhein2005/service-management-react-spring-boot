package com.sms.my_sms_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.sms.my_sms_backend.dto.MobileAccessDTO;
import com.sms.my_sms_backend.service.MobileAccessService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/mobile-access")
public class MobileAccessController {

    @Autowired
    private MobileAccessService mobileAccessService;

    @PostMapping
    public ResponseEntity<MobileAccessDTO> createMobileAccess(@RequestBody MobileAccessDTO mobileAccessDTO) {
        MobileAccessDTO createdAccess = mobileAccessService.createMobileAccess(mobileAccessDTO);
        return new ResponseEntity<>(createdAccess, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<MobileAccessDTO>> getAllMobileAccess(
            @RequestParam(required = false) Long userId,
            @RequestParam(required = false) Boolean active) {
        
        if (Boolean.TRUE.equals(active)) {
            return ResponseEntity.ok(mobileAccessService.getActiveMobileAccess());
        }
        if (userId != null) {
            return ResponseEntity.ok(mobileAccessService.getMobileAccessByUser(userId));
        }
        return ResponseEntity.ok(mobileAccessService.getAllMobileAccess());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MobileAccessDTO> getMobileAccessById(@PathVariable Long id) {
        MobileAccessDTO mobileAccess = mobileAccessService.getMobileAccessById(id);
        return ResponseEntity.ok(mobileAccess);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MobileAccessDTO> updateMobileAccess(@PathVariable Long id, @RequestBody MobileAccessDTO mobileAccessDTO) {
        MobileAccessDTO updatedAccess = mobileAccessService.updateMobileAccess(id, mobileAccessDTO);
        return ResponseEntity.ok(updatedAccess);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMobileAccess(@PathVariable Long id) {
        if (mobileAccessService.deleteMobileAccess(id)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}

