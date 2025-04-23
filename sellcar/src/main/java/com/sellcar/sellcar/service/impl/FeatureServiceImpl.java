package com.sellcar.sellcar.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sellcar.sellcar.converter.FeatureConverter;
import com.sellcar.sellcar.dto.FeatureDTO;
import com.sellcar.sellcar.entity.Feature;
import com.sellcar.sellcar.repository.FeatureRepository;
import com.sellcar.sellcar.service.FeatureService;

@Service
@Transactional
public class FeatureServiceImpl implements FeatureService {
    
    @Autowired
    private FeatureRepository featureRepository;

    @Autowired
    private FeatureConverter featureConverter;

    @Override
    public List<FeatureDTO> getFeature() {
        List<Feature> features = featureRepository.findByCodeNot("OTHER");
        return features.stream().map(feature -> featureConverter.featureToFeatureDTO(feature)).collect(Collectors.toList());
    }
}