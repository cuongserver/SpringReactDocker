CREATE TABLE users (
    id uuid primary key NOT NULL,
    email text NULL,
    login_name text NULL,
    display_name text NULL,
    password_hash text NULL,
    mfa_enabled boolean NOT NULL,
    mfa_key text NULL,
    salt text NULL,
    created_by uuid NOT NULL,
    created_at timestamp NOT NULL,
    last_update_by uuid NOT NULL,
    last_update_at timestamp NOT NULL,
    is_deleted boolean NOT NULL,
    version INT NOT NULL
);