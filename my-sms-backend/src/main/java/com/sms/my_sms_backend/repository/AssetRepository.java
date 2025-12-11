package com.sms.my_sms_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.sms.my_sms_backend.entity.Asset;
import com.sms.my_sms_backend.entity.Asset.AssetStatus;

import java.util.List;
import java.util.Optional;

@Repository
public interface AssetRepository extends JpaRepository<Asset, Long>, PagingAndSortingRepository<Asset, Long> {
    Optional<Asset> findBySerialNumber(String serialNumber);
    List<Asset> findByStatus(AssetStatus status);
    List<Asset> findByCategory(String category);
}

