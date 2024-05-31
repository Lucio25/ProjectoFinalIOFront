const BASE_URL = 'http://localhost:9192';

export const VentasService = {

    // Obtener todas las Ventas
    getVentas: async () => {
        const response = await fetch(`${BASE_URL}/api/venta/all`);
        const data = await response.json();
        console.log(data)
        return data;
    },

    // Obtener una venta por ID
    getVenta: async (id) => {
        const response = await fetch(`${BASE_URL}/api/venta/${id}`);
        console.log(response)
        const data = await response.json();
        return data;
    },

    // Crear una nueva venta
    createVenta: async (venta) => {
        const response = await fetch(`${BASE_URL}/api/venta/create`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(venta)
        });
        const data = await response.json();
        return data;
    },

    // Actualizar una venta por ID
    updateVenta: async (id, venta) => {
        const response = await fetch(`${BASE_URL}/api/venta/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(venta)
        });
        const data = await response.json();
        return data;
    },

    // Eliminar una venta por ID
    deleteVenta: async (id) => {
        await fetch(`${BASE_URL}/api/venta/${id}`, {
            method: "DELETE"
        });
    }
};