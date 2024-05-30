const BASE_URL = 'http://localhost:9192';

export const CategoriaService = {

    // Obtener todos los Categorias
    getCategorias: async () => {
        const response = await fetch(`${BASE_URL}/api/categoria/all`);
        const data = await response.json();
        console.log(data)
        return data;
    },

    // Obtener un Categoria por ID
    getCategoria: async (id) => {
        const response = await fetch(`${BASE_URL}/categoria/${id}`);
        const data = await response.json();
        return data;
    },

    // Crear un nuevo Categoria
    createCategoria: async (categoria) => {
        const response = await fetch(`${BASE_URL}/api/categoria/create`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(categoria)
        });
        const data = await response.json();
        return data;
    },

    // Actualizar un Categoria por ID
    updateCategoria: async (id, categoria) => {
        const response = await fetch(`${BASE_URL}/api/categoria/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(categoria)
        });
        const data = await response.json();
        return data;
    },

    // Eliminar un Categoria por ID
    deleteCategoria: async (id) => {
        await fetch(`${BASE_URL}/api/categoria/${id}`, {
            method: "DELETE"
        });
    }
};