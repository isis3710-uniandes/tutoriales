// Importa los módulos que usará la aplicación
var http = require('http');
var fs = require('fs');

// Crea una nueva instancia del servidor
http.createServer(function (req, res) {
  
  // Lee el archivo testfile.txt el cual se encuentra en la misma ruta que este script
  fs.readFile('testfile.txt', 'utf8', function(err, data) {
    if (err) throw err; // Retorna error si no encuentra el archivo
	
    // Encabezado de la respuesta del servidor
    res.writeHead(200, {'Content-Type': 'text/html'}); 
  
    // Especifica el contenido que debe ser incluido en la respuesta
    res.end(data);
  });

}).listen(8080); // Puerto que usará el servidor para escuchar las solicitudes