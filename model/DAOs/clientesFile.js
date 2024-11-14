import fs from 'fs'

class ModelFile {
    #nombreArchivo = null

    constructor(file) {
        this.#nombreArchivo = file
    }

    #leerArchivo = async nombre => {
        let clientes = []
        try {
            clientes = JSON.parse(await fs.promises.readFile(nombre, 'utf-8'))
        }
        catch {}
        return clientes
    }

    #escribirArchivo = async (nombre, clientes) => {
        await fs.promises.writeFile(nombre, JSON.stringify(clientes, null, '\t'))
    }

    obtenerClientes = async () => await this.#leerArchivo(this.#nombreArchivo)

    obtenerCliente = async id => {
        const clientes = await this.#leerArchivo(this.#nombreArchivo)
        const cliente = clientes.find(c => c.id === id)
        return cliente || {}
    }

    guardarCliente = async cliente => {
        const clientes = await this.#leerArchivo(this.#nombreArchivo)
        cliente.id = String(parseInt(clientes[clientes.length-1]?.id || 0) + 1)  // ?. optional chaining
        
        cliente.stock = parseInt(cliente.stock)
        cliente.precio = +cliente.precio
        clientes.push(cliente)
        await this.#escribirArchivo(this.#nombreArchivo, clientes)
        
        return cliente    
    }

    actualizarCliente = async (id, cliente) => {
        const clientes = await this.#leerArchivo(this.#nombreArchivo)
        cliente.id = id

        const index = clientes.findIndex(c => c.id === id)
        if(index != -1) {
            const clienteAnt = clientes[index]
            const clienteAct = { ...clienteAnt, ...cliente } // Spread Operator + Object Merge
            clientes.splice(index, 1, clienteAct)
            await this.#escribirArchivo(this.#nombreArchivo, clientes)

            return clienteAct
        }
        else {
            return {}
        }
    }

    borrarCliente = async id => {
        const clientes = await this.#leerArchivo(this.#nombreArchivo)
        let cliente = {}

        const index = clientes.findIndex(c => c.id === id)
        if(index != -1) {
            cliente = clientes.splice(index, 1)[0]
            await this.#escribirArchivo(this.#nombreArchivo, clientes)
        }

        return cliente
    }
}

export default ModelFile