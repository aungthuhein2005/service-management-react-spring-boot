package com.sms.my_sms_backend.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sms.my_sms_backend.dto.TaskDTO;
import com.sms.my_sms_backend.dto.UserDTO;
import com.sms.my_sms_backend.entity.Task;
import com.sms.my_sms_backend.entity.Task.TaskStatus;
import com.sms.my_sms_backend.entity.Task.ApprovalStatus;
import com.sms.my_sms_backend.entity.Ticket;
import com.sms.my_sms_backend.entity.User;
import com.sms.my_sms_backend.repository.TaskRepository;
import com.sms.my_sms_backend.repository.TicketRepository;
import com.sms.my_sms_backend.repository.UserRepository;
import com.sms.my_sms_backend.service.TaskService;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public TaskDTO createTask(TaskDTO taskDTO) {
        if (taskDTO.getTicketId() == null) {
            throw new RuntimeException("Ticket ID is required");
        }
        Ticket ticket = ticketRepository.findById(taskDTO.getTicketId())
                .orElseThrow(() -> new RuntimeException("Ticket not found with id: " + taskDTO.getTicketId()));
        
        if (taskDTO.getAssignedTo() == null || taskDTO.getAssignedTo().getId() == null) {
            throw new RuntimeException("Assigned user ID is required");
        }
        User assignedTo = userRepository.findById(taskDTO.getAssignedTo().getId())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + taskDTO.getAssignedTo().getId()));

        Task task = Task.builder()
                .ticket(ticket)
                .assignedTo(assignedTo)
                .description(taskDTO.getDescription())
                .status(taskDTO.getStatus() != null ? taskDTO.getStatus() : TaskStatus.PENDING)
                .dueDate(taskDTO.getDueDate())
                .approvalStatus(taskDTO.getApprovalStatus() != null ? taskDTO.getApprovalStatus() : ApprovalStatus.PENDING)
                .build();

        Task savedTask = taskRepository.save(task);
        return convertToDTO(savedTask);
    }

    @Override
    public TaskDTO getTaskById(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
        return convertToDTO(task);
    }

    @Override
    public List<TaskDTO> getAllTasks() {
        return taskRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<TaskDTO> getTasksByTicketId(Long ticketId) {
        return taskRepository.findByTicket_TicketId(ticketId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<TaskDTO> getTasksByAssignedTo(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        return taskRepository.findByAssignedTo(user).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<TaskDTO> getTasksByStatus(TaskStatus status) {
        return taskRepository.findByStatus(status).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public TaskDTO updateTask(Long id, TaskDTO taskDTO) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));

        if (taskDTO.getDescription() != null) {
            task.setDescription(taskDTO.getDescription());
        }
        if (taskDTO.getStatus() != null) {
            task.setStatus(taskDTO.getStatus());
        }
        if (taskDTO.getDueDate() != null) {
            task.setDueDate(taskDTO.getDueDate());
        }
        if (taskDTO.getApprovalStatus() != null) {
            task.setApprovalStatus(taskDTO.getApprovalStatus());
        }
        if (taskDTO.getAssignedTo() != null) {
            User assignedTo = userRepository.findById(taskDTO.getAssignedTo().getId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            task.setAssignedTo(assignedTo);
        }

        Task updatedTask = taskRepository.save(task);
        return convertToDTO(updatedTask);
    }

    @Override
    public void updateTaskStatus(Long id, TaskStatus status) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
        task.setStatus(status);
        taskRepository.save(task);
    }

    @Override
    public void updateApprovalStatus(Long id, ApprovalStatus approvalStatus) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
        task.setApprovalStatus(approvalStatus);
        taskRepository.save(task);
    }

    @Override
    public boolean deleteTask(Long id) {
        if (taskRepository.existsById(id)) {
            taskRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private TaskDTO convertToDTO(Task task) {
        UserDTO assignedTo = new UserDTO(
                task.getAssignedTo().getUserId(),
                task.getAssignedTo().getUsername(),
                task.getAssignedTo().getEmail(),
                task.getAssignedTo().getRole()
        );

        return new TaskDTO(
                task.getTaskId(),
                task.getTicket().getTicket_id(),
                assignedTo,
                task.getDescription(),
                task.getStatus(),
                task.getDueDate(),
                task.getApprovalStatus(),
                task.getCreatedAt(),
                task.getUpdatedAt()
        );
    }
}

