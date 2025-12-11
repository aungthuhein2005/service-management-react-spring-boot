package com.sms.my_sms_backend.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sms.my_sms_backend.dto.ReportDTO;
import com.sms.my_sms_backend.entity.Report;
import com.sms.my_sms_backend.entity.Report.ReportType;
import com.sms.my_sms_backend.repository.ReportRepository;
import com.sms.my_sms_backend.service.ReportService;

@Service
public class ReportServiceImpl implements ReportService {

    @Autowired
    private ReportRepository reportRepository;

    @Override
    public ReportDTO createReport(ReportDTO reportDTO) {
        Report report = Report.builder()
                .reportType(reportDTO.getReportType())
                .data(reportDTO.getData())
                .title(reportDTO.getTitle())
                .description(reportDTO.getDescription())
                .generatedAt(reportDTO.getGeneratedAt() != null ? reportDTO.getGeneratedAt() : LocalDateTime.now())
                .build();

        Report savedReport = reportRepository.save(report);
        return convertToDTO(savedReport);
    }

    @Override
    public ReportDTO getReportById(Long id) {
        Report report = reportRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Report not found with id: " + id));
        return convertToDTO(report);
    }

    @Override
    public List<ReportDTO> getAllReports() {
        return reportRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ReportDTO> getReportsByType(ReportType reportType) {
        return reportRepository.findByReportType(reportType).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ReportDTO> getReportsByDateRange(LocalDateTime start, LocalDateTime end) {
        return reportRepository.findByGeneratedAtBetween(start, end).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public boolean deleteReport(Long id) {
        if (reportRepository.existsById(id)) {
            reportRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private ReportDTO convertToDTO(Report report) {
        return new ReportDTO(
                report.getReportId(),
                report.getReportType(),
                report.getGeneratedAt(),
                report.getData(),
                report.getTitle(),
                report.getDescription()
        );
    }
}

