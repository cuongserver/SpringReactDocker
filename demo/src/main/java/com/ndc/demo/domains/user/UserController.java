package com.ndc.demo.domains.user;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "user", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {
    @GetMapping("")
    public String Get() throws JsonProcessingException {
        var mapper = new ObjectMapper();
        var response = new Object() {
            public String message;
        };
        response.message = "spring works";
        return mapper.writeValueAsString(response);
    }
}
