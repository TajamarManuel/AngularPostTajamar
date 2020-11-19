drop schema if exists PostTajamar;
create schema PostTajamar;
use PostTajamar;


create table CategoriasTrabajadores (
	id int auto_increment not null,
    categoria varchar(150) not null,
    incrementoSalarial int not null,
    descripcion text not null,
CONSTRAINT pkCategoriasTrabajadores PRIMARY KEY (id));

create table oficinas (
	id int auto_increment not null,
    oficina varchar(150) not null,
    descripcion text not null,
    direccion text not null,
CONSTRAINT pkOficinas PRIMARY KEY (id));

create table estadosPersona (
	id int auto_increment not null,
    estado varchar(150) not null,
CONSTRAINT pkEstadosPersona PRIMARY KEY (id));

create table personas (
	id int auto_increment not null,
    dni varchar(9) not null,
    nombre varchar(150) not null,
    apellidos varchar(150) not null,
    direccion text not null,
    discapacidad int default 0,
    email text not null,
    telefono int not null,
    numeroHijos int not null,
    estadoId int not null,
    fechaNacimiento text not null,
    contrasena text not null,
CONSTRAINT pkPersonas PRIMARY KEY (id),
CONSTRAINT fkPersonasEstado FOREIGN KEY (estadoId) REFERENCES estadosPersona (id) on update cascade on delete restrict);

create table trabajadores (
	id int auto_increment not null,
    personaId int not null,
    sueldoBase int not null,
    fechaEntrada text not null,
    fechaSalida text default null,
    motivoDespido text default null,
    fechaBaja text default null,
    motivoBaja text default null,
    oficinaId int not null,
    categoriaTrabajadorId int not null,
CONSTRAINT pkTrabajadores PRIMARY KEY (id),
CONSTRAINT fkTrabajadoresPersona FOREIGN KEY (personaId) REFERENCES personas (id) on update cascade on delete restrict,
CONSTRAINT fkTrabajadoresOficina FOREIGN KEY (oficinaId) REFERENCES oficinas (id) on update cascade on delete restrict,
CONSTRAINT fkTrabajadoresCategoriaTrabajador FOREIGN KEY (categoriaTrabajadorId) REFERENCES categoriasTrabajadores (id) on update cascade on delete restrict);

create table historicosCategorias (
	id int auto_increment not null,
    fechaUpgrade text not null,
    fechaSalida text default null,
    categoriasTrabajadorId int not null,
    trabajadorId int not null,
CONSTRAINT pkHistoricosCategorias PRIMARY KEY (id),
CONSTRAINT fkHistoricosCategoriasCategoriaTrabajador FOREIGN KEY (categoriasTrabajadorId) REFERENCES categoriasTrabajadores (id) on update cascade on delete restrict,
CONSTRAINT fkHistoricosCategoriasTrabajadorId FOREIGN KEY (trabajadorId) REFERENCES trabajadores (id) on update cascade on delete cascade);

create table administracion (
	id int auto_increment not null,
    accion text not null,
    fecha text not null,
    trabajadorId int default null,
CONSTRAINT pkAdministracion PRIMARY KEY (id),
CONSTRAINT fkAdministracionTrabajador FOREIGN KEY (trabajadorId) REFERENCES trabajadores (id) on update cascade on delete restrict);