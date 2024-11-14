import Servicio from '../servicio/contenidos.js'


class Controlador {
    constructor() {
        this.servicio = new Servicio()
    }

    obtenerContenidos = async (req,res) => {
        try {
           const { id } = req.params
            const contenidos = await this.servicio.obtenerContenidos(id)
            res.json(contenidos)
        }
        catch(error) {
            res.status(500).json({error: error.message})
        }
    }

    obtenerContenidoXTipo = async (req,res) => {
        try {
            const { tipo } = req.params
            const contenido = await this.servicio.obtenerContenidoXTipo(tipo)
            res.json(contenido)
        }   
        catch(error) {
            res.status(500).json({error: error.message})
        }

    }

    guardarContenido = async (req,res) => {
        try {
            const contenido = req.body

            //validación genérica del producto a guardar
            if(!Object.keys(contenido).length) throw new Error('contenido vacío')

            const contenidoGuardado = await this.servicio.guardarCliente(contenido)
            res.json(contenidoGuardado)
        }
        catch(error) {
            res.status(500).json({error: error.message})
        }
    }

    actualizarContenido = async (req,res) => {
        const { id } = req.params
        const contenido = req.body
        const contenidoActualizado = await this.servicio.actualizarContenido(id, contenido)
        res.json(contenidoActualizado)
    }

    borrarContenido = async (req,res) => {
        const { id } = req.params
        const contenidoEliminado = await this.servicio.borrarContenido(id)
        res.json(contenidoEliminado)
    }


}

export default Controlador