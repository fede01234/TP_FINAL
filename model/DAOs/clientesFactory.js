import ModelFile from "./clientesFile.js"
import ModelMem from "./clientesMem.js"
import ModelMongoDB from "./clientesMongoDB.js"

class ModelFactory {
    static get(tipo) {
        switch (tipo) {
            case 'MEM':
                console.log('*** Persistiendo en Memoria ***')
                return new ModelMem()

            case 'FILE':
                console.log('*** Persistiendo en fileSystem ***')
                return new ModelFile('productos.json')

            case 'MONGODB':
                console.log('*** Persistiendo en MongoDB ***')
                return new ModelMongoDB('productos.json')

            default:
                console.log('*** Persistiendo en Memoria (default) ***')
                return new ModelMem()
        }
    }
}

export default ModelFactory