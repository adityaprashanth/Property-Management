package com.propms.service;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.security.Key;
import java.util.Date;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;

    private static final long EXPIRY_MS = 1000L * 60 * 60 * 24; // 24h

    private Key key() { return Keys.hmacShaKeyFor(secret.getBytes()); }

    public String generateToken(String email, String role) {
        return Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRY_MS))
                .signWith(key(), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean isValid(String token) {
        try { Jwts.parserBuilder().setSigningKey(key()).build().parseClaimsJws(token); return true; }
        catch (JwtException e) { return false; }
    }
}