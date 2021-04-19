package com.ndc.demo.common.models;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.Column;
import java.sql.Timestamp;
import java.util.UUID;

public class ForAuditPurpose {
    @Type(type = "pg-uuid")
    @Column(name="created_by")
    public UUID createdBy = new UUID(0,0);

    @CreationTimestamp
    @Column(name="created_at")
    public Timestamp createdAt;

    @Type(type = "pg-uuid")
    @Column(name="last_update_by")
    public UUID lastUpdateBy = new UUID(0,0);

    @UpdateTimestamp
    @Column(name="last_updated_at")
    public Timestamp lastUpdatedAt;

    @Column(name="is_deleted")
    public boolean isDeleted = false;

    public int version = 0;
}
