package com.ndc.demo.domains.user;

import org.springframework.context.annotation.Scope;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
@Scope("request")
public interface UserRepository extends JpaRepository<User, UUID> {
    User getUserByLoginName(String loginName);
}
