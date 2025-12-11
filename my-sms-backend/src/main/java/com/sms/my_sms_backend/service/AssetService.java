package com.sms.my_sms_backend.service;

import java.util.List;

import com.sms.my_sms_backend.dto.AssetDTO;
import com.sms.my_sms_backend.entity.Asset.AssetStatus;

public interface AssetService {
    AssetDTO createAsset(AssetDTO assetDTO);
    AssetDTO getAssetById(Long id);
    AssetDTO getAssetBySerialNumber(String serialNumber);
    List<AssetDTO> getAllAssets();
    List<AssetDTO> getAssetsByStatus(AssetStatus status);
    List<AssetDTO> getAssetsByCategory(String category);
    AssetDTO updateAsset(Long id, AssetDTO assetDTO);
    boolean deleteAsset(Long id);
}

