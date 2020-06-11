create database TechCare;
use TechCare;

Create table Hospital(
idHospital int primary key auto_increment,
Nome_Hospital varchar(45), 
Rua varchar(45),
Numero varchar(5), 
CEP char(8), 
Bairro varchar(45)
);

Create table Ala(
idAla int, 
fkHospitalAla int, 
foreign key (fkHospitalAla) references Hospital (idHospital), 
primary key (idAla, fkHospitalAla)
);

create table Funcionario(
 Email_func int primary key auto_increment, 
 fkFuncPermissão int, 
 Senha varchar(18),
 fkHospitalAla int, -- Pensar em um nome para essa fk
 foreign key (fkHospitalAla) references Hospital (idHospital),
 foreign key (fkFuncPermissão) references Funcionario (Email_func), 
 Nome_Funcionario varchar (45),
 Permissão char(1)
 check(Permissão = 's' or Permissão = 'n'),
 CPF char(11)
);

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
Umidade varchar (3), 
Temperatura varchar (2), 
Data_dados date, 
Hora time
);

