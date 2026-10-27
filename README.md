# API de AutoCloud Parking

API REST del proyecto AutoCloud Parking, para registrar vehículos, consultar tarifas y calcular el cobro por tiempo de permanencia. Está hecha con Node.js, Express, Mongoose y MongoDB.

## Cómo ejecutarla

1. Instalar las librerías: `npm install`
2. Tener MongoDB encendido en `mongodb://127.0.0.1:27017`. La base de datos se llama `autocloudparking`.
3. Encender el servidor: `npm start`. Queda en http://localhost:3000

## Servicios

| Servicio | Verbo y ruta | Requerimiento | Respuestas |
| --- | --- | --- | --- |
| Registrar vehículo | POST /vehiculos | HU02 | 201, 400, 409 |
| Listar vehículos | GET /vehiculos | HU03 | 200 |
| Buscar vehículo | GET /vehiculos/buscar?placa=ABC | HU03 | 200, 400, 404 |
| Actualizar vehículo | PUT /vehiculos/:placa | Apoyo | 200, 400, 404 |
| Eliminar vehículo | DELETE /vehiculos/:placa | Apoyo | 200, 404 |
| Calcular tarifa | GET /vehiculos/:placa/tarifa | HU04 | 200, 404 |
| Listar tarifas | GET /tarifas | HU04 | 200 |
| Registrar tarifa | POST /tarifas | HU04 | 201, 400, 409 |
| Actualizar tarifa | PUT /tarifas/:tipo | HU04 | 200, 400, 404 |

## Detalle de cada servicio

## Registrar vehículo

- **Método y ruta:** POST /vehiculos
- **Descripción:** guarda un vehículo nuevo en la base de datos.
- **Requerimiento:** HU02
- **Datos de entrada (JSON):** placa (texto, 6 letras o números, obligatoria) y tipo (Carro, Moto o Bicicleta, obligatorio).
- **Ejemplo de petición:** { "placa": "ABC123", "tipo": "Carro" }
- **Respuestas:**
  - 201: vehículo creado, devuelve la ficha con su fecha de ingreso.
  - 400: dato inválido, devuelve el mensaje del error.
  - 409: La placa ya esta registrada.

## Listar vehículos

- **Método y ruta:** GET /vehiculos
- **Descripción:** devuelve todos los vehículos registrados.
- **Requerimiento:** HU03
- **Datos de entrada:** ninguno.
- **Ejemplo de petición:** GET /vehiculos
- **Respuestas:**
  - 200: lista de vehículos con placa, tipo y fechaIngreso (vacía si no hay ninguno).

## Buscar vehículo

- **Método y ruta:** GET /vehiculos/buscar?placa=ABC
- **Descripción:** busca vehículos cuya placa contenga el texto escrito, sin importar mayúsculas o minúsculas.
- **Requerimiento:** HU03
- **Datos de entrada (parámetro en la dirección):** placa (texto con letras y números, total o parcial).
- **Ejemplo de petición:** GET /vehiculos/buscar?placa=TAR
- **Respuestas:**
  - 200: lista de vehículos que coinciden.
  - 400: La placa solo puede tener letras y numeros.
  - 404: No se encontraron coincidencias.

## Actualizar vehículo

- **Método y ruta:** PUT /vehiculos/:placa
- **Descripción:** cambia el tipo de un vehículo ya registrado, buscándolo por su placa.
- **Requerimiento:** Servicio de apoyo (no lo exige una HU).
- **Datos de entrada:** la placa va en la dirección y el tipo nuevo (Carro, Moto o Bicicleta) va en el cuerpo en formato JSON.
- **Ejemplo de petición:** PUT /vehiculos/TAR123 con el cuerpo { "tipo": "Moto" }
- **Respuestas:**
  - 200: devuelve la ficha del vehículo ya cambiada.
  - 400: Tipo de vehiculo no valido (u otro error de validación).
  - 404: Vehiculo no encontrado.

## Eliminar vehículo

- **Método y ruta:** DELETE /vehiculos/:placa
- **Descripción:** elimina un vehículo registrado, buscándolo por su placa.
- **Requerimiento:** Servicio de apoyo (no lo exige una HU).
- **Datos de entrada:** la placa va en la dirección y no lleva cuerpo.
- **Ejemplo de petición:** DELETE /vehiculos/DEL123
- **Respuestas:**
  - 200: Vehiculo eliminado.
  - 404: Vehiculo no encontrado.

## Calcular tarifa de un vehículo

- **Método y ruta:** GET /vehiculos/:placa/tarifa
- **Descripción:** calcula cuánto cobrar por un vehículo según las horas que lleva en el parqueadero (se redondean hacia arriba y se cobra mínimo 1 hora) y la tarifa por hora de su tipo.
- **Requerimiento:** HU04
- **Datos de entrada:** la placa va en la dirección y no lleva cuerpo.
- **Ejemplo de petición:** GET /vehiculos/TAR123/tarifa
- **Respuestas:**
  - 200: devuelve placa, tipo, fechaIngreso, horas, valorHora y total (horas por valorHora).
  - 404: Vehiculo no encontrado.
  - 404: No hay tarifa para este tipo de vehiculo.

## Listar tarifas

- **Método y ruta:** GET /tarifas
- **Descripción:** devuelve todas las tarifas por hora configuradas.
- **Requerimiento:** HU04
- **Datos de entrada:** ninguno.
- **Ejemplo de petición:** GET /tarifas
- **Respuestas:**
  - 200: lista de tarifas con tipo y valorHora (vacía si no hay ninguna).

## Registrar tarifa

- **Método y ruta:** POST /tarifas
- **Descripción:** guarda la tarifa por hora de un tipo de vehículo.
- **Requerimiento:** HU04
- **Datos de entrada (JSON):** tipo (Carro, Moto o Bicicleta, obligatorio y único) y valorHora (número mayor que 0, obligatorio).
- **Ejemplo de petición:** POST /tarifas con el cuerpo { "tipo": "Carro", "valorHora": 3000 }
- **Respuestas:**
  - 201: tarifa creada, devuelve la ficha.
  - 400: Tipo de vehiculo no valido, La hora debe ser mayor a 0, o error si el valor no es un número.
  - 409: Ya existe una tarifa para ese tipo de vehiculo.

## Actualizar tarifa

- **Método y ruta:** PUT /tarifas/:tipo
- **Descripción:** cambia el valor por hora de la tarifa de un tipo de vehículo.
- **Requerimiento:** HU04 (configuración de las tarifas)
- **Datos de entrada:** el tipo va en la dirección (por ejemplo Carro) y valorHora va en el cuerpo en formato JSON.
- **Ejemplo de petición:** PUT /tarifas/Carro con el cuerpo { "valorHora": 3500 }
- **Respuestas:**
  - 200: devuelve la tarifa ya cambiada.
  - 400: La hora debe ser mayor a 0 (u otro error de validación).
  - 404: Tarifa no encontrada.
