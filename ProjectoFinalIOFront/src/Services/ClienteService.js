const BASE_URL = 'http://localhost:3000';

export const ClienteService = {

    // Obtener todos los clientes
    getClientes: async () => {
        const response = await fetch(`${BASE_URL}/clients/`);
        const data = await response.json();
        console.log(data)
        return data;
    },

    // Obtener un cliente por ID
    getCliente: async (id) => {
        const response = await fetch(`${BASE_URL}/clients/${id}`);
        const data = await response.json();
        return data;
    },

    // Crear un nuevo cliente
    createCliente: async (cliente) => {
        const response = await fetch(`${BASE_URL}/clients/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente)
        });
        const data = await response.json();
        return data;
    },

    // Actualizar un cliente por ID
    updatecliente: async (id, cliente) => {
        const response = await fetch(`${BASE_URL}/clients/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente)
        });
        const data = await response.json();
        return data;
    },

    // Eliminar un cliente por ID
    deleteCliente: async (id) => {
        await fetch(`${BASE_URL}/clients/${id}`, {
            method: "DELETE"
        });
    }
};