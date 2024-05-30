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
                            <th>ID</th>
                            <th>Denominación</th>
                            <th>Descripción</th>
                            <th>Precio del Proveedor del Producto</th>
                            <th>Precio de Venta</th>
                            <th>Categoria</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map(producto => (
                            <tr key={producto.id}>
                                <td>{producto.id}</td>
                                <td>{producto.nombreProducto}</td>
                                <td>{producto.descripcionProducto}</td>
                                <td>{producto.precioProveedorProducto}</td>
                                <td>{producto.precioVentaProducto}</td>
                                <td>{producto.categoria?.nombreCategoria || "Sin categoría"}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
        </>
    );
};

export default ProductosTable;