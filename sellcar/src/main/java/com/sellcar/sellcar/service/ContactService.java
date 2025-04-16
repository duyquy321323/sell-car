package com.sellcar.sellcar.service;

import com.sellcar.sellcar.request.ContactRequest;

public interface ContactService {
    
    public void sendContactHome(ContactRequest request);

    public void sendContactDealer(ContactRequest request, Integer dealerId);

}