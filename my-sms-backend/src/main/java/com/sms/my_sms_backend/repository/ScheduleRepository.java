package com.sms.my_sms_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.sms.my_sms_backend.entity.Schedule;
import com.sms.my_sms_backend.entity.Schedule.ScheduleStatus;
import com.sms.my_sms_backend.entity.User;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long>, PagingAndSortingRepository<Schedule, Long> {
    List<Schedule> findByTechnician(User technician);
    List<Schedule> findByStatus(ScheduleStatus status);
    List<Schedule> findByScheduledDateBetween(LocalDateTime start, LocalDateTime end);
    List<Schedule> findByTechnicianAndScheduledDateBetween(User technician, LocalDateTime start, LocalDateTime end);
}

