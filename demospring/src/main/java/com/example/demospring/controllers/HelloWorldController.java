package com.example.demospring.controllers;

import com.example.demospring.models.persistence.User;
import com.example.demospring.models.query.UserLoginQuery;
import com.example.demospring.models.request.UserLoginRequest;
import com.example.demospring.models.response.UserLoginResponse;
import com.example.demospring.repositories.UserRepository;
import com.example.demospring.services.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "hello-world", produces = MediaType.APPLICATION_JSON_VALUE)
public class HelloWorldController {
    private final UserRepository userRepo;
    private final UserService userService;
    public HelloWorldController(UserRepository userRepo, UserService userService) {
        this.userRepo = userRepo;
        this.userService = userService;
    }

    @GetMapping("")
    public String Get() throws JsonProcessingException {
        var mapper = new ObjectMapper();
        var message = new Object() {
            public String message;
        };
        message.message = "hello-world";
        return mapper.writeValueAsString(message);
    }
    @GetMapping("/get-user")
    public User GetUser(@RequestParam String loginName)
    {
        return userRepo.getUserByLoginName(loginName);
    }

    @PostMapping("/authenticate")
    public UserLoginResponse GetUsers(@RequestBody UserLoginRequest request)
    {
        var res = new UserLoginResponse();
        res.result = userService.authenticate(request.loginName, request.password);
        return res;
    }
}
