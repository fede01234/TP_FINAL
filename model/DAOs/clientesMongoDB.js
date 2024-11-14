import { ObjectId } from "mongodb"
import CnxMongoDB from "../DBMongo.js"

class ModelMongoDB {
    constructor() {}

    obtenerClientes = async () => {
        if(!CnxMongoDB.connectionOk) throw Error('ERROR CNX BASE DE DATOS')
        const clientes = await CnxMongoDB.db.collection('clientes').find({}).toArray()
        return clientes
    }

    obtenerCliente = async id => {
        if(!CnxMongoDB.connectionOk) throw Error('ERROR CNX BASE DE DATOS')
        //const producto = await CnxMongoDB.db.collection('productos').findOne({_id: new ObjectId(id)})
        const cliente = await CnxMongoDB.db.collection('clientes').findOne({_id: ObjectId.createFromHexString(id)})
        return cliente
    }

    guardarCliente = async cliente => {
        if(!CnxMongoDB.connectionOk) throw Error('ERROR CNX BASE DE DATOS')

        await CnxMongoDB.db.collection('clientes').insertOne(cliente)
        return cliente
    }

    actualizarCliente = async (id, producto) => {
        if(!CnxMongoDB.connectionOk) throw Error('ERROR CNX BASE DE DATOS')

        await CnxMongoDB.db.collection('clientes').updateOne(
            {_id: ObjectId.createFromHexString(id)},
            {$set: cliente }
        )
        const clienteActualizado = await this.obtenerCliente(id)
        return clienteActualizado
    }

    borrarCliente = async id => {
        if(!CnxMongoDB.connectionOk) throw Error('ERROR CNX BASE DE DATOS')

        const clienteBorrado = await this.obtenerCliente(id)
        await CnxMongoDB.db.collection('clientes').deleteOne({_id: ObjectId.createFromHexString(id)})
        return clienteBorrado
    }
}

export default ModelMongoDB