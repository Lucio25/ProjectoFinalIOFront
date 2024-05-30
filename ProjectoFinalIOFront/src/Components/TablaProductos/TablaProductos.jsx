import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { ProductoService } from "../../Services/ProductService";

const ProductosTable = () => {
    
    // const initializeNewProduct = ()=> {
    //     return {
    //         id: 0,
    //         denominacion: "",
    //         descripcion: "",
    //         tiempoEstimadoCocina: 0,
    //         precioVenta: 0,
    //         costo: 0,
    //         urlImagen: "",
    //         fechaAlta: new Date(),
    //         fechaModificacion: new Date(),
    //         fechaBaja: new Date()

    //    }
    //}
    
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
                            </tr>
                        ))}
                    </tbody>
                </Table>
        </>
    );
};

export default ProductosTable;