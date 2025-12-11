package com.sms.my_sms_backend.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sms.my_sms_backend.dto.ScheduleDTO;
import com.sms.my_sms_backend.dto.UserDTO;
import com.sms.my_sms_backend.entity.Schedule;
import com.sms.my_sms_backend.entity.Schedule.ScheduleStatus;
import com.sms.my_sms_backend.entity.Task;
import com.sms.my_sms_backend.entity.User;
import com.sms.my_sms_backend.repository.ScheduleRepository;
import com.sms.my_sms_backend.repository.TaskRepository;
import com.sms.my_sms_backend.repository.UserRepository;
import com.sms.my_sms_backend.service.ScheduleService;

@Service
public class ScheduleServiceImpl implements ScheduleService {

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public ScheduleDTO createSchedule(ScheduleDTO scheduleDTO) {
        if (scheduleDTO.getTaskId() == null) {
            throw new RuntimeException("Task ID is required");
        }
        if (scheduleDTO.getTechnician() == null || scheduleDTO.getTechnician().getId() == null) {
            throw new RuntimeException("Technician ID is required");
        }
        
        Task task = taskRepository.findById(scheduleDTO.getTaskId())
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + scheduleDTO.getTaskId() + ". Please create a task first."));
        
        User technician = userRepository.findById(scheduleDTO.getTechnician().getId())
                .orElseThrow(() -> new RuntimeException("Technician not found with id: " + scheduleDTO.getTechnician().getId()));

        Schedule schedule = Schedule.builder()
                .task(task)
                .technician(technician)
                .scheduledDate(scheduleDTO.getScheduledDate())
                .status(scheduleDTO.getStatus() != null ? scheduleDTO.getStatus() : ScheduleStatus.SCHEDULED)
                .geoLocation(scheduleDTO.getGeoLocation())
                .notes(scheduleDTO.getNotes())
                .build();

        Schedule savedSchedule = scheduleRepository.save(schedule);
        return convertToDTO(savedSchedule);
    }

    @Override
    public ScheduleDTO getScheduleById(Long id) {
        Schedule schedule = scheduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Schedule not found with id: " + id));
        return convertToDTO(schedule);
    }

    @Override
    public List<ScheduleDTO> getAllSchedules() {
        return scheduleRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ScheduleDTO> getSchedulesByTechnician(Long technicianId) {
        User technician = userRepository.findById(technicianId)
                .orElseThrow(() -> new RuntimeException("Technician not found with id: " + technicianId));
        return scheduleRepository.findByTechnician(technician).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ScheduleDTO> getSchedulesByStatus(ScheduleStatus status) {
        return scheduleRepository.findByStatus(status).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ScheduleDTO> getSchedulesByDateRange(LocalDateTime start, LocalDateTime end) {
        return scheduleRepository.findByScheduledDateBetween(start, end).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ScheduleDTO updateSchedule(Long id, ScheduleDTO scheduleDTO) {
        Schedule schedule = scheduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Schedule not found with id: " + id));

        if (scheduleDTO.getScheduledDate() != null) schedule.setScheduledDate(scheduleDTO.getScheduledDate());
        if (scheduleDTO.getStatus() != null) schedule.setStatus(scheduleDTO.getStatus());
        if (scheduleDTO.getGeoLocation() != null) schedule.setGeoLocation(scheduleDTO.getGeoLocation());
        if (scheduleDTO.getNotes() != null) schedule.setNotes(scheduleDTO.getNotes());
        if (scheduleDTO.getTechnician() != null) {
            User technician = userRepository.findById(scheduleDTO.getTechnician().getId())
                    .orElseThrow(() -> new RuntimeException("Technician not found"));
            schedule.setTechnician(technician);
        }

        Schedule updatedSchedule = scheduleRepository.save(schedule);
        return convertToDTO(updatedSchedule);
    }

    @Override
    public void updateScheduleStatus(Long id, ScheduleStatus status) {
        Schedule schedule = scheduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Schedule not found with id: " + id));
        schedule.setStatus(status);
        scheduleRepository.save(schedule);
    }

    @Override
    public boolean deleteSchedule(Long id) {
        if (scheduleRepository.existsById(id)) {
            scheduleRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private ScheduleDTO convertToDTO(Schedule schedule) {
        UserDTO technician = new UserDTO(
                schedule.getTechnician().getUserId(),
                schedule.getTechnician().getUsername(),
                schedule.getTechnician().getEmail(),
                schedule.getTechnician().getRole()
        );

        return new ScheduleDTO(
                schedule.getScheduleId(),
                schedule.getTask().getTaskId(),
                technician,
                schedule.getScheduledDate(),
                schedule.getStatus(),
                schedule.getGeoLocation(),
                schedule.getNotes(),
                schedule.getCreatedAt(),
                schedule.getUpdatedAt()
        );
    }
}

