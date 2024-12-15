drop table if exists estimation_session;
create table estimation_session (
    session_id varchar not null primary key,
    password varchar,
    host_id varchar,
    show_votes boolean default false,
    reset_voting boolean default false,
    session_name varchar,
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

drop table if exists user_session;
create table user_session (
    session_id varchar not null,
    user_id varchar not null,
    vote_value varchar,
    added_dttm timestamp not null default now(),
    constraint user_session_pk primary key (session_id, user_id)
);