package com.ndc.demospring.models.dto;

public class UserTOTPInfo {
    public final String issuer;
    public final String loginName;
    public final String base32Key;
    public final String TOTPUrl;

    public UserTOTPInfo(String issuer, String loginName, String base32Key) {
        this.issuer = issuer;
        this.loginName = loginName;
        this.base32Key = base32Key;
        this.TOTPUrl = generateTOTPUrl();
    }

    private String generateTOTPUrl() {
        return String.format("otpauth://totp/%s:%s?secret=%s&issuer=%s",
                this.issuer, this.loginName, this.base32Key, this.issuer);
    }
}
