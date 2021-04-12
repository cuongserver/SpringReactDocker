package com.ndc.demospring.services;

import com.ndc.demospring.models.dto.UserLoginDto;
import com.ndc.demospring.models.dto.UserLoginWithOtpDto;
import com.ndc.demospring.models.dto.UserTOTPInit;


import java.util.UUID;

public interface UserService {
    UserLoginDto authenticate(String loginName, String password);

    UserTOTPInit initTOTP(UUID userId);
    boolean setupOtp(UUID id, String signature, String pin1, String pin2);

    UserLoginWithOtpDto authenticateOtp(String loginName, String password, String otp);
}
