package com.sellcar.sellcar.service.impl;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sellcar.sellcar.converter.MemberConverter;
import com.sellcar.sellcar.converter.UserConverter;
import com.sellcar.sellcar.entity.User;
import com.sellcar.sellcar.exception.ExistedException;
import com.sellcar.sellcar.exception.NotFoundException;
import com.sellcar.sellcar.exception.UnauthorizedException;
import com.sellcar.sellcar.repository.MemberRepository;
import com.sellcar.sellcar.repository.UserRepository;
import com.sellcar.sellcar.request.LoginRequest;
import com.sellcar.sellcar.request.RegisterRequest;
import com.sellcar.sellcar.response.LoginResponse;
import com.sellcar.sellcar.service.JwtService;
import com.sellcar.sellcar.service.UserService;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserConverter userConverter;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private MemberConverter memberConverter;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtService jwtService;

    @Override
    public LoginResponse login(LoginRequest request) {
        Optional<User> userOp = userRepository.findByEmail(request.getEmail());
        if(userOp.isPresent()){
            User user = userOp.get();
            UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
            if(passwordEncoder.matches(request.getPassword(), user.getPassword())){
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                    request.getEmail(), request.getPassword(), userDetails.getAuthorities()
                );

                Authentication authentication = authenticationManager.authenticate(authenticationToken);
                SecurityContextHolder.getContext().setAuthentication(authentication);

                String token = jwtService.generateToken(user);
                Date expiryTime = jwtService.extractExpirationToken(token);
                LoginResponse loginResponse = userConverter.userToLoginResponse(user);
                loginResponse.setExpiryTime(expiryTime);
                loginResponse.setToken(token);
                return loginResponse;
            }
            throw new UnauthorizedException("Mật khẩu không khớp!!!");
        }
        throw new NotFoundException("Tài khoản không tồn tại!!!");
    }

    @Override
    public void register(RegisterRequest request) {
        Optional<User> userOp = userRepository.findByEmail(request.getEmail());
        if(userOp.isEmpty()){
            memberRepository.save(memberConverter.registerRequestToMember(request));
        }
        throw new ExistedException("Email đã được đăng ký, vui lòng đăng nhập hoặc sử dụng email khác!!!");
    }
    
}