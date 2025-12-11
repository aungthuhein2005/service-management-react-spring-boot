package com.sms.my_sms_backend.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sms.my_sms_backend.dto.AssetDTO;
import com.sms.my_sms_backend.entity.Asset;
import com.sms.my_sms_backend.entity.Asset.AssetStatus;
import com.sms.my_sms_backend.repository.AssetRepository;
import com.sms.my_sms_backend.service.AssetService;

@Service
public class AssetServiceImpl implements AssetService {

    @Autowired
    private AssetRepository assetRepository;

    @Override
    public AssetDTO createAsset(AssetDTO assetDTO) {
        Asset asset = Asset.builder()
                .name(assetDTO.getName())
                .serialNumber(assetDTO.getSerialNumber())
                .category(assetDTO.getCategory())
                .status(assetDTO.getStatus() != null ? assetDTO.getStatus() : AssetStatus.AVAILABLE)
                .location(assetDTO.getLocation())
                .lastMaintenanceDate(assetDTO.getLastMaintenanceDate())
                .nextMaintenanceDate(assetDTO.getNextMaintenanceDate())
                .build();

        Asset savedAsset = assetRepository.save(asset);
        return convertToDTO(savedAsset);
    }

    @Override
    public AssetDTO getAssetById(Long id) {
        Asset asset = assetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Asset not found with id: " + id));
        return convertToDTO(asset);
    }

    @Override
    public AssetDTO getAssetBySerialNumber(String serialNumber) {
        Asset asset = assetRepository.findBySerialNumber(serialNumber)
                .orElseThrow(() -> new RuntimeException("Asset not found with serial number: " + serialNumber));
        return convertToDTO(asset);
    }

    @Override
    public List<AssetDTO> getAllAssets() {
        return assetRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<AssetDTO> getAssetsByStatus(AssetStatus status) {
        return assetRepository.findByStatus(status).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<AssetDTO> getAssetsByCategory(String category) {
        return assetRepository.findByCategory(category).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public AssetDTO updateAsset(Long id, AssetDTO assetDTO) {
        Asset asset = assetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Asset not found with id: " + id));

        if (assetDTO.getName() != null) asset.setName(assetDTO.getName());
        if (assetDTO.getSerialNumber() != null) asset.setSerialNumber(assetDTO.getSerialNumber());
        if (assetDTO.getCategory() != null) asset.setCategory(assetDTO.getCategory());
        if (assetDTO.getStatus() != null) asset.setStatus(assetDTO.getStatus());
        if (assetDTO.getLocation() != null) asset.setLocation(assetDTO.getLocation());
        if (assetDTO.getLastMaintenanceDate() != null) asset.setLastMaintenanceDate(assetDTO.getLastMaintenanceDate());
        if (assetDTO.getNextMaintenanceDate() != null) asset.setNextMaintenanceDate(assetDTO.getNextMaintenanceDate());

        Asset updatedAsset = assetRepository.save(asset);
        return convertToDTO(updatedAsset);
    }

    @Override
    public boolean deleteAsset(Long id) {
        if (assetRepository.existsById(id)) {
            assetRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private AssetDTO convertToDTO(Asset asset) {
        return new AssetDTO(
                asset.getAssetId(),
                asset.getName(),
                asset.getSerialNumber(),
                asset.getCategory(),
                asset.getStatus(),
                asset.getLocation(),
                asset.getLastMaintenanceDate(),
                asset.getNextMaintenanceDate(),
                asset.getCreatedAt(),
                asset.getUpdatedAt()
        );
    }
}

