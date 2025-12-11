package com.sms.my_sms_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.sms.my_sms_backend.entity.Invoice;
import com.sms.my_sms_backend.entity.Invoice.PaymentStatus;
import com.sms.my_sms_backend.entity.User;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Long>, PagingAndSortingRepository<Invoice, Long> {
    List<Invoice> findByUser(User user);
    List<Invoice> findByPaymentStatus(PaymentStatus status);
    Optional<Invoice> findByInvoiceNumber(String invoiceNumber);
    List<Invoice> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
}

