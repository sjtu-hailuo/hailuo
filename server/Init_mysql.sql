drop table if exists user;
create table user(
    user_id int(11) NOT NULL auto_increment,
    username varchar(20) NOT NULL,
	password varchar(20) NOT NULL,
    type enum('S','T','V') NOT NULL,
    gender enum('M','F') NOT NULL,
    primary key (user_id)
);

INSERT INTO user value(1,'hailuo','hailuo123','S','M');
INSERT INTO user value(2,'sjtu','sjtu','T','M');
select * from user;

-- drop table if exists homework;
-- create table homework(
--     hm_id int(11) NOT NULL auto_increment,
--     music_id int(11) 
    



