package com.example.demospring.services;

import com.example.demospring.constants.UserLoginResults;
import com.example.demospring.helpers.CryptoHelper;
import com.example.demospring.repositories.UserRepository;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

@Service
@Scope("prototype")
public class UserServiceImpl implements UserService {
    private final UserRepository userRepo;
    private final CryptoHelper cryptoHelper;
    public UserServiceImpl(UserRepository userRepo, CryptoHelper cryptoHelper) {
        this.userRepo = userRepo;
        this.cryptoHelper = cryptoHelper;
    }

    @Override
    public String authenticate(String loginName, String password) {
        var results = userRepo.getUsersByLoginName(loginName);
        if(results.size() == 0) return UserLoginResults.FAILED;
        var user = results.get(0);
        var hash = cryptoHelper.createHash(password, user.getSalt());
        if(!hash.equals(user.getPasswordHash())) return UserLoginResults.FAILED;
        return UserLoginResults.SUCCESSFUL;
    }
}
