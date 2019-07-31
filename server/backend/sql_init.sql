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

drop table if exists score;
create table score(
	id int(10) auto_increment not null,
    title varchar(80) not null,
    type varchar(10) not null,
    icon varchar(20) not null,
    composer varchar(40) not null,
    address varchar(100),
    primary key(id)
);

insert into score values (1, 'Beethoven_AnDieFerneGeliebte','xml','piano', 'Beethoven','/usr/local/musicxml');
insert into score values (2, 'MuzioClementi_SonatinaOpus36No1_Part2','xml','violin','Muzio Clementi','/usr/local/musicxml');
insert into score values (3, 'Saltarello_sample','musicxml','violin','none','/usr/local/musicxml');
insert into score values (4, 'Molihua','xml','violin','none','/usr/local/musicxml');
insert into score values (5, 'Firstdemo','xml','violin','none','/usr/local/musicxml');
select * from score;

drop table if exists advice;
create table advice(
    id int(10) auto_increment not null,
	user_id int(11) NOT NULL,
	time TIMESTAMP NOT NULL,
	ad varchar(200) NOT NULL,
    primary key(id)
);

INSERT INTO advice value(1,3,'2019-7-15','haha');
INSERT INTO advice value(2,5,'2019-7-14','soso');
select * from advice;

