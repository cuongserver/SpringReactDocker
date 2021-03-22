package com.example.demospring.models.persistence;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.UUID;

@Entity
@Getter
@Setter
@Table(name="users")
public class User extends ForAuditPurpose {
    @Id
    @Column(name="id")
    private UUID id;

    @Column(name="email")
    private String email;

    @Column(name="login_name")
    private String loginName;

    @Column(name="display_name")
    private String displayName;

    @Column(name="password_hash")
    private String passwordHash;

    @Column(name="mfa_enabled")
    private boolean mfaEnabled = false;

    @Column(name="mfa_key")
    private String mfaKey;

    @Column(name="salt")
    private String salt;
}


