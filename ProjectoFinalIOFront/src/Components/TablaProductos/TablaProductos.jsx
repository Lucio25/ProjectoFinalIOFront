import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { ProductoService } from "../../Services/ProductService";
import DeleteButton from "../DeleteButton/DeleteButton";
import EditButton from "../EditButton/EditButton";
import DemandaButton from "../DemandaButton/DemandaButton";
import ModalDeleteProduct from "../DeleteModal/DeleteModal";

const ProductosTable = () => {
    
    const [productos, setProductos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const fetchProductos = async () => {
            const productos = await ProductoService.getProductos();
            setProductos(productos);
            console.log(productos);
        };
        fetchProductos();
    }, []);

    const handleShowModal = (producto) => {
        setSelectedProduct(producto);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
        setShowModal(false);
    };

    const handleDeleteProduct = async () => {
        try {
            await ProductoService.deleteProducto(selectedProduct.id);
            setProductos(productos.filter(p => p.id !== selectedProduct.id));
            handleCloseModal();
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
        }
    };

    return (
        <>
            <Button variant="dark" style={{float: 'right', margin: "1rem"}}>Añadir Producto</Button>
                <Table hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Denominación</th>
                            <th>Descripción</th>
                            <th>Precio del Proveedor del Producto</th>
                            <th>Precio de Venta</th>
                            <th>Categoria</th>
                            <th>Demanda</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
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
                                <td><DemandaButton/></td>
                                <td><EditButton/></td>
                                <td><DeleteButton onClick={() => handleShowModal(producto)}/></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <ModalDeleteProduct
                show={showModal}
                handleClose={handleCloseModal}
                handleDelete={handleDeleteProduct}
                />
        </>
    );
};

export default ProductosTable;