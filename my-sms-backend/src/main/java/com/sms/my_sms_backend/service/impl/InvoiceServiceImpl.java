package com.sms.my_sms_backend.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sms.my_sms_backend.dto.InvoiceDTO;
import com.sms.my_sms_backend.entity.Invoice;
import com.sms.my_sms_backend.entity.Invoice.PaymentStatus;
import com.sms.my_sms_backend.entity.Ticket;
import com.sms.my_sms_backend.entity.User;
import com.sms.my_sms_backend.repository.InvoiceRepository;
import com.sms.my_sms_backend.repository.TicketRepository;
import com.sms.my_sms_backend.repository.UserRepository;
import com.sms.my_sms_backend.service.InvoiceService;

@Service
public class InvoiceServiceImpl implements InvoiceService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TicketRepository ticketRepository;

    @Override
    public InvoiceDTO createInvoice(InvoiceDTO invoiceDTO) {
        User user = userRepository.findById(invoiceDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + invoiceDTO.getUserId()));

        Ticket ticket = null;
        if (invoiceDTO.getTicketId() != null) {
            ticket = ticketRepository.findById(invoiceDTO.getTicketId())
                    .orElseThrow(() -> new RuntimeException("Ticket not found with id: " + invoiceDTO.getTicketId()));
        }

        String invoiceNumber = invoiceDTO.getInvoiceNumber();
        if (invoiceNumber == null || invoiceNumber.isEmpty()) {
            invoiceNumber = "INV-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        }

        Invoice invoice = Invoice.builder()
                .user(user)
                .ticket(ticket)
                .totalAmount(invoiceDTO.getTotalAmount())
                .paymentStatus(invoiceDTO.getPaymentStatus() != null ? invoiceDTO.getPaymentStatus() : PaymentStatus.PENDING)
                .paymentMethod(invoiceDTO.getPaymentMethod())
                .invoiceNumber(invoiceNumber)
                .dueDate(invoiceDTO.getDueDate())
                .build();

        Invoice savedInvoice = invoiceRepository.save(invoice);
        return convertToDTO(savedInvoice);
    }

    @Override
    public InvoiceDTO getInvoiceById(Long id) {
        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Invoice not found with id: " + id));
        return convertToDTO(invoice);
    }

    @Override
    public InvoiceDTO getInvoiceByInvoiceNumber(String invoiceNumber) {
        Invoice invoice = invoiceRepository.findByInvoiceNumber(invoiceNumber)
                .orElseThrow(() -> new RuntimeException("Invoice not found with invoice number: " + invoiceNumber));
        return convertToDTO(invoice);
    }

    @Override
    public List<InvoiceDTO> getAllInvoices() {
        return invoiceRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<InvoiceDTO> getInvoicesByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        return invoiceRepository.findByUser(user).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<InvoiceDTO> getInvoicesByPaymentStatus(PaymentStatus status) {
        return invoiceRepository.findByPaymentStatus(status).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<InvoiceDTO> getInvoicesByDateRange(LocalDateTime start, LocalDateTime end) {
        return invoiceRepository.findByCreatedAtBetween(start, end).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public InvoiceDTO updateInvoice(Long id, InvoiceDTO invoiceDTO) {
        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Invoice not found with id: " + id));

        if (invoiceDTO.getTotalAmount() != null) invoice.setTotalAmount(invoiceDTO.getTotalAmount());
        if (invoiceDTO.getPaymentStatus() != null) {
            invoice.setPaymentStatus(invoiceDTO.getPaymentStatus());
            if (invoiceDTO.getPaymentStatus() == PaymentStatus.PAID && invoice.getPaidAt() == null) {
                invoice.setPaidAt(LocalDateTime.now());
            }
        }
        if (invoiceDTO.getPaymentMethod() != null) invoice.setPaymentMethod(invoiceDTO.getPaymentMethod());
        if (invoiceDTO.getDueDate() != null) invoice.setDueDate(invoiceDTO.getDueDate());

        Invoice updatedInvoice = invoiceRepository.save(invoice);
        return convertToDTO(updatedInvoice);
    }

    @Override
    public void updatePaymentStatus(Long id, PaymentStatus status) {
        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Invoice not found with id: " + id));
        invoice.setPaymentStatus(status);
        if (status == PaymentStatus.PAID && invoice.getPaidAt() == null) {
            invoice.setPaidAt(LocalDateTime.now());
        }
        invoiceRepository.save(invoice);
    }

    @Override
    public boolean deleteInvoice(Long id) {
        if (invoiceRepository.existsById(id)) {
            invoiceRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private InvoiceDTO convertToDTO(Invoice invoice) {
        return new InvoiceDTO(
                invoice.getInvoiceId(),
                invoice.getUser().getUserId(),
                invoice.getTicket() != null ? invoice.getTicket().getTicket_id() : null,
                invoice.getTotalAmount(),
                invoice.getPaymentStatus(),
                invoice.getPaymentMethod(),
                invoice.getInvoiceNumber(),
                invoice.getCreatedAt(),
                invoice.getDueDate(),
                invoice.getPaidAt()
        );
    }
}

