const BASE_URL = 'http://localhost:3000';

export const ProviderService = {

    // Obtener todos los providers
    getProviders: async () => {
        const response = await fetch(`${BASE_URL}/providers/`);
        const data = await response.json();
        console.log(data)
        return data;
    },

    // Obtener un provider por ID
    getProvider: async (id) => {
        const response = await fetch(`${BASE_URL}/providers/${id}`);
        const data = await response.json();
        return data;
    },

    // Crear un nuevo provider
    createProvider: async (provider) => {
        const response = await fetch(`${BASE_URL}/providers/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(provider)
        });
        const data = await response.json();
        return data;
    },

    // Actualizar un provider por ID
    updateProvider: async (id, provider) => {
        const response = await fetch(`${BASE_URL}/providers/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(provider)
        });
        const data = await response.json();
        return data;
    },

    // Eliminar un provider por ID
    deleteProvider: async (id) => {
        await fetch(`${BASE_URL}/providers/${id}`, {
            method: "DELETE"
        });
    }
};