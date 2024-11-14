import Servicio from '../servicio/clientes.js'


class Controlador {
    constructor() {
        this.servicio = new Servicio()
    }

    obtenerClientes = async (req,res) => {
        try {
           const { id } = req.params
            const clientes = await this.servicio.obtenerClientes(id)
            res.json(clientes)
        }
        catch(error) {
            res.status(500).json({error: error.message})
        }
    }

    guardarCliente = async (req,res) => {
        try {
            const cliente = req.body

            //validación genérica del producto a guardar
            if(!Object.keys(cliente).length) throw new Error('cliente vacío')

            const clienteGuardado = await this.servicio.guardarCliente(cliente)
            res.json(clienteGuardado)
        }
        catch(error) {
            res.status(500).json({error: error.message})
        }
    }

    actualizarCliente = async (req,res) => {
        const { id } = req.params
        const cliente = req.body
        const clienteActualizado = await this.servicio.actualizarCliente(id, cliente)
        res.json(clienteActualizado)
    }

    borrarCliente = async (req,res) => {
        const { id } = req.params
        const clienteEliminado = await this.servicio.borrarCliente(id)
        res.json(clienteEliminado)
    }


}

export default Controlador