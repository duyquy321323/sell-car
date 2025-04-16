package com.sellcar.sellcar.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.LogoutFilter;

import com.sellcar.sellcar.filter.JwtFilter;
import com.sellcar.sellcar.security.UserDetailsServiceSecurity;

@EnableWebSecurity
@Configuration
public class WebConfig extends WebSecurityConfigurerAdapter {

    // dùng để lấy người dùng từ database
    @Bean
    public UserDetailsService userDetailsService(){
        return new UserDetailsServiceSecurity();
    }

    // dùng để so sánh mật khẩu và mật khẩu đã mã hóa trong database
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    // tạo provider lấy từ userdetailsservice và passwordencoder trên
    @Bean
    public DaoAuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider auth = new DaoAuthenticationProvider();
        auth.setUserDetailsService(userDetailsService());
        auth.setPasswordEncoder(passwordEncoder());
        return auth;
    }

    // áp dụng provider vào web
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authenticationProvider());
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public JwtFilter jwtFilter(){
        return new JwtFilter();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
            .cors(Customizer.withDefaults())
            .authorizeRequests(request -> 
                request
                    .antMatchers(HttpMethod.GET, "/api/v1/car/training", "/api/v1/news/**")
                    .permitAll()
                    .antMatchers(HttpMethod.POST, "/api/v1/user/login", "/api/v1/user/register")
                    .permitAll()
                    .antMatchers(HttpMethod.GET, "/api/v1/car/**")
                    .hasRole("MEMBER")
                    .antMatchers(HttpMethod.POST, "/api/v1/car", "/api/v1/contact**", "/api/v1/evaluate")
                    .hasRole("MEMBER")
                    .antMatchers(HttpMethod.POST, "/api/v1/car/sell", "/api/v1/news", "/api/v1/news/url-image")
                    .hasRole("DEALER")
                    // .antMatchers(HttpMethod.GET, )
                    // .hasRole("DEALER")
            )
            .addFilterBefore(jwtFilter(), LogoutFilter.class);
    }
}