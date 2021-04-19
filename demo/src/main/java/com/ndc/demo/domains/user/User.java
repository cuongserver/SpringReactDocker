package com.ndc.demo.domains.user;

import com.ndc.demo.common.models.ForAuditPurpose;
import org.hibernate.annotations.Type;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.UUID;

@Entity
@Table(name = "users")
public class User extends ForAuditPurpose {
    @Id
    @Type(type = "pg-uuid")
    public UUID id;

    public String email;

    @Column(name="login_name")
    public String loginName;

    @Column(name="display_name")
    public String displayName;

    @Column(name="password_hash")
    public String passwordHash;

    @Column(name="mfa_enabled")
    public boolean mfaEnabled = false;

    @Column(name="mfa_key")
    public String mfaKey;

    public String salt;
}
