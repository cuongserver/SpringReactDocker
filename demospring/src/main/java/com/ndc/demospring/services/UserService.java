package com.ndc.demospring.services;

import com.ndc.demospring.models.dto.UserLoginDto;
import com.ndc.demospring.models.dto.UserTOTPInit;


import java.util.UUID;

public interface UserService {
    UserLoginDto authenticate(String loginName, String password);

    UserTOTPInit initTOTP(UUID userId);
}
