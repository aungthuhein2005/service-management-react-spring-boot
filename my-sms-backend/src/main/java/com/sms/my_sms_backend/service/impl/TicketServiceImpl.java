package com.sms.my_sms_backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.sms.my_sms_backend.dto.TicketDTO;
import com.sms.my_sms_backend.entity.Ticket;
import com.sms.my_sms_backend.entity.User;
import com.sms.my_sms_backend.repository.TicketRepository;
import com.sms.my_sms_backend.repository.UserRepository;
import com.sms.my_sms_backend.service.TicketService;

@Service
public class TicketServiceImpl implements TicketService{
	
	@Autowired
	private TicketRepository ticketRepository;
	
	@Autowired
	private UserRepository userRepository;

	@Override
	public Ticket saveTicket(TicketDTO ticketDTO) {
		// TODO Auto-generated method stub
		User user = userRepository.findById(ticketDTO.getUserId())
				.orElseThrow(()->new RuntimeException("User not found with id "+ticketDTO.getUserId()));
		User assignedTo = userRepository.findById(ticketDTO.getAssignedTo())
				.orElseThrow(()->new RuntimeException("User not found with id "+ticketDTO.getAssignedTo()));
		
		Ticket newTicket = new Ticket();
	    newTicket.setSubject(ticketDTO.getSubject());
	    newTicket.setDescription(ticketDTO.getDescription());
	    newTicket.setPriority(ticketDTO.getPriority());
	    newTicket.setStatus(ticketDTO.getStatus());
	    newTicket.setUser(user);
	    newTicket.setAssignedTo(assignedTo);
	    newTicket.setSlaDueDate(ticketDTO.getSlaDueDate());
		return ticketRepository.save(newTicket);
	}

	@Override
	public Page<Ticket> getAllTickets(Pageable pageable) {
		// TODO Auto-generated method stub
		return ticketRepository.findAll(pageable);
	}

	@Override
	public Ticket findTicketById(Long id) {
		// TODO Auto-generated method stub
		return ticketRepository.findById(id).orElse(null);
	}

	@Override
	public Ticket updateTicket(Long id, TicketDTO ticketDTO) {
		// TODO Auto-generated method stub
		Ticket existingTicket = ticketRepository.findById(id)
		        .orElseThrow(() -> new RuntimeException("Ticket not found with id: " + id));

		    existingTicket.setSubject(ticketDTO.getSubject());
		    existingTicket.setDescription(ticketDTO.getDescription());
		    existingTicket.setPriority(ticketDTO.getPriority());
		    existingTicket.setStatus(ticketDTO.getStatus());

		    // Fetch the assigned user from the database
		    User assignedTo = userRepository.findById(ticketDTO.getAssignedTo())
		        .orElseThrow(() -> new RuntimeException("Assigned user not found with id: " + ticketDTO.getAssignedTo()));

		    existingTicket.setAssignedTo(assignedTo);

		    return ticketRepository.save(existingTicket);
	}

	@Override
	public boolean deleteTicket(Long id) {
	    if (ticketRepository.findById(id).isPresent()) {
	        ticketRepository.deleteById(id);
	        return true;
	    } else {
	        return false;
	    }
	}


}
