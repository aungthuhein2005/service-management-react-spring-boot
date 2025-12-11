package com.sms.my_sms_backend.service;

import java.time.LocalDateTime;
import java.util.List;

import com.sms.my_sms_backend.dto.InvoiceDTO;
import com.sms.my_sms_backend.entity.Invoice.PaymentStatus;

public interface InvoiceService {
    InvoiceDTO createInvoice(InvoiceDTO invoiceDTO);
    InvoiceDTO getInvoiceById(Long id);
    InvoiceDTO getInvoiceByInvoiceNumber(String invoiceNumber);
    List<InvoiceDTO> getAllInvoices();
    List<InvoiceDTO> getInvoicesByUser(Long userId);
    List<InvoiceDTO> getInvoicesByPaymentStatus(PaymentStatus status);
    List<InvoiceDTO> getInvoicesByDateRange(LocalDateTime start, LocalDateTime end);
    InvoiceDTO updateInvoice(Long id, InvoiceDTO invoiceDTO);
    void updatePaymentStatus(Long id, PaymentStatus status);
    boolean deleteInvoice(Long id);
}

