package com.sms.my_sms_backend.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.sms.my_sms_backend.entity.Priority;
import com.sms.my_sms_backend.entity.Status;

public class TicketDTO {
	private Long ticket_id;
	private UserDTO user;
    private String subject;
    private String description;
    private Priority priority;
    private Status status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private UserDTO assignedTo;
    private LocalDateTime slaDueDate;
    private List<CommentDTO> comments;
    
	public List<CommentDTO> getComments() {
		return comments;
	}

	public void setComments(List<CommentDTO> comments) {
		this.comments = comments;
	}

	
    
    public TicketDTO(Long ticket_id, UserDTO user, String subject, String description, Priority priority, Status status,
			LocalDateTime createdAt, LocalDateTime updatedAt, UserDTO assignedTo, LocalDateTime slaDueDate,
			List<CommentDTO> comments) {
		super();
		this.ticket_id = ticket_id;
		this.user = user;
		this.subject = subject;
		this.description = description;
		this.priority = priority;
		this.status = status;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.assignedTo = assignedTo;
		this.slaDueDate = slaDueDate;
		this.comments = comments;
	}

	public TicketDTO() {
		// TODO Auto-generated constructor stub
	}

	public UserDTO getUser() {
		return user;
	}

	public void setUser(UserDTO user) {
		this.user = user;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Priority getPriority() {
		return priority;
	}

	public void setPriority(Priority priority) {
		this.priority = priority;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}

	public UserDTO getAssignedTo() {
		return assignedTo;
	}

	public void setAssignedTo(UserDTO assignedTo) {
		this.assignedTo = assignedTo;
	}

	public LocalDateTime getSlaDueDate() {
		return slaDueDate;
	}

	public void setSlaDueDate(LocalDateTime slaDueDate) {
		this.slaDueDate = slaDueDate;
	}

	public Long getTicket_id() {
		return ticket_id;
	}

	public void setTicket_id(Long ticket_id) {
		this.ticket_id = ticket_id;
	}
    
    
    
}
