package com.sms.my_sms_backend.service;

import java.time.LocalDateTime;
import java.util.List;

import com.sms.my_sms_backend.dto.ScheduleDTO;
import com.sms.my_sms_backend.entity.Schedule.ScheduleStatus;

public interface ScheduleService {
    ScheduleDTO createSchedule(ScheduleDTO scheduleDTO);
    ScheduleDTO getScheduleById(Long id);
    List<ScheduleDTO> getAllSchedules();
    List<ScheduleDTO> getSchedulesByTechnician(Long technicianId);
    List<ScheduleDTO> getSchedulesByStatus(ScheduleStatus status);
    List<ScheduleDTO> getSchedulesByDateRange(LocalDateTime start, LocalDateTime end);
    ScheduleDTO updateSchedule(Long id, ScheduleDTO scheduleDTO);
    void updateScheduleStatus(Long id, ScheduleStatus status);
    boolean deleteSchedule(Long id);
}

