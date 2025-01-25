package com.sms.my_sms_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sms.my_sms_backend.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{

}
