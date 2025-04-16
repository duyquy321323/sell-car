package com.sellcar.sellcar.service.impl;

import java.security.Principal;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sellcar.sellcar.entity.Car;
import com.sellcar.sellcar.entity.Evaluate;
import com.sellcar.sellcar.entity.User;
import com.sellcar.sellcar.exception.NotFoundException;
import com.sellcar.sellcar.repository.CarRepository;
import com.sellcar.sellcar.repository.EvaluateRepository;
import com.sellcar.sellcar.repository.UserRepository;
import com.sellcar.sellcar.service.EvaluateService;

@Service
@Transactional
public class EvaluateServiceImpl implements EvaluateService {

    @Autowired
    private EvaluateRepository evaluateRepository;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void evaluateCar(Integer carId, Principal principal, Integer rate) {
        UserDetails userDetails = (UserDetails) principal;
        Optional<User> userOp = userRepository.findByEmail(userDetails.getUsername());
        Optional<Car> carOp = carRepository.findById(carId);
        if(userOp.isPresent() && carOp.isPresent()){
            evaluateRepository.save(Evaluate.builder().car(carOp.get()).rate(rate).user(userOp.get()).build());
        }
        throw new NotFoundException("Xe không tồn tại hoặc đã bị xóa!!!");
    }
    
}