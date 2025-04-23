package com.sellcar.sellcar.service;

import java.security.Principal;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.security.core.Authentication;

import com.sellcar.sellcar.enumerate.ConditionCarCode;
import com.sellcar.sellcar.request.SearchCarRequest;
import com.sellcar.sellcar.request.SellCarRequest;
import com.sellcar.sellcar.response.CarDetailResponse;
import com.sellcar.sellcar.response.SearchCarResponse;
import com.sellcar.sellcar.response.TrainingResponse;

public interface CarService {
    
    public void sellCar(SellCarRequest request, Authentication authentication);

    public CarDetailResponse getCarById(Integer id);

    public Page<SearchCarResponse> searchCar(SearchCarRequest request, Integer pageNo, Integer pageSize);

    public List<TrainingResponse> getTrainingData();

    public List<SearchCarResponse> getRecommendCars(ConditionCarCode condition);

}