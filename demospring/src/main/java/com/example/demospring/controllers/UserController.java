package com.example.demospring.controllers;

import com.example.demospring.annotations.AllowAnonymous;
import com.example.demospring.models.persistence.User;
import com.example.demospring.models.request.UserLoginRequest;
import com.example.demospring.models.response.UserLoginResponse;
import com.example.demospring.models.response.UserOtpSetupResponse;
import com.example.demospring.repositories.UserRepository;
import com.example.demospring.services.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.UUID;

@RestController
@RequestMapping(value = "user", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {
    private final UserRepository userRepo;
    private final UserService userService;
    public UserController(UserRepository userRepo, UserService userService) {
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

    @AllowAnonymous
    @PostMapping("/authenticate")
    public UserLoginResponse GetUsers(@RequestBody UserLoginRequest request)
    {
        var res = new UserLoginResponse();
        res.result = userService.authenticate(request.loginName, request.password);
        return res;
    }

    @GetMapping("/otp-setup")
    public UserOtpSetupResponse SetupOtp(HttpSession session)
    {
        var id = UUID.fromString((String)session.getAttribute("uid"));
        var info = userService.initTOTP(id);
        var res = new UserOtpSetupResponse();
        res.info = info;
        return res;
    }

}
