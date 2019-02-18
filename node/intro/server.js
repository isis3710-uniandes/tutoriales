// Importa el módulo http para la creación del servidor
var http = require('http');

// Crea una nueva instancia del servidor
http.createServer(function (req, res) {

  // Encabezado de la respuesta por defecto del servidor
  res.writeHead(200, {'Content-Type': 'text/html'}); 
  
  // Contenido de la respuesta por defecto del servidor
  res.end('Hello World!');

}).listen(8080); // Puerto que usará el servidor para escuchar las solicitudes