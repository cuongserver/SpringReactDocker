package com.example.demospring.helpers;

import com.example.demospring.models.persistence.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Map;

@Component
public class JwtHelper {
    @Value("${jwt.secretText}")
    private String secretText;
    @Value("${jwt.duration}")
    private long duration;
    private final String USER_ID_CLAIM = "uid";

    public String generateJwt(User user) {
        var claims = Jwts.claims();
        claims.put(USER_ID_CLAIM, user.getId());
        return Jwts.builder()
                .setClaims(claims)
                .setExpiration(getExpirationTime())
                .signWith(SignatureAlgorithm.HS256, secretText)
                .compact();
    }

    public String generateJwt(Map<String, String> info) {
        var claims = Jwts.claims();
        claims.putAll(info);
        return Jwts.builder()
                .setClaims(claims)
                .signWith(SignatureAlgorithm.HS256, secretText)
                .compact();
    }

    public Jws<Claims> getClaimsFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(secretText)
                .parseClaimsJws(token);
    }

    public boolean validateToken(String token) {
        try {
            var claims = getClaimsFromToken(token);
            var expire = claims.getBody().getExpiration();
            if (expire == null) return false;
            var now = new Date();
            if (now.after(expire)) return false;
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    private Date getExpirationTime() {
        var date = new Date();
        date.setTime(date.getTime() + duration);
        return date;
    }
}
