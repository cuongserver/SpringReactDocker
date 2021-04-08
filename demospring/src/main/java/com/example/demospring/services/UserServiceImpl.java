package com.example.demospring.services;

import com.example.demospring.helpers.CryptoHelper;
import com.example.demospring.helpers.JwtHelper;
import com.example.demospring.helpers.OtpHelper;
import com.example.demospring.models.dto.UserLoginDto;
import com.example.demospring.models.dto.UserTOTPInfo;
import com.example.demospring.models.dto.UserTOTPInit;
import com.example.demospring.models.persistence.User;
import com.example.demospring.repositories.UserRepository;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.UUID;

@Service
@Scope("prototype")
public class UserServiceImpl implements UserService {
    private final UserRepository userRepo;
    private final CryptoHelper cryptoHelper;
    private final JwtHelper jwtHelper;
    private final OtpHelper otpHelper;
    public UserServiceImpl(UserRepository userRepo, CryptoHelper cryptoHelper, JwtHelper jwtHelper, OtpHelper otpHelper) {
        this.userRepo = userRepo;
        this.cryptoHelper = cryptoHelper;
        this.jwtHelper = jwtHelper;
        this.otpHelper = otpHelper;
    }

    @Override
    public UserLoginDto authenticate(String loginName, String password) {
        var results = userRepo.getUsersByLoginName(loginName);
        if(results.size() == 0) return null;
        var user = results.get(0);
        var dto = new UserLoginDto();
        dto.mfaEnabled = user.getMfaEnabled();
        if(user.getMfaEnabled()) return dto;
        var hash = cryptoHelper.createHash(password, user.getSalt());
        if(!hash.equals(user.getPasswordHash())) return null;
        dto.displayName = user.getDisplayName();
        var model = new User();
        model.setId(UUID.fromString(user.getId()));
        dto.jwt = jwtHelper.generateJwt(model);
        return dto;
    }

    @Override
    public UserTOTPInit initTOTP(UUID userId) {
        var totpInfo = new UserTOTPInit();
        var user = userRepo.getUserById(userId);
        var base32Key = otpHelper.generateBase32EncodingKey(UUID.randomUUID().toString() + user.getId().toString());
        var claims = new HashMap<String, String>();
        claims.put("base32key", base32Key);
        totpInfo.totpInfo = new UserTOTPInfo("demospring", user.getLoginName(), base32Key);
        totpInfo.signature = jwtHelper.generateJwt(claims);
        return totpInfo;
    }


}
