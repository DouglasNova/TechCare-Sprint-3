create table medidas (
    id int primary key auto_increment,
    temp varchar(25) NOT NULL,
    temp_value DOUBLE (10,2),
    humd varchar(25) NOT NULL,
    humd_value DOUBLE (10,2)
);

select * from medidas;
INSERT INTO medidas (temp,temp_value,humd,humd_value) VALUES ('Temperatura',?), ('Umidade',?);
insert into medidas values (null, 'Temperatura', ?, 'Umidade', ?);


