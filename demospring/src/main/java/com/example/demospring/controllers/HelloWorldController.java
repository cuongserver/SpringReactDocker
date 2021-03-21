package com.example.demospring.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "hello-world", produces = MediaType.APPLICATION_JSON_VALUE)
public class HelloWorldController {
    @GetMapping("")
    public String Get() throws JsonProcessingException {
        var mapper = new ObjectMapper();
        var message = new Object() {
            public String message;
        };
        message.message = "hello-world";
        return mapper.writeValueAsString(message);
    }
}
