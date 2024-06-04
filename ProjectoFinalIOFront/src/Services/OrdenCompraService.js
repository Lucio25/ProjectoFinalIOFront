const BASE_URL = 'http://localhost:3000';

export const OrdenCompraService = {

    // Obtener todos los OrdenCompras
    getOrdenCompras: async () => {
        const response = await fetch(`${BASE_URL}/purchase_orders/`);
        const data = await response.json();
        console.log(data)
        return data;
    },

    // Obtener un OrdenCompra por ID
    getOrdenCompra: async (id) => {
        const response = await fetch(`${BASE_URL}/purchase_orders/${id}`);
        const data = await response.json();
        return data;
    },

    // Crear un nuevo OrdenCompra
    createOrdenCompra: async (OrdenCompra) => {
        const response = await fetch(`${BASE_URL}/purchase_orders/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(OrdenCompra)
        });
        const data = await response.json();
        return data;
    },

    // Actualizar un OrdenCompra por ID
    updateOrdenCompra: async (id, OrdenCompra) => {
        const response = await fetch(`${BASE_URL}/purchase_orders/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(OrdenCompra)
        });
        const data = await response.json();
        return data;
    },

    // Eliminar un OrdenCompra por ID
    deleteOrdenCompra: async (id) => {
        await fetch(`${BASE_URL}/purchase_orders/${id}`, {
            method: "DELETE"
        });
    }
};