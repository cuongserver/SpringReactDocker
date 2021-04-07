package com.example.demospring.helpers;

public interface OtpHelper {
    String generateOtpUrl(String key, String username, String issuer);
    boolean validatePIN(String PIN, String secretText);
    boolean validateTwoConsecutivePIN(String PIN1, String PIN2, String secretText);
}
