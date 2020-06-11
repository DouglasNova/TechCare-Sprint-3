create database sensor;
use sensor;

create table medidas (
    ID_medidas int primary key auto_increment,
    Humd varchar (25),
    Humd_value double (10,2),
    Temp varchar (25),
    Temp_value double (10,2)
) auto_increment = 1;