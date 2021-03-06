drop table if exists estimation_session;
create table estimation_session (
    session_id varchar not null primary key,
    password varchar,
    host_id varchar not null,
    params json,
    added_dttm timestamp not null default now()
);

drop table if exists votes;
create table votes (
    vote_id varchar not null primary key,
    session_id varchar not null,
    user_id varchar not null,
    vote_value integer not null,
    added_dttm timestamp not null default now()
);

drop table if exists users;
create table users (
    user_id varchar not null primary key,
    username varchar not null,
    last_request_dttm timestamp not null default now(),
    added_dttm timestamp not null default now()
);

drop table if exists refresh_tokens;
create table refresh_tokens (
    token varchar not null,
    user_id varchar not null,
    valid boolean not null default true,
    added_dttm timestamp not null default now()
);