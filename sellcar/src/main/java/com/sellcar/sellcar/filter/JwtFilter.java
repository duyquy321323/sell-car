package com.sellcar.sellcar.filter;

import java.io.IOException;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.filter.OncePerRequestFilter;

import com.sellcar.sellcar.service.JwtService;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserDetailsService userDetailsService;
    
    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain)
            throws ServletException, IOException {
        String header = request.getHeader("Authorization");

        // kiểm tra nếu đang đăng nhập thì không được đăng nhập nữa
        if(request.getMethod().equals("POST") && request.getServletPath().contains("/api/v1/user/login")){
            if(header == null){
                filterChain.doFilter(request, response);
            } else {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            }
            return;
        }

        
        // nếu request không cần xác thực 
        if(isPass(request)){
            filterChain.doFilter(request, response);
            return;
        }
        
        if(header == null || !header.startsWith("Bearer ")){
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }
        String token = header.substring(7);
        
        // kiểm tra token có trong blacklist không

        // nếu người dùng chưa xác thực thì tiến hành xác thực
        String email = jwtService.extractEmail(token);

        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null){
            UserDetails userDetails = userDetailsService.loadUserByUsername(email);
            if(jwtService.validateToken(token, userDetails)){
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.getAuthorities()
                );
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        }

        filterChain.doFilter(request, response);
    }

    private Boolean isPass(HttpServletRequest request){
        List<Pair<String, String>> requestList = List.of(
            Pair.of("POST", "/user/register"),
            Pair.of("GET", "/api/v1/news/"),
            Pair.of("GET", "/car/training")
        );

        String requestPath = request.getServletPath();

        for(Pair<String, String> rq : requestList){
            if(request.getMethod().equals(rq.getFirst()) && requestPath.contains(rq.getSecond())){
                return true;
            }
        }
        return false;
    }
    
}