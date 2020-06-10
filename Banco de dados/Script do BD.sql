create database TechCare;
use TechCare;

Create table Hospital(
idHospital int primary key auto_increment,
Nome_Hospital varchar(45), 
Rua varchar(45),
Numero varchar(5), 
CEP char(12), 
Bairro varchar(45)
);

insert into Hospital values
    (1, 'Albert Einstein', 'Av. Albert Einstein', '627', '05652-900', 'Jardim Leonor'),
    (2, 'Sírio Libanês', 'Joaquim Floriano', '533', '04534-011', 'Itaim Bibi');

Create table Ala(
idAla int primary key auto_increment, 
fkHospitalAla int, 
foreign key (fkHospitalAla) references Hospital (idHospital)
);

insert into Ala values
    (null, 1),
    (null, 2);

create table Funcionario(
    ID_Funcio int primary key auto_increment,
    Email_func varchar(45), 
    Senha varchar(18),
    fkHospitalFunc int,
foreign key (fkHospitalFunc) 
references Hospital (idHospital),
    Nome_Funcionario varchar (45),
    Permissão bit,
 check(Permissão = 1 or Permissão = 0),
    CPF char(11)
);

insert into Funcionario value
    (null, 'fulano1@alberteinster.com', 123, 1, 'Julio Silveira', 1, 45187602802),
    (null, 'fulano2@siriolibanes.com', 456, 2, 'Gabriel da Silva', 1, 68748934594);

create table Sensor(
idSensor int primary key auto_increment, 
fkAla int, 
foreign key (fkAla) references Ala (idAla)
);

create table Dados_do_sensor(
idDados int, 
fkSensor int, 
foreign key (fkSensor) references Sensor (idSensor),
primary key (idDados, fkSensor),
Umidade Double (10,2), 
Temperatura Double (10,2), 
Data_hora datetime
);


