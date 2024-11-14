import ModelFactory from "../model/DAOs/clientesFactory.js"

import config from '../config.js'
import { validar } from "./validaciones/cliente.js"

//console.log( validar({nombre: 'CPU', precio: false, stock: 495}) )

class Servicio {
    constructor() {
        this.model = ModelFactory.get(config.MODO_PERSISTENCIA)
    }

    obtenerClientes = async id => {
        if (id) {
            const cliente = await this.model.obtenerCliente(id)
            return cliente
        }
        else {
            const clientes = await this.model.obtenerClientes()
            return clientes
        }
    }

    guardarCliente = async cliente => {
        //validación específica del producto a guardar 
        const rta = validar(cliente)
        if (rta.result) {
            const clienteGuardado = await this.model.guardarCliente(cliente)
            return clienteGuardado
        }
        else {
            throw rta.error
        }
    }

    actualizarCliente = async (id, cliente) => {
        const clienteActualizado = await this.model.actualizarCliente(id, cliente)
        return clienteActualizado
    }

    borrarCliente = async id => {
        const clienteEliminado = await this.model.borrarCliente(id)
        return clienteEliminado
    }

}

export default Servicio