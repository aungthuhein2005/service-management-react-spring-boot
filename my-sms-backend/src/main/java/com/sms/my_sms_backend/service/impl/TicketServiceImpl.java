package com.sms.my_sms_backend.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.sms.my_sms_backend.dto.CommentDTO;
import com.sms.my_sms_backend.dto.CreateTicketDTO;
import com.sms.my_sms_backend.dto.TicketDTO;
import com.sms.my_sms_backend.dto.UserDTO;
import com.sms.my_sms_backend.entity.Comment;
import com.sms.my_sms_backend.entity.Priority;
import com.sms.my_sms_backend.entity.Status;
import com.sms.my_sms_backend.entity.Ticket;
import com.sms.my_sms_backend.entity.User;
import com.sms.my_sms_backend.repository.CommentRepository;
import com.sms.my_sms_backend.repository.TicketRepository;
import com.sms.my_sms_backend.repository.UserRepository;
import com.sms.my_sms_backend.service.TicketService;

@Service
public class TicketServiceImpl implements TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private CommentRepository commentRepository;

    @Override
    public TicketDTO saveTicket(CreateTicketDTO ticketDTO) {
        User user = userRepository.findById(ticketDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with id " + ticketDTO.getUserId()));

        User assignedTo = userRepository.findById(ticketDTO.getAssignedTo())
                .orElseThrow(() -> new RuntimeException("User not found with id " + ticketDTO.getAssignedTo()));

        Ticket newTicket = new Ticket();
        newTicket.setSubject(ticketDTO.getSubject());
        newTicket.setDescription(ticketDTO.getDescription());
        newTicket.setPriority(ticketDTO.getPriority());
        newTicket.setStatus(ticketDTO.getStatus());
        newTicket.setUser(user);
        newTicket.setAssignedTo(assignedTo);
        newTicket.setSlaDueDate(ticketDTO.getSlaDueDate());

        Ticket savedTicket = ticketRepository.save(newTicket);
        return convertToDTO(savedTicket);
    }

    @Override
    public Page<TicketDTO> getAllTickets(Pageable pageable) {
        Page<Ticket> ticketPage = ticketRepository.findAll(pageable);
        return ticketPage.map(ticket -> convertToDTO(ticket));
    }


    @Override
    public TicketDTO findTicketById(Long id) {
        return ticketRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new RuntimeException("Ticket not found with id " + id));
    }

    @Override
    public TicketDTO updateTicket(Long id, CreateTicketDTO ticketDTO) {
        Ticket existingTicket = ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found with id: " + id));

        existingTicket.setSubject(ticketDTO.getSubject());
        existingTicket.setDescription(ticketDTO.getDescription());
        existingTicket.setPriority(ticketDTO.getPriority());
        existingTicket.setStatus(ticketDTO.getStatus());

        User assignedTo = userRepository.findById(ticketDTO.getAssignedTo())
                .orElseThrow(() -> new RuntimeException("Assigned user not found with id: " + ticketDTO.getAssignedTo()));

        existingTicket.setAssignedTo(assignedTo);

        Ticket updatedTicket = ticketRepository.save(existingTicket);
        return convertToDTO(updatedTicket);
    }

    @Override
    public boolean deleteTicket(Long id) {
        if (ticketRepository.existsById(id)) {
            ticketRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Convert Ticket Entity to TicketDTO
    private TicketDTO convertToDTO(Ticket ticket) {
    	UserDTO user = new UserDTO(
    			ticket.getUser().getUserId(),
    			ticket.getUser().getUsername(),
    			ticket.getUser().getEmail(),
    			ticket.getUser().getRole());
    	 UserDTO assignedTo = null;
    	    if (ticket.getAssignedTo() != null) {
    	        assignedTo = new UserDTO(
    	            ticket.getAssignedTo().getUserId(),
    	            ticket.getAssignedTo().getUsername(),
    	            ticket.getAssignedTo().getEmail(),
    	            ticket.getAssignedTo().getRole()
    	        );
    	    }
    	    List<CommentDTO> comments = ticket.getComments().stream()
    	            .map(comment -> new CommentDTO(
    	                comment.getId(),
    	                comment.getText(),
    	                comment.getCreatedAt(),
    	                new UserDTO(
    	                    comment.getUser().getUserId(),
    	                    comment.getUser().getUsername(),
    	                    comment.getUser().getEmail(),
    	                    comment.getUser().getRole()
    	                )
    	            ))
    	            .collect(Collectors.toList());
        return new TicketDTO(
        		ticket.getId(),
                user,
                ticket.getSubject(),
                ticket.getDescription(),
                ticket.getPriority(),
                ticket.getStatus(),
                ticket.getCreatedAt(),
                ticket.getUpdatedAt(),
                assignedTo,
                ticket.getSlaDueDate(),
                comments
        );
    }

	@Override
	public CommentDTO saveTicketComment(Long ticketId, Long userId, String comment) {
		// TODO Auto-generated method stub
		Ticket ticket = ticketRepository.findById(ticketId).orElse(null);
		User user = userRepository.findById(userId).orElse(null);
		if(ticket == null) throw new RuntimeException("Ticket not found with id "+ticketId);
		if(user == null) throw new RuntimeException("User not found with id "+userId);
		
		Comment created = commentRepository.save(new Comment(ticket,user,comment));
		
		return new CommentDTO(
				created.getId(),
				created.getText(),
				created.getCreatedAt(),
				new UserDTO(
						user.getUserId(),
						user.getUsername(),
						user.getEmail(),
						user.getRole()
						)
				);
	}

	@Override
	public CommentDTO updateTicketComment(Long ticketId, Long commentId, String comment) {
		// TODO Auto-generated method stub
		Comment existingComment = commentRepository.findById(commentId).orElseThrow(()-> new RuntimeException("Comment not found with id "+commentId));
		existingComment.setText(comment);
		Comment updatedComment = commentRepository.save(existingComment);
		Ticket ticket = ticketRepository.findById(ticketId).orElse(null);
		User user = userRepository.findById(existingComment.getUser().getUserId()).orElse(null);
		if(ticket == null) throw new RuntimeException("Ticket not found with id "+ticketId);
		if(user == null) throw new RuntimeException("User not found with id "+existingComment.getUser().getUserId());
		
		Comment created = commentRepository.save(existingComment);
		
		return new CommentDTO(
				created.getId(),
				created.getText(),
				created.getCreatedAt(),
				new UserDTO(
						user.getUserId(),
						user.getUsername(),
						user.getEmail(),
						user.getRole()
						)
				);
	}

	@Override
	public boolean deleteTicketComment(Long commentId) {
		// TODO Auto-generated method stub
		if (commentRepository.existsById(commentId)) {
            commentRepository.deleteById(commentId);
            return true;
        }
        return false;
	}

	@Override
	public void changeTicketStatus(Long id, Status status) {
		// TODO Auto-generated method stub
		 Ticket ticket = ticketRepository.findById(id).orElseThrow(() -> new RuntimeException("Ticket not found with id " + id));
		    ticket.setStatus(status);
		    ticketRepository.save(ticket);
	}

	@Override
	public void changeTicketPriority(Long id, Priority priority) {
		// TODO Auto-generated method stub
		
	}
}
