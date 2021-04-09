package com.ndc.demospring.controllers;

import com.ndc.demospring.annotations.AllowAnonymous;
import com.ndc.demospring.models.persistence.User;
import com.ndc.demospring.models.request.UserLoginRequest;
import com.ndc.demospring.models.response.UserLoginResponse;
import com.ndc.demospring.models.response.UserOtpSetupResponse;
import com.ndc.demospring.repositories.UserRepository;
import com.ndc.demospring.services.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
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
    public User GetUser(@RequestParam String loginName) {
        return userRepo.getUserByLoginName(loginName);
    }

    @AllowAnonymous
    @PostMapping("/authenticate")
    public UserLoginResponse GetUsers(@RequestBody UserLoginRequest request) {
        var res = new UserLoginResponse();
        res.result = userService.authenticate(request.loginName, request.password);
        return res;
    }

    @GetMapping("/otp-setup")
    public UserOtpSetupResponse SetupOtp(HttpServletRequest request) {
        var id = UUID.fromString((String) request.getAttribute("uid"));
        var info = userService.initTOTP(id);
        var res = new UserOtpSetupResponse();
        res.info = info;
        return res;
    }

}
