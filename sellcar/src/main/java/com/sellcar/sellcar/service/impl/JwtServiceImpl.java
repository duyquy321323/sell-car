package com.sellcar.sellcar.service.impl;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sellcar.sellcar.entity.User;
import com.sellcar.sellcar.service.JwtService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
@Transactional
public class JwtServiceImpl implements JwtService {

    @Value("${jwt.expiration}")
    private Long expiration;

    @Value("${jwt.secret}")
    private String secret;

    @Override
    public String generateToken(User user) {
        return Jwts.builder()
                   .setSubject(user.getEmail())
                   .setExpiration(new Date(System.currentTimeMillis() + expiration * 1000L))
                   .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                   .compact();
    }

    private Key getSignInKey(){
        byte[] keyBytes = Decoders.BASE64.decode(secret); // giải mã secret và chuyển về 64 byte
        return Keys.hmacShaKeyFor(keyBytes); // tạo chữ ký dạng hmac từ byte
    }

    @Override
    public String extractEmail(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver){
        Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims); // sử dụng hàm được truyền vào đối tượng claims <trường hợp này là hàm getSubject>
    }

    private Claims extractAllClaims(String token){
        return Jwts.parser().setSigningKey(getSignInKey()) // giải mã bằng chữ ký
                            .build()
                            .parseClaimsJws(token)
                            .getBody(); // lấy payload
    }

    @Override
    public Boolean validateToken(String token, UserDetails userDetails) {
        String email = extractEmail(token);
        Date expiryDate = extractClaim(token, Claims::getExpiration);
        return !expiryDate.before(new Date()) && email.equals(userDetails.getUsername()); // nếu trước hiện tại thì trả về false vì đã quá hạn
    }

    @Override
    public Date extractExpirationToken(String token) {
        return Jwts.parser().setSigningKey(getSignInKey()).build().parseClaimsJws(token).getPayload().getExpiration();
    }
    
}