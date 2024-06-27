const BASE_URL = 'http://localhost:3000';

export const ProductProviderService = {

    // Obtener todos los productProviders
    getproductProviders: async () => {
        const response = await fetch(`${BASE_URL}/product_providers/`);
        const data = await response.json();
        console.log(data)
        return data;
    },

    // Obtener un productProvider por ID
    getproductProvider: async (id) => {
        const response = await fetch(`${BASE_URL}/product_providers/${id}`);
        const data = await response.json();
        return data;
    },

    // Crear un nuevo productProvider
    createproductProvider: async (productProvider) => {
        const response = await fetch(`${BASE_URL}/product_providers/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productProvider)
        });
        const data = await response.json();
        return data;
    },

    // Actualizar un productProvider por ID
    updateproductProvider: async (id, productProvider) => {
        const response = await fetch(`${BASE_URL}/product_providers/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productProvider)
        });
        const data = await response.json();
        return data;
    },

    // Eliminar un productProvider por ID
    deleteproductProvider: async (id) => {
        await fetch(`${BASE_URL}/product_providers/${id}`, {
            method: "DELETE"
        });
    }
};