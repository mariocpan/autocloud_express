                                                        # API de AutoCloud 
   Servicio	            Verbo y ruta	                     Qué hace	                                      Respuestas
Listar vehículos	    GET /vehiculos	            Devuelve todas las fichas	                                200
Buscar vehículo	    GET /vehiculos/:placa	      Devuelve una ficha por placa	                           200, 404
Registrar vehículo	 POST /vehiculos	            Guarda   una ficha nueva	                            201, 400, 409
Actualizar vehículo	 PUT /vehiculos/:placa	      Cambia el tipo de un vehículo	                         200, 400, 404
Eliminar vehículo	    DELETE /vehiculos/:placa	   Saca la ficha del archivador                             200, 40