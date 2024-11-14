class ModelMem {
    constructor() {
        this.clientes = [
            { id: '1', nombre: 'Cristian', dni: 42, edad: 80 },
            { id: '2', nombre: 'Federico', dni: 43, edad: 75 },
            { id: '3', nombre: 'Octavio', dni: 44, edad: 77 },
        ]
    }

    obtenerClientes = async () => this.clientes

    obtenerCliente = async id => {
        const cliente = this.clientes.find(c => c.id === id)
        return cliente || {}
    }

    guardarCliente = async cliente => {
        cliente.id = String(parseInt(this.clientes[this.clientes.length-1]?.id || 0) + 1)  // ?. optional chaining
        
        cliente.stock = parseInt(cliente.stock)
        cliente.precio = +cliente.precio

        this.clientes.push(cliente)
        return cliente    
    }

    actualizarCliente = async (id, cliente) => {
        cliente.id = id

        const index = this.clientes.findIndex(c => c.id === id)
        if(index != -1) {
            const clienteAnt = this.clientes[index]
            const clienteAct = { ...clienteAnt, ...cliente } // Spread Operator + Object Merge
            this.clientes.splice(index, 1, clienteAct)

            return clienteAct
        }
        else {
            return {}
        }
    }

    borrarCliente = async id => {
        let cliente = {}

        const index = this.clientes.findIndex(c => c.id === id)
        if(index != -1) {
            cliente = this.clientes.splice(index, 1)[0]
        }

        return cliente
    }
}

export default ModelMem