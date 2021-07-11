

CREATE TABLE IF NOT EXISTS usuario(
    cedula varchar not null,
    nombre VARCHAR NOT NULL,
    apellido VARCHAR NOT NULL,
	especialidad VARCHAR null,
    genero VARCHAR not NULL,
    direccion VARCHAR NOT NULL,
    celular VARCHAR NOT NULL,
	fechaVisita varchar not null
)

drop table usuario



CREATE TABLE IF NOT EXISTS mascota(
    codMascota varchar not null,
	nombreAnimal varchar not null,
    fechaNac VARCHAR NOT NULL,
    genero VARCHAR NOT NULL,
	raza varchar not null,
	edad integer not null,
	color VARCHAR not null,
	responsable varchar not null,
	veterinario varchar not null,
	nivelSalud varchar not null,
	esterilizado boolean not null
)

drop table mascota
drop table mascota

create table if not exists fichaMedica(
	codigoFicha varchar not null,
	fechaFicha varchar not null,
	responsable varchar not null,
	veterinario varchar not null,
	codigoProduc varchar not null
)

drop table fichaMedica


create table if not exists producto(
	codigoProduc varchar not null,
	nombreVacuna varchar not null,
	descripVacuna varchar not null,
	cantDisponibidad integer not null,
	NombreProveedor varchar not null
)


drop table producto

create table if not exists factura(
	codFactura varchar not null,
	codProducto varchar not null,
	cedulaCliente varchar not null,
	codigoFicha varchar not null
)