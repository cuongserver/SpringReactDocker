package com.example.demospring.helpers;

import org.apache.commons.codec.binary.Base32;
import org.springframework.stereotype.Component;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Component
public class OtpHelperImpl implements OtpHelper {
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
        return false;
    }

    @Override
    public boolean validateTwoConsecutivePIN(String PIN1, String PIN2, String secretText) {
        return false;
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
