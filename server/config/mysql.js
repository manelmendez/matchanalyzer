const mysql = require('mysql')
const fs = require('fs')
require('dotenv').config({path: __dirname + '/../.env'}) //cargar archivo .env

// Con archivo .mysql.json
// let config = fs.readFileSync(__dirname + '/mysql.json', 'utf8')
// const connection = mysql.createPool(JSON.parse(config))

let config = {
  host: process.env.PMA_HOST || process.env.MYSQL_PORT_3306_TCP_ADDR || process.env.DB_HOST || connection.DB_HOST,
  user: process.env.DB_USER || connection.DB_USER,
  password: process.env.DB_PASS || connection.DB_PASS,
  database: process.env.DB_NAME || connection.DB_NAME,
  multipleStatements: true
}

var connection = mysql.createPool(config);

// function handleDisconnect() {
//     if (connection) connection.destroy()
//     connection = mysql.createConnection()// Recreate the connection, since the old one cannot be reused.
//     connection.connect((err, res) => {
//       if (err) {
//         console.log(`Error al conectar a la base de datos: ${err}`)
//         setTimeout(handleDisconnect, 10000);
//       }
//       else {
//         console.log('Conectado a la base de datos')
//       }
//     })
//     connection.on('error', function onError(err) {
//         console.log('DB ERROR', err);
//         if (err.code == 'PROTOCOL_CONNECTION_LOST' || err.code == 'ECONNREFUSED' || err.code == 'ENOTFOUND') {
//           setTimeout(handleDisconnect, 10000);
//         } else {
//             throw err;
//         }
//     });
// }
// handleDisconnect();

//-
//- Establish a new connection
//-
connection.getConnection(function(err){
  if(err) {
    // mysqlErrorHandling(connection, err);
    console.log("\n\t *** Cannot establish a connection with the database. ***");
    
    connection = reconnect(connection);
  }else {
    console.log("\n\t *** New connection established with the database. ***")
  }
});


//-
//- Reconnection function
//-
function reconnect(connection){
    console.log("\n New connection tentative...");

    //- Create a new one
    connection = mysql.createPool(config);

    //- Try to reconnect
    connection.getConnection(function(err){
        if(err) {
            //- Try to connect every 5 seconds.
          setTimeout(function(){
            reconnect(connection)
          },5000);
        }else {
            console.log("\n\t *** New connection established with the database. ***")
            return connection;
        }
    });
}

connection.on('error', function onError(err) {
    console.log('DB ERROR', err);
    if (err.code == 'PROTOCOL_CONNECTION_LOST' || err.code == 'ECONNREFUSED' || err.code == 'ENOTFOUND') {
      reconnect(connection)
    } else {
      throw err;
    }
});

module.exports = connection
