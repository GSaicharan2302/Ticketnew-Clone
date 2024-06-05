package com.example.movieAppAuth.service;

import com.example.movieAppAuth.domain.EmailData;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "email-service",url = "localhost:65501")
public interface MailProxy {
    @PostMapping(value = "/mail-app/send-mail",consumes = "application/json", produces = "text/plain")
    ResponseEntity<String> sendEmailDTO(@RequestBody EmailData emailData);
}
