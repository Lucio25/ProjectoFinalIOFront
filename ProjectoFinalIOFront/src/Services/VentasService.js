const BASE_URL = 'http://localhost:3000';

export const VentasService = {

    // Obtener todas las Ventas
    getVentas: async () => {
        const response = await fetch(`${BASE_URL}/sales/`);
        const data = await response.json();
        console.log(data)
        return data;
    },

    // Obtener una venta por ID
    getVenta: async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/sales/${id}`);
            console.log(id)
            // Verificar si la respuesta es exitosa
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
            }

            // Intentar convertir la respuesta a JSON
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            // Capturar y loguear el error
            console.error("Error fetching venta:", error.message);
            throw error;  // Re-lanzar el error para manejarlo en el componente llamante
        }
    },

    // Crear una nueva venta
    createVenta: async (venta) => {
        const response = await fetch(`${BASE_URL}/sales/`, {
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
        const response = await fetch(`${BASE_URL}/sales/${id}`, {
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
        await fetch(`${BASE_URL}/sales/${id}`, {
            method: "DELETE"
        });
    }
};