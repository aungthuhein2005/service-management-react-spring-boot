package com.sms.my_sms_backend.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.sms.my_sms_backend.entity.Service;

public interface ServicesService {
	public Page<Service> getAllServices(Pageable pageable);
}
