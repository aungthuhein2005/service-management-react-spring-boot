package com.sms.my_sms_backend.dto;

import java.time.LocalDateTime;

import com.sms.my_sms_backend.entity.Report.ReportType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReportDTO {
    private Long reportId;
    private ReportType reportType;
    private LocalDateTime generatedAt;
    private String data;
    private String title;
    private String description;
}

