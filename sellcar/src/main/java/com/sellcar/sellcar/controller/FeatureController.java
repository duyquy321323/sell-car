package com.sellcar.sellcar.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sellcar.sellcar.dto.FeatureDTO;
import com.sellcar.sellcar.service.FeatureService;

@RestController
@RequestMapping("/api/v1/feature")
public class FeatureController {
    
    @Autowired
    private FeatureService featureService;
    
    @GetMapping
    public ResponseEntity<List<FeatureDTO>> getFeature(){
        return ResponseEntity.ok(featureService.getFeature());
    }
}