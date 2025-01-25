package com.sms.my_sms_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.sms.my_sms_backend.entity.Ticket;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long>,PagingAndSortingRepository<Ticket, Long>{

}
