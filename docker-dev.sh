#!/bin/bash

# Detener y eliminar contenedores existentes
docker-compose down

# Construir y levantar los contenedores
docker-compose up --build

# Para ejecutar en segundo plano, usa:
# docker-compose up --build -d 