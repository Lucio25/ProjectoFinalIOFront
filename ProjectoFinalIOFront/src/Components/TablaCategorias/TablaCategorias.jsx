import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { CategoriaService } from "../../Services/CategoriaService";

const CategoriasTable = () => {

    const [categorias, setCategorias] = useState([]);
    useEffect(() => {
        const fetchCategorias = async () => {
            const categorias = await CategoriaService.getCategorias();
            setCategorias(categorias);
            console.log(categorias);
        };
        fetchCategorias();
    }, []);

    return (
        <>
                <Table hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre de la Categoria</th>
                            <th>descripcion de la Categoria</th>
                            <th>Productos Asociados</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categorias.map(categoria => (
                            <tr key={categoria.id}>
                                <td>{categoria.id}</td>
                                <td>{categoria.nombreCategoria}</td>
                                <td>{categoria.descripcionCategoria}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
        </>
    );

};

export default CategoriasTable;