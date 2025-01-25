package com.sms.my_sms_backend.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.sms.my_sms_backend.dto.CommentDTO;
import com.sms.my_sms_backend.dto.CreateTicketDTO;
import com.sms.my_sms_backend.dto.TicketDTO;
import com.sms.my_sms_backend.entity.Priority;
import com.sms.my_sms_backend.entity.Status;

public interface TicketService {

	public TicketDTO saveTicket(CreateTicketDTO createTicketDTO);
	public Page<TicketDTO> getAllTickets(Pageable pageable);
	public TicketDTO findTicketById(Long id);
	public TicketDTO updateTicket(Long id,CreateTicketDTO createTicketDTO);
	public void changeTicketStatus(Long id,Status status);
	public void changeTicketPriority(Long id,Priority priority);
	public boolean deleteTicket(Long id);
	
	public CommentDTO saveTicketComment(Long ticketId,Long userId,String comment);
	public CommentDTO updateTicketComment(Long ticketId,Long commentId, String comment);
	public boolean deleteTicketComment(Long commentId);
	
}
