// Importa los módulos que usará la aplicación
var express = require('express');

// Crea una instancia del servidor
var app = express();

// Habilita el acceso al recurso ubicado en la raíz del servidor
app.get('/', function (req, res) {
	
  // Similar al módulo http, establece el contenido de la respuesta del servicio
  res.send('Hello World');
   
});

// Habilita el acceso mediante GET al recurso estudiante con id enviado como parámetro
app.get('/estudiante/:id', function (req, res) {
  
  // Permite obtener el parámetro indicado en el path
  var id = req.params.id;
  
  // Establece el contenido de la respuesta del servicio
  res.send('Lectura del estudiante con id ' + id);
   
});

// Habilita el acceso mediante POST al recurso estudiante
app.post('/estudiante', function (req, res) {

  // Construye la URI del recurso que se está creando
  var uri = req.originalUrl + '2';
  
  // Establece el contenido de la respuesta del servicio
  res.send('Creación de un nuevo estudiante con URI ' + uri);
   
});

// Habilita el acceso mediante PUT al recurso estudiante con id enviado como parámetro
app.put('/estudiante/:id', function (req, res) {
  
  // Permite obtener el parámetro indicado en el path
  var id = req.params.id;
  
  // Similar al módulo http, establece el contenido de la respuesta del servicio
  res.send('Modifica el estudiante con id ' + id);
   
});

// Habilita el acceso mdiante DELETE al recurso estudiante con id enviado como parámetro
app.delete('/estudiante/:id', function (req, res) {
  
  // Permite obtener el parámetro indicado en el path
  var id = req.params.id;
  
  // Similar al módulo http, establece el contenido de la respuesta del servicio
  res.send('Elimina el estudiante con id ' + id);
   
});

// Establece el puerto por el cuál escuchará el servidor
var server = app.listen(8081);