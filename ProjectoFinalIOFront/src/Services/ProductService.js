const BASE_URL = 'http://localhost:9192';

export const ProductoService = {

    // Obtener todos los productos
    getProductos: async () => {
        const response = await fetch(`${BASE_URL}/api/productos/all`);
        const data = await response.json();
        console.log(data)
        return data;
    },

    // Obtener un producto por ID
    getProducto: async (id) => {
        const response = await fetch(`${BASE_URL}/productos/${id}`);
        const data = await response.json();
        return data;
    },

    // Crear un nuevo producto
    createProducto: async (producto) => {
        const response = await fetch(`${BASE_URL}/api/productos/create`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        });
        const data = await response.json();
        return data;
    },

    // Actualizar un producto por ID
    updateProducto: async (id, producto) => {
        const response = await fetch(`${BASE_URL}/api/productos/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        });
        const data = await response.json();
        return data;
    },

    // Eliminar un producto por ID
    deleteProducto: async (id) => {
        await fetch(`${BASE_URL}/api/productos/${id}`, {
            method: "DELETE"
        });
    }
};