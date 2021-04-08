package com.example.demospring.services;

import com.example.demospring.models.dto.UserLoginDto;
import com.example.demospring.models.dto.UserTOTPInit;


import java.util.UUID;

public interface UserService {
    UserLoginDto authenticate(String loginName, String password);

    UserTOTPInit initTOTP(UUID userId);
}
