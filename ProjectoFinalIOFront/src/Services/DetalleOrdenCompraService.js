const BASE_URL = 'http://localhost:3000';

export const DetalleOrdenComrpaService = {

    // Obtener todos los detalle orden compras
    getDetalleOrdenCompras: async () => {
        const response = await fetch(`${BASE_URL}/product_purchase_orders/`);
        const data = await response.json();
        console.log(data)
        return data;
    },

    // Obtener un detalle orden compra por ID
    getDetalleOrdenCompra: async (id) => {
        const response = await fetch(`${BASE_URL}/product_purchase_orders/${id}`);
        const data = await response.json();
        return data;
    },

    // Crear un nuevo detalle orden compra
    createDetalleOrdenCompra: async (DetalleOrden) => {
        const response = await fetch(`${BASE_URL}/product_purchase_orders/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(DetalleOrden)
        });
        const data = await response.json();
        return data;
    },

    // Actualizar un detalle orden compra por ID
    updateDetalleOrdenCompra: async (id, DetalleOrden) => {
        const response = await fetch(`${BASE_URL}/product_purchase_orders/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(DetalleOrden)
        });
        const data = await response.json();
        return data;
    },

    // Eliminar un detalle orden compra por ID
    deleteDetalleOrdenCompra: async (id) => {
        await fetch(`${BASE_URL}/product_purchase_orders/${id}`, {
            method: "DELETE"
        });
    }
};