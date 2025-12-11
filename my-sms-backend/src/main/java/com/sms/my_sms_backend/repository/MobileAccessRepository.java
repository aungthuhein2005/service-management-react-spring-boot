package com.sms.my_sms_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.sms.my_sms_backend.entity.MobileAccess;
import com.sms.my_sms_backend.entity.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface MobileAccessRepository extends JpaRepository<MobileAccess, Long>, PagingAndSortingRepository<MobileAccess, Long> {
    List<MobileAccess> findByUser(User user);
    List<MobileAccess> findByIsActive(Boolean isActive);
    Optional<MobileAccess> findByUserAndDeviceInfo(User user, String deviceInfo);
}

