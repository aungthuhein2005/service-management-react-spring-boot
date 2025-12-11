package com.sms.my_sms_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.sms.my_sms_backend.entity.CRM;
import com.sms.my_sms_backend.entity.CRM.InteractionType;
import com.sms.my_sms_backend.entity.User;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CRMRepository extends JpaRepository<CRM, Long>, PagingAndSortingRepository<CRM, Long> {
    List<CRM> findByUser(User user);
    List<CRM> findByInteractionType(InteractionType interactionType);
    List<CRM> findByUserAndRecordedAtBetween(User user, LocalDateTime start, LocalDateTime end);
}

