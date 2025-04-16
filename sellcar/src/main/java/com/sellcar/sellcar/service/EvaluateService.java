package com.sellcar.sellcar.service;

import java.security.Principal;

public interface EvaluateService {
    
    public void evaluateCar(Integer carId, Principal principal, Integer rate);
}