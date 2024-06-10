const BASE_URL = 'http://localhost:3000';

export const DetalleVentaService = {

    // Obtener todos los detalle ventas
    getDetalleVentas: async () => {
        const response = await fetch(`${BASE_URL}/product_sales/`);
        const data = await response.json();
        console.log(data)
        return data;
    },

    // Obtener un detalle venta por ID
    getDetalleVenta: async (id) => {
        const response = await fetch(`${BASE_URL}/product_sales/${id}`);
        const data = await response.json();
        return data;
    },

    // Crear un nuevo detalle venta
    createDetalleVenta: async (DetalleVenta) => {
        const response = await fetch(`${BASE_URL}/product_sales/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(DetalleVenta)
        });
        const data = await response.json();
        return data;
    },

    // Actualizar un detalle venta por ID
    updateDetalleVenta: async (id, DetalleVenta) => {
        const response = await fetch(`${BASE_URL}/product_sales/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(DetalleVenta)
        });
        const data = await response.json();
        return data;
    },

    // Eliminar un detalle venta por ID
    deleteDetalleVenta: async (id) => {
        await fetch(`${BASE_URL}/product_sales/${id}`, {
            method: "DELETE"
        });
    }
};