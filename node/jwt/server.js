const express = require( 'express' );
const bodyParser = require( 'body-parser' );
let jwt = require( 'jsonwebtoken' );
let config = require( './config' );
let middleware = require( './middleware' );

// Clase encargada de la creaciíon del token
class HandlerGenerator {

  login( req, res ) {
    
    // Extrae el usuario y la contraseña especificados en el cuerpo de la solicitud
    let username = req.body.username;
    let password = req.body.password;
    
    // Este usuario y contraseña, en un ambiente real, deben ser traidos de la BD
    let mockedUsername = 'admin';
    let mockedPassword = 'password';

    // Si se especifico un usuario y contraseña, proceda con la validación
    // de lo contrario, un mensaje de error es retornado
    if( username && password ) {

      // Si los usuarios y las contraseñas coinciden, proceda con la generación del token
      // de lo contrario, un mensaje de error es retornado
      if( username === mockedUsername && password === mockedPassword ) {
        
        // Se genera un nuevo token para el nombre de usuario el cuál expira en 24 horas
        let token = jwt.sign( { username: username },
          config.secret, { expiresIn: '24h' } );
        
        // Retorna el token el cuál debe ser usado durante las siguientes solicitudes
        res.json( {
          success: true,
          message: 'Authentication successful!',
          token: token
        } );

      } else {
        
        // El error 403 corresponde a Forbidden (Prohibido) de acuerdo al estándar HTTP
        res.send( 403 ).json( {
          success: false,
          message: 'Incorrect username or password'
        } );

      }

    } else {

      // El error 400 corresponde a Bad Request de acuerdo al estándar HTTP
      res.send( 400 ).json( {
        success: false,
        message: 'Authentication failed! Please check the request'
      } );

    }

  }

  index( req, res ) {
    
    // Retorna una respuesta exitosa con previa validación del token
    res.json( {
      success: true,
      message: 'Index page'
    } );

  }

}

// Punto de entrada del servidor
function main () {

  // Especifica el tipo de aplicación, instacia el objeto encargado de la generación del token y el puerto del servidor 
  let app = express();
  let handlers = new HandlerGenerator();
  const port = process.env.PORT || 8000;

  // Indica los submodulos externos a ser usados por express
  app.use( bodyParser.urlencoded( { extended: true } ) );
  app.use( bodyParser.json() );

  // Especifica las rutas/endpoints de la aplicación junto con la lógica que deben procesar
  // Para el método GET, se especifica una cadena de handlers, handlers.index no se ejecutará a menos que la repuesta de middleware.checkToken sea exitosa
  app.post( '/login', handlers.login );
  app.get( '/', middleware.checkToken, handlers.index );

  // Indica el puerto por el que el servidor debe escuchar las solicitudes
  app.listen( port, () => console.log( `Server is listening on port: ${port}` ) );

}

main();