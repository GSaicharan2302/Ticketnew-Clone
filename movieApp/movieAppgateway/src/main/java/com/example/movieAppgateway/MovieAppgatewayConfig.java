package com.example.movieAppgateway;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MovieAppgatewayConfig {
    @Bean
    public RouteLocator getRoutes(RouteLocatorBuilder builder){
        return builder.routes().route(
                p->p.path("/customer/**").uri("http://localhost:8023/customer/*")
        ).route(p->p.path("/movie/auth/**").uri("http://localhost:8025/*"))
                .route(p->p.path("/theatre/**").uri("http://localhost:8030/*"))
                .route(p->p.path("/movieControl/**").uri("http://localhost:8030/*")).build();
    }
}
