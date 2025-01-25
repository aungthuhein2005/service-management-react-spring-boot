package com.sms.my_sms_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sms.my_sms_backend.entity.Status;
import com.sms.my_sms_backend.entity.Ticket;
import com.sms.my_sms_backend.service.impl.TicketServiceImpl;
import com.sms.my_sms_backend.dto.CommentDTO;
import com.sms.my_sms_backend.dto.CreateTicketDTO;
import com.sms.my_sms_backend.dto.TicketDTO;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/tickets")
public class TicketController {

	@Autowired
	private TicketServiceImpl ticketServiceImpl;

	@PostMapping
	public ResponseEntity<TicketDTO> createTicket(@RequestBody CreateTicketDTO ticketDTO) {
		TicketDTO createdTicket = ticketServiceImpl.saveTicket(ticketDTO);
		return new ResponseEntity<>(createdTicket, HttpStatus.CREATED);
	}

	@GetMapping
	public ResponseEntity<Page<TicketDTO>> getAllTickets(@RequestParam(defaultValue = "0") int page, // Default page = 0
			@RequestParam(defaultValue = "10") int size, // Default size = 10
			Pageable pageable) {
		Page<TicketDTO> tickets = ticketServiceImpl.getAllTickets(Pageable.ofSize(size).withPage(page));
		return ResponseEntity.ok(tickets);
	}

	@GetMapping("/{id}")
	public ResponseEntity<TicketDTO> getTicketById(@PathVariable Long id) {
		TicketDTO ticket = ticketServiceImpl.findTicketById(id);
		if (ticket != null) {
			return new ResponseEntity<>(ticket, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<TicketDTO> updateTicket(@PathVariable Long id, @RequestBody CreateTicketDTO ticketDTO) {
		TicketDTO updatedTicket = ticketServiceImpl.updateTicket(id, ticketDTO);
		if (updatedTicket != null) {
			return new ResponseEntity<>(updatedTicket, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
		
	
	 @PatchMapping("/{ticketId}/status")
	    public ResponseEntity<Void> changeTicketStatus(@PathVariable Long ticketId, @RequestBody Status newStatus) {
	       ticketServiceImpl.changeTicketStatus(ticketId, newStatus);
	        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	    }


	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteTicket(@PathVariable Long id) {
		if (ticketServiceImpl.deleteTicket(id)) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/{ticketId}/comments")
	public ResponseEntity<CommentDTO> createComment(@PathVariable Long ticketId, @RequestParam Long userId,
			@RequestParam String comment) {
		CommentDTO createdComment = ticketServiceImpl.saveTicketComment(ticketId, userId, comment);
		return new ResponseEntity<>(createdComment, HttpStatus.CREATED);
	}

	@PutMapping("/{ticketId}/comments/{commentId}")
	public ResponseEntity<CommentDTO> updateComment(@PathVariable Long ticketId, @PathVariable Long commentId,
			@RequestParam String comment) {
		CommentDTO updatedComment = ticketServiceImpl.updateTicketComment(ticketId, commentId, comment);
		if (updatedComment != null) {
			return new ResponseEntity<>(updatedComment, HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/comments/{commentId}")
	public ResponseEntity<Void> deleteTicketComment(@PathVariable Long commentId) {
		if (ticketServiceImpl.deleteTicketComment(commentId)) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
