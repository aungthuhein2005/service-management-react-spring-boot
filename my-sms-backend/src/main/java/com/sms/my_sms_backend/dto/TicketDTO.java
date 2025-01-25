package com.sms.my_sms_backend.dto;

import java.time.LocalDateTime;

import com.sms.my_sms_backend.entity.Priority;
import com.sms.my_sms_backend.entity.Status;

public class TicketDTO {
	  private Long userId;
	    private String subject;
	    private String description;
	    private Priority priority;
	    private Status status;
	    private LocalDateTime createdAt;
	    private LocalDateTime updatedAt;
	    private Long assignedTo;
	    private LocalDateTime slaDueDate;
		public TicketDTO(Long userId, String subject, String description, Priority priority, Status status,
				LocalDateTime createdAt, LocalDateTime updatedAt, Long assignedTo, LocalDateTime slaDueDate) {
			super();
			this.userId = userId;
			this.subject = subject;
			this.description = description;
			this.priority = priority;
			this.status = status;
			this.createdAt = createdAt;
			this.updatedAt = updatedAt;
			this.assignedTo = assignedTo;
			this.slaDueDate = slaDueDate;
		}
	    
	    public TicketDTO() {
			// TODO Auto-generated constructor stub
		}

		public Long getUserId() {
			return userId;
		}

		public void setUserId(Long userId) {
			this.userId = userId;
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

		public Long getAssignedTo() {
			return assignedTo;
		}

		public void setAssignedTo(Long assignedTo) {
			this.assignedTo = assignedTo;
		}

		public LocalDateTime getSlaDueDate() {
			return slaDueDate;
		}

		public void setSlaDueDate(LocalDateTime slaDueDate) {
			this.slaDueDate = slaDueDate;
		}
	    
	    
}
