package com.example.theatre.filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;

public class JwtFilter extends GenericFilterBean{
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request=(HttpServletRequest) servletRequest;
        String authHeader= request.getHeader("Authorization");
        if(authHeader==null || !authHeader.startsWith("Bearer")){
            throw new ServletException();
        }
        else {
            String token=authHeader.substring(7);
            Claims claims= Jwts.parser().setSigningKey("idontsay").parseClaimsJws(token).getBody();
            String emailID=(String) claims.get("emailID");
            String role=(String) claims.get("role");
            request.setAttribute("UserID",emailID);
            request.setAttribute("Role",role);
            filterChain.doFilter(request,servletResponse);
        }
    }
}
