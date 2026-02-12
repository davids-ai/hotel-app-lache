-- Script SQL para crear la tabla de habitaciones en Supabase
-- Ejecuta esto en el editor SQL de Supabase

CREATE TABLE rooms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  room_number INTEGER NOT NULL,
  floor INTEGER NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('disponible', 'ocupada', 'arrendada')),
  guest_name TEXT,
  guest_phone TEXT,
  modified_by TEXT CHECK (modified_by IN ('Fredy', 'Rocio', 'Administrador')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(floor, room_number)
);

-- Crear índices para mejor performance
CREATE INDEX idx_rooms_floor ON rooms(floor);
CREATE INDEX idx_rooms_status ON rooms(status);
CREATE INDEX idx_rooms_updated_at ON rooms(updated_at);

-- Insertar los datos iniciales (30 habitaciones: 10 por piso)
INSERT INTO rooms (room_number, floor, status) VALUES
-- Piso 1
(101, 1, 'disponible'),
(102, 1, 'disponible'),
(103, 1, 'disponible'),
(104, 1, 'disponible'),
(105, 1, 'disponible'),
(106, 1, 'disponible'),
(107, 1, 'disponible'),
(108, 1, 'disponible'),
(109, 1, 'disponible'),
(110, 1, 'disponible'),
-- Piso 2
(201, 2, 'disponible'),
(202, 2, 'disponible'),
(203, 2, 'disponible'),
(204, 2, 'disponible'),
(205, 2, 'disponible'),
(206, 2, 'disponible'),
(207, 2, 'disponible'),
(208, 2, 'disponible'),
(209, 2, 'disponible'),
(210, 2, 'disponible'),
-- Piso 3
(301, 3, 'disponible'),
(302, 3, 'disponible'),
(303, 3, 'disponible'),
(304, 3, 'disponible'),
(305, 3, 'disponible'),
(306, 3, 'disponible'),
(307, 3, 'disponible'),
(308, 3, 'disponible'),
(309, 3, 'disponible'),
(310, 3, 'disponible');
