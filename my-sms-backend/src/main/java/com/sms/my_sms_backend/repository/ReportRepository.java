package com.sms.my_sms_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.sms.my_sms_backend.entity.Report;
import com.sms.my_sms_backend.entity.Report.ReportType;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long>, PagingAndSortingRepository<Report, Long> {
    List<Report> findByReportType(ReportType reportType);
    List<Report> findByGeneratedAtBetween(LocalDateTime start, LocalDateTime end);
}

