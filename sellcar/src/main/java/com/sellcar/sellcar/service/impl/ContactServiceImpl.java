package com.sellcar.sellcar.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sellcar.sellcar.converter.ContactConverter;
import com.sellcar.sellcar.entity.Contact;
import com.sellcar.sellcar.entity.Dealer;
import com.sellcar.sellcar.repository.ContactRepository;
import com.sellcar.sellcar.repository.DealerRepository;
import com.sellcar.sellcar.request.ContactRequest;
import com.sellcar.sellcar.service.ContactService;

@Service
@Transactional
public class ContactServiceImpl implements ContactService {

    @Autowired
    private ContactConverter contactConverter;

    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private DealerRepository dealerRepository;

    @Override
    public void sendContactHome(ContactRequest request) {
        contactRepository.save(contactConverter.contactHomeRequestToContact(request));
    }

    @Override
    public void sendContactDealer(ContactRequest request, Integer dealerId) {
        Contact contact = contactConverter.contactHomeRequestToContact(request);
        Optional<Dealer> dealerOp = dealerRepository.findById(dealerId);
        if(dealerOp.isPresent()){
            contact.setDealer(dealerOp.get());
            contactRepository.save(contact);
        }
    }
    
}