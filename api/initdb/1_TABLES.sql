drop table if exists reservations;#adapt tables when we run
drop table if exists members;
drop table if exists attendees;
drop table if exists rooms;

create table members
(
    id_members bigint auto_increment,
    constraint members_pk
        primary key (id_members),
    first_name varchar(255) not null,
    last_name varchar(255) not null,
    mail varchar(255) not null,
    birth_date TIMESTAMP not null
);

create table rooms
(
    id_rooms bigint auto_increment,
    constraint rooms_pk
        primary key (id_rooms),
    name varchar(255) not null,
    capacity bigint not null,
    equipment varchar(255) not null,
    picture varchar(255) not null
);

create table reservations
(
    id_reservations bigint auto_increment,
    constraint reservations_pk
        primary key (id_reservations),
    debut TIMESTAMP not null,
    fin TIMESTAMP not null,
    id_leader bigint not null,
    id_room bigint not null
);

create table attendees
(
    id_attendees bigint auto_increment,
        constraint attendees_pk
            primary key (id_attendees),
    id_member bigint not null,
    id_reservation bigint not null
);



