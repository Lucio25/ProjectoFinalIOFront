const BASE_URL = 'http://localhost:3000';

export const CategoriaService = {

    // Obtener todos los Categorias
    getCategorias: async () => {
        const response = await fetch(`${BASE_URL}/categories/`);
        const data = await response.json();
        console.log(data)
        return data;
    },

    // Obtener un Categoria por ID
    getCategoria: async (id) => {
        const response = await fetch(`${BASE_URL}/categories/${id}`);
        const data = await response.json();
        return data;
    },

    // Crear un nuevo Categoria
    createCategoria: async (categoria) => {
        const response = await fetch(`${BASE_URL}/categories/`, {
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
        const response = await fetch(`${BASE_URL}/categories/${id}`, {
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
        await fetch(`${BASE_URL}/categories/${id}`, {
            method: "DELETE"
        });
    }
};