package com.sms.my_sms_backend.dto;

import java.time.LocalDateTime;

import com.sms.my_sms_backend.entity.Task.ApprovalStatus;
import com.sms.my_sms_backend.entity.Task.TaskStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskDTO {
    private Long taskId;
    private Long ticketId;
    private UserDTO assignedTo;
    private String description;
    private TaskStatus status;
    private LocalDateTime dueDate;
    private ApprovalStatus approvalStatus;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

