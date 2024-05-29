import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { ProductoService } from "../../Services/ProductService";

const ProductosTable = () => {
    const [productos, setProductos] = useState([]);
    useEffect(() => {
        const fetchProductos = async () => {
            const productos = await ProductoService.getProductos();
            setProductos(productos);
            console.log(productos);
        };
        fetchProductos();
    }, []);

    return (
        <>
                <Table hover>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>denominacion</th>
                            <th>descripcion</th>
                            <th>tiempoEstimadoCocina</th>
                            <th>precioVenta</th>
                            <th>costo</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {productos.map(producto => (
                            <tr key={producto.id}>
                                <td>{producto.id}</td>
                                <td>{producto.nombre}</td>
                                <td>{producto.descripcion}</td>
                                <td>{producto.tiempoEstimadoCocina}</td>
                                <td>{producto.precioVenta}</td>
                                <td>{producto.costo}</td>
                            </tr>
                        ))} */}
                        {
                            productos.map(producto => (
                                <tr key={producto.id}>
                            ))
                        }
                    </tbody>
                </Table>
        </>
    );
};

export default ProductosTable;