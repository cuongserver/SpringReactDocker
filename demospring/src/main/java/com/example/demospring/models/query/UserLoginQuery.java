package com.example.demospring.models.query;

import org.hibernate.annotations.Type;

import java.util.UUID;

public interface UserLoginQuery {
    String getId();
    String getEmail();
    String getLoginName();
    String getDisplayName();
    String getSalt();
    String getPasswordHash();
    boolean getMfaEnabled();
}
