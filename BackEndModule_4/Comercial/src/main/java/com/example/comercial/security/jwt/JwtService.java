package com.example.comercial.security.jwt;


import com.example.comercial.model.login.UserPrinciple;
import io.jsonwebtoken.*;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Date;;

@Service
public class JwtService {
    private static final String SECRET_KEY = "123456789987654321123456789987654321123456789";
    private static final long EXPIRE_TIME = 86400000000L;

    public String generateTokenLogin(Authentication authentication) {
        UserPrinciple userPrincipal = (UserPrinciple) authentication.getPrincipal();

        return Jwts.builder()
                .setSubject((userPrincipal.getUsername()))
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + EXPIRE_TIME * 1000))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(authToken);
            return true;
        } catch (MalformedJwtException e) {
            System.out.println("Invalid JWT token -> Message: "+ e.getMessage());
        } catch (ExpiredJwtException e) {
            System.out.println("Expired JWT token -> Message: "+ e.getMessage());
        } catch (UnsupportedJwtException e) {
            System.out.println("Unsupported JWT token -> Message: "+ e.getMessage());
        } catch (IllegalArgumentException e) {
            System.out.println("JWT claims string is empty -> Message: "+ e.getMessage());
        }
        return false;
    }

    public String getUserNameFromJwtToken(String token) {
        String userName = Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody().getSubject();
        return userName;
    }
}
