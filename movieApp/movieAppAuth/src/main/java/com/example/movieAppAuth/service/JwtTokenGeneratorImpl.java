package com.example.movieAppAuth.service;

import com.example.movieAppAuth.domain.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
@Service
public class JwtTokenGeneratorImpl implements JwtTokenGenerator{
    @Override
    public Map<String, String> generateToken(User user) {
        Map<String,Object> claims=new HashMap<String,Object>();
        Map<String,String> map=new HashMap<String,String>();
        claims.put("emailID",user.getEmailID());
        claims.put("role",user.getRole());
        String token=Jwts.builder().setClaims(claims)
                .signWith(SignatureAlgorithm.HS256,"idontsay")
                .setIssuedAt(new Date()).compact();
        map.put("token",token);
        return map;
    }


}
