// Importa los módulos que usará la aplicación
var express = require('express');
var sqlite3 = require('sqlite3').verbose();

// Crea una instancia del servidor
var app = express();

// Habilita el uso de contenidos tipo JSON en las solicitudes
app.use(express.json());

// Habilita el acceso al recurso ubicado en la raíz del servidor
app.get('/', function (req, res) {
	
  // Similar al módulo http, establece el contenido de la respuesta del servicio
  res.send('Hello World');
   
});

// Habilita el acceso mediante GET al recurso estudiante con id enviado como parámetro
app.get('/estudiante/:id', function (req, res) {
  
  // Permite obtener el parámetro indicado en el path
  var id = +req.params.id;
  
  // Crea la conexión con la base de datos 
  var db = new sqlite3.Database('c:\\sqlite\\db\\uniandes.db');

  // Crea la sentencia SQL para realizar la consulta
  db.get(`SELECT id, nombre, apellido, carrera, semestre FROM estudiante WHERE id = ?`, 
    [id], function(err, row) {
    
    // Si ocurre algún error durante la consulta, retorna un error con código 500
    if (err) res.status(500).send('El servidor no pudo procesar la solicitud');
    
    // Establece el contenido de la respuesta del servicio
    res.send(row);

  });
 
  // Cierra la conexión con la base de datos
  db.close();
   
});

// Habilita el acceso mediante POST al recurso estudiante
app.post('/estudiante', function (req, res) {
  
  // Almacena en la variable el contenido de la solicitud
  var estudiante = req.body;

  // Crea la conexión con la base de datos 
  var db = new sqlite3.Database('c:\\sqlite\\db\\uniandes.db');

  // Crea la sentencia SQL para realizar la inserción
  db.run(`INSERT INTO estudiante(nombre,apellido,carrera,semestre) VALUES(?,?,?,?)`, 
    [estudiante.nombre, estudiante.apellido, estudiante.carrera, estudiante.semestre], function(err) {
    
    // Si ocurre algún error durante la inserción, retorna un error con código 500
    if (err) res.status(500).send('El servidor no pudo procesar la solicitud');

    // Construye la URI del recurso que se está creando
    var uri = req.originalUrl + '/' + this.lastID;
    
    // Establece el contenido de la respuesta del servicio
    res.send('Creación de un nuevo estudiante con URI ' + uri);

  });
 
  // Cierra la conexión con la base de datos
  db.close();
   
});

// Habilita el acceso mediante PUT al recurso estudiante con id enviado como parámetro
app.put('/estudiante/:id', function (req, res) {
  
  // Permite obtener el parámetro indicado en el path
  var id = req.params.id;
  
  // TODO: Implementación del UPDATE a la base de datos

  // Similar al módulo http, establece el contenido de la respuesta del servicio
  res.send('Modifica el estudiante con id ' + id);
   
});

// Habilita el acceso mdiante DELETE al recurso estudiante con id enviado como parámetro
app.delete('/estudiante/:id', function (req, res) {
  
  // Permite obtener el parámetro indicado en el path
  var id = req.params.id;
  
  // TODO: Implementación del DELETE a la base de datos

  // Similar al módulo http, establece el contenido de la respuesta del servicio
  res.send('Elimina el estudiante con id ' + id);
   
});

// Establece el puerto por el cuál escuchará el servidor
var server = app.listen(8081);