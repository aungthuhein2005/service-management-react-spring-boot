package com.sms.my_sms_backend.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.sms.my_sms_backend.entity.Invoice.PaymentMethod;
import com.sms.my_sms_backend.entity.Invoice.PaymentStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InvoiceDTO {
    private Long invoiceId;
    private Long userId;
    private Long ticketId;
    private BigDecimal totalAmount;
    private PaymentStatus paymentStatus;
    private PaymentMethod paymentMethod;
    private String invoiceNumber;
    private LocalDateTime createdAt;
    private LocalDateTime dueDate;
    private LocalDateTime paidAt;
}

