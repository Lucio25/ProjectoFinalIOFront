const BASE_URL = 'http://localhost:3000';

export const DemandaService = {

    // Obtener todos los demandas
    getDemandas: async () => {
        const response = await fetch(`${BASE_URL}/demands/`);
        const data = await response.json();
        console.log(data)
        return data;
    },

    // Obtener un demanda por ID
    getDemanda: async (id) => {
        const response = await fetch(`${BASE_URL}/demands/${id}`);
        const data = await response.json();
        return data;
    },

    // Crear un nuevo demanda
    createDemanda: async (demanda) => {
        const response = await fetch(`${BASE_URL}/demands/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(demanda)
        });
        const data = await response.json();
        return data;
    },

    // Actualizar un demanda por ID
    updateDemanda: async (id, demanda) => {
        const response = await fetch(`${BASE_URL}/demands/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(demanda)
        });
        const data = await response.json();
        return data;
    },

    // Eliminar un demanda por ID
    deleteDemanda: async (id) => {
        await fetch(`${BASE_URL}/demands/${id}`, {
            method: "DELETE"
        });
    },
    calcularDemandaPromedio: async(product_id,n) => {
        const response = await fetch(`${BASE_URL}/demands/calcular_demanda_promedio`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({product_id,n})
        });
        const data = await response.json();
        return data;
    },
    calcularDemandaPromedioPonderado: async(product_id, n, weights) => {
        const response = await fetch(`${BASE_URL}/demands/calcular_demanda_promedio_ponderada`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({product_id,n,weights})
        });
        const data = await response.json();
        return data;
    }
};