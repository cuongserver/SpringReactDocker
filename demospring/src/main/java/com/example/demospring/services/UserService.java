package com.example.demospring.services;

import com.example.demospring.models.dto.UserLoginDto;

public interface UserService {
    UserLoginDto authenticate(String loginName, String password);
}
