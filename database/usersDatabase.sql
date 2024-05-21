create database usersDatabase;
use usersDatabase;
-- drop database usersDatabase;

select * from rh_user;
select * from user; 

create TABLE rh_user (
	rrhh_user_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL
);

create TABLE user (
	user_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
	fullname VARCHAR(30) NOT NULL,
    department VARCHAR(30) NOT NULL, 
    salary DECIMAL(7,2) NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE
)

