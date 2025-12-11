package com.sms.my_sms_backend.service;

import java.util.List;

import com.sms.my_sms_backend.dto.TaskDTO;
import com.sms.my_sms_backend.entity.Task.TaskStatus;
import com.sms.my_sms_backend.entity.Task.ApprovalStatus;

public interface TaskService {
    TaskDTO createTask(TaskDTO taskDTO);
    TaskDTO getTaskById(Long id);
    List<TaskDTO> getAllTasks();
    List<TaskDTO> getTasksByTicketId(Long ticketId);
    List<TaskDTO> getTasksByAssignedTo(Long userId);
    List<TaskDTO> getTasksByStatus(TaskStatus status);
    TaskDTO updateTask(Long id, TaskDTO taskDTO);
    void updateTaskStatus(Long id, TaskStatus status);
    void updateApprovalStatus(Long id, ApprovalStatus approvalStatus);
    boolean deleteTask(Long id);
}

