package com.sms.my_sms_backend.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sms.my_sms_backend.dto.MobileAccessDTO;
import com.sms.my_sms_backend.entity.MobileAccess;
import com.sms.my_sms_backend.entity.User;
import com.sms.my_sms_backend.repository.MobileAccessRepository;
import com.sms.my_sms_backend.repository.UserRepository;
import com.sms.my_sms_backend.service.MobileAccessService;

@Service
public class MobileAccessServiceImpl implements MobileAccessService {

    @Autowired
    private MobileAccessRepository mobileAccessRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public MobileAccessDTO createMobileAccess(MobileAccessDTO mobileAccessDTO) {
        User user = userRepository.findById(mobileAccessDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + mobileAccessDTO.getUserId()));

        MobileAccess mobileAccess = MobileAccess.builder()
                .user(user)
                .deviceInfo(mobileAccessDTO.getDeviceInfo())
                .deviceType(mobileAccessDTO.getDeviceType())
                .ipAddress(mobileAccessDTO.getIpAddress())
                .lastAccess(mobileAccessDTO.getLastAccess() != null ? mobileAccessDTO.getLastAccess() : LocalDateTime.now())
                .isActive(mobileAccessDTO.getIsActive() != null ? mobileAccessDTO.getIsActive() : true)
                .build();

        MobileAccess savedMobileAccess = mobileAccessRepository.save(mobileAccess);
        return convertToDTO(savedMobileAccess);
    }

    @Override
    public MobileAccessDTO getMobileAccessById(Long id) {
        MobileAccess mobileAccess = mobileAccessRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mobile access not found with id: " + id));
        return convertToDTO(mobileAccess);
    }

    @Override
    public List<MobileAccessDTO> getAllMobileAccess() {
        return mobileAccessRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<MobileAccessDTO> getMobileAccessByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        return mobileAccessRepository.findByUser(user).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<MobileAccessDTO> getActiveMobileAccess() {
        return mobileAccessRepository.findByIsActive(true).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public MobileAccessDTO updateMobileAccess(Long id, MobileAccessDTO mobileAccessDTO) {
        MobileAccess mobileAccess = mobileAccessRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mobile access not found with id: " + id));

        if (mobileAccessDTO.getDeviceInfo() != null) mobileAccess.setDeviceInfo(mobileAccessDTO.getDeviceInfo());
        if (mobileAccessDTO.getDeviceType() != null) mobileAccess.setDeviceType(mobileAccessDTO.getDeviceType());
        if (mobileAccessDTO.getIpAddress() != null) mobileAccess.setIpAddress(mobileAccessDTO.getIpAddress());
        if (mobileAccessDTO.getIsActive() != null) mobileAccess.setIsActive(mobileAccessDTO.getIsActive());
        mobileAccess.setLastAccess(LocalDateTime.now());

        MobileAccess updatedMobileAccess = mobileAccessRepository.save(mobileAccess);
        return convertToDTO(updatedMobileAccess);
    }

    @Override
    public boolean deleteMobileAccess(Long id) {
        if (mobileAccessRepository.existsById(id)) {
            mobileAccessRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private MobileAccessDTO convertToDTO(MobileAccess mobileAccess) {
        return new MobileAccessDTO(
                mobileAccess.getAccessId(),
                mobileAccess.getUser().getUserId(),
                mobileAccess.getDeviceInfo(),
                mobileAccess.getDeviceType(),
                mobileAccess.getIpAddress(),
                mobileAccess.getLastAccess(),
                mobileAccess.getIsActive()
        );
    }
}

