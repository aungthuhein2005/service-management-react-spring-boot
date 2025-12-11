package com.sms.my_sms_backend.dto;

import java.time.LocalDateTime;

import com.sms.my_sms_backend.entity.Schedule.ScheduleStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleDTO {
    private Long scheduleId;
    private Long taskId;
    private UserDTO technician;
    private LocalDateTime scheduledDate;
    private ScheduleStatus status;
    private String geoLocation;
    private String notes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

