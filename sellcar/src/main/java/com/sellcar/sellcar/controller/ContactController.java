package com.sellcar.sellcar.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sellcar.sellcar.request.ContactRequest;
import com.sellcar.sellcar.service.ContactService;

@RestController
@RequestMapping("/api/v1/contact")
public class ContactController {
    
    @Autowired
    private ContactService contactService;

    @PostMapping
    public ResponseEntity<?> sendContactHome(@RequestBody ContactRequest request, BindingResult result){
        if(result.hasErrors()){
            List<String> errorMessages = result.getFieldErrors().stream().map(FieldError::getDefaultMessage).collect(Collectors.toList());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessages);
        }
        contactService.sendContactHome(request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/dealer")
    public ResponseEntity<?> sendContactDealer(@RequestBody ContactRequest request, @RequestParam Integer id, BindingResult result){
        if(result.hasErrors()){
            List<String> errorMessages = result.getFieldErrors().stream().map(FieldError::getDefaultMessage).collect(Collectors.toList());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessages);
        }
        contactService.sendContactDealer(request, id);
        return ResponseEntity.ok().build();
    }
}