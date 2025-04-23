package com.sellcar.sellcar.converter;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.sellcar.sellcar.entity.Member;
import com.sellcar.sellcar.request.RegisterRequest;

@Component
public class MemberConverter {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Member registerRequestToMember(RegisterRequest request) {
        Member member = modelMapper.map(request, Member.class);
        member.setPassword(passwordEncoder.encode(request.getPassword()));
        return member;
    }
}