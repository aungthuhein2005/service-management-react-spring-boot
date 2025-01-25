package com.sms.my_sms_backend.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.sms.my_sms_backend.dto.TicketDTO;
import com.sms.my_sms_backend.entity.Ticket;

public interface TicketService {

	public Ticket saveTicket(TicketDTO ticketDTO);
	public Page<Ticket> getAllTickets(Pageable pageable);
	public Ticket findTicketById(Long id);
	public Ticket updateTicket(Long id,TicketDTO ticketDTO);
	public boolean deleteTicket(Long id);
	
}
