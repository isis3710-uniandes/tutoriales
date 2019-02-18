// Importa los módulos que usará la aplicación
var express = require('express');

// Crea una instancia del servidor
var app = express();

// Habilita el acceso al recurso ubicado en la raíz del servidor
app.get('/', function (req, res) {
	
  // Similar al módulo http, establece el contenido de la respuesta del servicio
  res.send('Hello World');
   
});

// Establece el puerto por el cuál escuchará el servidor
var server = app.listen(8081);