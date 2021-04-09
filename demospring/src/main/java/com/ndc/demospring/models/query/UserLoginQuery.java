package com.ndc.demospring.models.query;

public interface UserLoginQuery {
    String getId();
    String getEmail();
    String getLoginName();
    String getDisplayName();
    String getSalt();
    String getPasswordHash();
    boolean getMfaEnabled();
}
