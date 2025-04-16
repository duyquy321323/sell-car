package com.sellcar.sellcar.controller;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sellcar.sellcar.request.SearchCarRequest;
import com.sellcar.sellcar.request.SellCarRequest;
import com.sellcar.sellcar.response.CarDetailResponse;
import com.sellcar.sellcar.response.SearchCarResponse;
import com.sellcar.sellcar.response.TrainingResponse;
import com.sellcar.sellcar.service.CarService;

@RestController
@RequestMapping("/api/v1/car")
public class CarController {
    
    @Autowired
    private CarService carService;

    @PostMapping(path = "/sell", consumes = MediaType.MULTIPART_FORM_DATA_VALUE) // gửi dạng 'multipart/form-data'
    public ResponseEntity<?> sellCar(@ModelAttribute SellCarRequest request, Principal principal, BindingResult bindingResult){ // ModelAttribute dùng cho các dạng form
                                                                              // RequestBody dùng cho json
        if(bindingResult.hasErrors()){
            List<String> errorMessages = bindingResult.getFieldErrors()
                                                      .stream().map(FieldError::getDefaultMessage)
                                                      .collect(Collectors.toList());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessages);
        }
        carService.sellCar(request, principal);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CarDetailResponse> getDetailCar(@PathVariable(value = "id") Integer id){
        return ResponseEntity.ok(carService.getCarById(id));
    }

    @PostMapping
    public ResponseEntity<Page<SearchCarResponse>> searchCar(@RequestBody SearchCarRequest request, @RequestParam(defaultValue = "0") Integer pageNo, @RequestParam(defaultValue = "6") Integer pageSize){
        return ResponseEntity.ok(carService.searchCar(request, pageNo, pageSize));
    }

    @GetMapping("/training")
    public ResponseEntity<List<TrainingResponse>> getTrainingData(){
        return ResponseEntity.ok(carService.getTrainingData());
    }
}