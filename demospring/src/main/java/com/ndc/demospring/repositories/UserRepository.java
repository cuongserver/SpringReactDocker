package com.ndc.demospring.repositories;

import com.ndc.demospring.models.persistence.User;
import com.ndc.demospring.models.query.UserLoginQuery;
import org.springframework.context.annotation.Scope;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
@Scope("request")
public interface UserRepository extends JpaRepository<User, UUID> {
    User getUserByLoginName(String loginName);

    @Query(value = """
                select cast(id as varchar) as id, 
                login_name as loginName, 
                display_name as displayName, 
                email, 
                mfa_enabled as mfaEnabled,
                salt,
                password_hash as passwordHash from users where login_name = :loginName
            """, nativeQuery = true)
    List<UserLoginQuery> getUsersByLoginName(String loginName);
    User getUserById(UUID id);
}
