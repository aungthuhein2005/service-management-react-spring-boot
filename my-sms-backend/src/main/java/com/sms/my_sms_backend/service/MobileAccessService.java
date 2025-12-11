package com.sms.my_sms_backend.service;

import java.util.List;

import com.sms.my_sms_backend.dto.MobileAccessDTO;

public interface MobileAccessService {
    MobileAccessDTO createMobileAccess(MobileAccessDTO mobileAccessDTO);
    MobileAccessDTO getMobileAccessById(Long id);
    List<MobileAccessDTO> getAllMobileAccess();
    List<MobileAccessDTO> getMobileAccessByUser(Long userId);
    List<MobileAccessDTO> getActiveMobileAccess();
    MobileAccessDTO updateMobileAccess(Long id, MobileAccessDTO mobileAccessDTO);
    boolean deleteMobileAccess(Long id);
}

