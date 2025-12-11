package com.sms.my_sms_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sms.my_sms_backend.entity.Task;
import com.sms.my_sms_backend.entity.Task.TaskStatus;
import com.sms.my_sms_backend.entity.User;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long>, PagingAndSortingRepository<Task, Long> {
    List<Task> findByAssignedTo(User user);
    List<Task> findByStatus(TaskStatus status);
    
    @Query("SELECT t FROM Task t WHERE t.ticket.ticket_id = :ticketId")
    List<Task> findByTicket_TicketId(@Param("ticketId") Long ticketId);
}

