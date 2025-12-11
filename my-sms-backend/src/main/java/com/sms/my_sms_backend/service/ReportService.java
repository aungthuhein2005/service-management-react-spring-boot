package com.sms.my_sms_backend.service;

import java.time.LocalDateTime;
import java.util.List;

import com.sms.my_sms_backend.dto.ReportDTO;
import com.sms.my_sms_backend.entity.Report.ReportType;

public interface ReportService {
    ReportDTO createReport(ReportDTO reportDTO);
    ReportDTO getReportById(Long id);
    List<ReportDTO> getAllReports();
    List<ReportDTO> getReportsByType(ReportType reportType);
    List<ReportDTO> getReportsByDateRange(LocalDateTime start, LocalDateTime end);
    boolean deleteReport(Long id);
}

