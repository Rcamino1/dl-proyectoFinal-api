CREATE DATABASE proyecto_final_dl;

\c proyecto_final_dl;

-- Seguir orden de creación de tablas por las FK

CREATE TABLE Rol (
    id_cred SERIAL PRIMARY KEY,
    rol VARCHAR(255)
);

CREATE TABLE Usuario (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(255),
    apellido VARCHAR(255),
    email VARCHAR(255),
    password_hash VARCHAR(255),
    id_cred INTEGER,
    FOREIGN KEY (id_cred) REFERENCES Rol (id_cred)
);

CREATE TABLE Producto (
    id_producto SERIAL PRIMARY KEY,
    nombre VARCHAR(255),
    precio NUMERIC,
    img_url VARCHAR(255),
    descripcion TEXT,
    detalle TEXT
);

CREATE TABLE Carro (
    id_carro SERIAL PRIMARY KEY,
    id_usuario INTEGER,
    id_producto INTEGER,
    cantidad INTEGER,
    FOREIGN KEY (id_usuario) REFERENCES Usuario (id_usuario),
    FOREIGN KEY (id_producto) REFERENCES Producto (id_producto)
);
