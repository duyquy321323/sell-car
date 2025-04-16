package com.sellcar.sellcar.security;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.sellcar.sellcar.entity.Admin;
import com.sellcar.sellcar.entity.Dealer;
import com.sellcar.sellcar.entity.User;

public class UserDetailsSecurity implements UserDetails {

    private String email;
    private String password;
    private Collection<? extends GrantedAuthority> authorities;

    public UserDetailsSecurity(User user){
        this.email = user.getEmail();
        this.password = user.getPassword();
        List<GrantedAuthority> authorities = new ArrayList<>();
        if(user instanceof Admin){
            authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
        } else if (user instanceof Dealer){
            authorities.add(new SimpleGrantedAuthority("ROLE_DEALER"));
        } else {
            authorities.add(new SimpleGrantedAuthority("ROLE_MEMBER"));
        }
        this.authorities = authorities;
    }

    public static UserDetails build(User user){
        return new UserDetailsSecurity(user);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }
    
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}