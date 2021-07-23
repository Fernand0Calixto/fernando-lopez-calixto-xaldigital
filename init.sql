CREATE DATABASE Temporal;

CREATE TABLE client (
    email varchar(50),
    first_name varchar(20),
    last_name varchar(20),
    company_name varchar(100),
    address varchar(100),
    city varchar(50),
    state varchar(2),
    zip integer,
    phone1 varchar(15),
    phone2 varchar(15),
    department varchar(50)
);