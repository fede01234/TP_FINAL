import express from 'express'
import RouterProductos from './router/clientes.js'

import config from './config.js'
import CnxMongoDB from './model/DBMongo.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

// ----------------------------------
//     ApiRestful: productos
// ----------------------------------
app.use('/api/clientes', new RouterProductos().start())


//-----------------------------------
//    Listen del servidor http
//-----------------------------------
if(config.MODO_PERSISTENCIA == 'MONGODB') {
    await CnxMongoDB.conectar()
}

const PORT = config.PORT
const server = app.listen(PORT, () => console.log(`Servidor ApiRestful escuchando en http://localhost:${PORT}`))
server.on('error', error => console.log(`Error en servidor: ${error.message}`))
