package com.ndc.demospring.models.persistence;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.UpdateTimestamp;
import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import java.sql.Timestamp;
import java.util.UUID;

@Getter
@Setter
@MappedSuperclass
public class ForAuditPurpose {

    @Type(type = "pg-uuid")
    @Column(name="created_by")
    private UUID createdBy = new UUID(0,0);

    @CreationTimestamp
    @Column(name="created_at")
    private Timestamp createdAt;

    @Type(type = "pg-uuid")
    @Column(name="last_update_by")
    private UUID lastUpdateBy = new UUID(0,0);

    @UpdateTimestamp
    @Column(name="last_updated_at")
    private Timestamp lastUpdatedAt;

    @Column(name="is_deleted")
    private boolean isDeleted = false;

    private int version = 0;
}
