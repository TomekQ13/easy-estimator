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
create tables users (
    user_id varchar not null primary key,
    session_hash varchar not null,
    username varchar not null,
    valid_to_dttm timestamp not null
);