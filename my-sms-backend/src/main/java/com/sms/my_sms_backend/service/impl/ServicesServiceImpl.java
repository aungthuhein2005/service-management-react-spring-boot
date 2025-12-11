package com.sms.my_sms_backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.sms.my_sms_backend.entity.Service;
import com.sms.my_sms_backend.repository.ServiceRepository;
import com.sms.my_sms_backend.service.ServicesService;

public class ServicesServiceImpl implements ServicesService{

	@Autowired
	private ServiceRepository serviceRepository;
	
	@Override
	public Page<Service> getAllServices(Pageable pageable) {
		// TODO Auto-generated method stub
		Page<Service> servicesPage = serviceRepository.findAll(pageable);
		return servicesPage;
	}

}
