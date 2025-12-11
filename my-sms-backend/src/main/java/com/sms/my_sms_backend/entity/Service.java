package com.sms.my_sms_backend.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "services")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Service {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long service_id;
	
	private String name;
	private String description;
	
//	The main purpose of orphanRemoval = true is to simplify database management 
//	and ensure data consistency by automatically deleting related entities that become 
//	isolated when removed from a parent-child relationship
	@OneToMany(mappedBy = "service", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Ticket> tickets = new ArrayList<Ticket>();
	
	
}
