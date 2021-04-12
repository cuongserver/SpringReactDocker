package com.ndc.demospring.helpers;

import com.warrenstrange.googleauth.GoogleAuthenticator;
import com.warrenstrange.googleauth.ICredentialRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.codec.binary.Base32;
import org.springframework.stereotype.Component;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class OtpHelperImpl implements OtpHelper {

    private final GoogleAuthenticator googleAuthenticator;

    public OtpHelperImpl() {
        googleAuthenticator = new GoogleAuthenticator();
        googleAuthenticator.setCredentialRepository(new CredentialRepository());
    }

    @Override
    public String generateOtpUrl(String key, String username, String issuer) {
        String base32key = generateBase32Encoding(key);
        String otpAuthUrl = String.format("otpauth://totp/%s:%s?secret=%s&issuer=%s",
                issuer, username, base32key, issuer);
        return otpAuthUrl;
    }

    @Override
    public String generateBase32EncodingKey(String key) {
        return generateBase32Encoding(key);
    }

    @Override
    public boolean validatePIN(String PIN, String secretText) {
        googleAuthenticator.setCredentialRepository(new CredentialRepository());
        var p = String.valueOf(googleAuthenticator.getTotpPassword(secretText));
        return p.equals(PIN);
    }

    @Override
    public boolean validateTwoConsecutivePIN(String PIN1, String PIN2, String secretText) {
        String pin1 = String.valueOf(googleAuthenticator.getTotpPassword(secretText, (new Date()).getTime() - 30000));
        String pin2 = String.valueOf(googleAuthenticator.getTotpPassword(secretText, (new Date()).getTime()));
        return pin1.equals(PIN1) && pin2.equals(PIN2);
    }

    private String generateBase32Encoding(String key) {
        String hash;
        try {
            MessageDigest crypt = MessageDigest.getInstance("SHA-1");
            crypt.reset();
            crypt.update(key.getBytes(StandardCharsets.UTF_8));
            hash = new BigInteger(1, crypt.digest()).toString(16);
        } catch (NoSuchAlgorithmException e) {
            hash = "";
        }
        Base32 base32 = new Base32();
        return base32.encodeToString(hash.getBytes(StandardCharsets.UTF_8));
    }
}

class CredentialRepository implements ICredentialRepository {

    private final Map<String, UserTOTP> usersKeys = new HashMap<String, UserTOTP>();

    @Override
    public String getSecretKey(String userName) {
        return usersKeys.get(userName).getSecretKey();
    }

    @Override
    public void saveUserCredentials(String userName, String secretKey, int validationCode, List<Integer> scratchCodes) {
        usersKeys.put(userName, new UserTOTP(userName, secretKey, validationCode, scratchCodes));
    }

    public UserTOTP getUser(String username) {
        return usersKeys.get(username);
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    class UserTOTP {
        private String username;
        private String secretKey;
        private int validationCode;
        private List<Integer> scratchCodes;
    }
}
