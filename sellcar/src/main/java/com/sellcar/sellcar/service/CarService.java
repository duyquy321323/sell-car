package com.sellcar.sellcar.service;

import java.security.Principal;
import java.util.List;

import org.springframework.data.domain.Page;

import com.sellcar.sellcar.request.SearchCarRequest;
import com.sellcar.sellcar.request.SellCarRequest;
import com.sellcar.sellcar.response.CarDetailResponse;
import com.sellcar.sellcar.response.SearchCarResponse;
import com.sellcar.sellcar.response.TrainingResponse;

public interface CarService {
    
    public void sellCar(SellCarRequest request, Principal principal);

    public CarDetailResponse getCarById(Integer id);

    public Page<SearchCarResponse> searchCar(SearchCarRequest request, Integer pageNo, Integer pageSize);

    public List<TrainingResponse> getTrainingData();

}