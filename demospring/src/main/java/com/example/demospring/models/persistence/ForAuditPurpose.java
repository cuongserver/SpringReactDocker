package com.example.demospring.models.persistence;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import java.sql.Timestamp;
import java.util.UUID;

@Getter
@Setter
@MappedSuperclass
public class ForAuditPurpose {

    @Column(name = "created_by")
    private UUID createdBy = new UUID(0,0);

    @Column(name = "created_at")
    @CreationTimestamp
    private Timestamp createdAt;

    @Column(name = "last_update_by")
    private UUID lastUpdateBy = new UUID(0,0);

    @Column(name = "last_update_at")
    @UpdateTimestamp
    private Timestamp updatedAt;

    @Column(name="is_deleted")
    private boolean isDeleted = false;

    @Column(name="version")
    private int version = 0;
}
