package com.sellcar.sellcar.security;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sellcar.sellcar.entity.User;
import com.sellcar.sellcar.exception.NotFoundException;
import com.sellcar.sellcar.repository.UserRepository;

@Service
@Transactional
public class UserDetailsServiceSecurity implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByEmail(username);
        if(user.isPresent()){
            return UserDetailsSecurity.build(user.get());
        }
        throw new NotFoundException("Tài khoản không tồn tại!!!");
    }
}