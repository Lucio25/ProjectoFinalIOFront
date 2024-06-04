import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { ProductoService } from "../../Services/ProductService";
import DeleteButton from "../DeleteButton/DeleteButton";
import EditButton from "../EditButton/EditButton";
import DemandaButton from "../DemandaButton/DemandaButton";
import ModalDeleteProduct from "../Modals/DeleteModal/DeleteModal";
import AgregarModal from "../Modals/AgregarModal/AgregarModal";
import ModalEditProduct from "../Modals/EditModal/EditModal";
import { CategoriaService } from "../../Services/CategoriaService";

const ProductosTable = () => {
    
    const [productos, setProductos] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [maxId, setMaxId] = useState(0);
    const [editedProduct, setEditedProduct] = useState(null);
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const fetchCategorias = async () => {
            const categorias = await CategoriaService.getCategorias();
            setCategorias(categorias);
            console.log(categorias);
        };
        fetchCategorias();
    }, []);
    useEffect(() => {
        const fetchProductos = async () => {
            const productos = await ProductoService.getProductos();
            setProductos(productos);
            console.log(productos)
            const maxId = productos.reduce((max, producto) => (producto.id > max ? producto.id : max), 0);
            setMaxId(maxId);
        };
        fetchProductos();
    }, []);

    //boton borrar
    const handleShowDeleteModal = (producto) => {
        setSelectedProduct(producto);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setSelectedProduct(null);
        setEditedProduct(null)
        setShowDeleteModal(false);
    };

    
    const handleDeleteProduct = async () => {
        try {
            await ProductoService.deleteProducto(selectedProduct.id);
            setProductos(productos.filter(p => p.id !== selectedProduct.id));
            handleCloseDeleteModal();
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
        }
    };
    const handleAddProduct = (product) => {
       
        const productoAgregado = {
            ...product,
            category: categorias.find(categoria => categoria.id === product.category_id),
        };
        setProductos([...productos, productoAgregado]);
    };

    //boton editar
    const handleEditProduct = async (updateValues) => {
        try {
            await ProductoService.updateProducto(selectedProduct.id, updateValues);
            
            setProductos(productos.map(p => (p.id === selectedProduct.id ? updateValues : p)));
            handleCloseEditModal();
        } catch (error) {
            console.error('Error al editar el producto:', error);
        }
    };

    const handleShowEditModal = (producto) => {
        setSelectedProduct(producto);
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setSelectedProduct(null);
        setEditedProduct(null)
        setShowEditModal(false);
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
    let parsedValue;
    
    // Verificar si el campo es el precioProveedorProducto o el precioVentaProducto
    if (name === "precioProveedorProducto" || name === "precioVentaProducto") {
        // Convertir el valor a tipo double
        parsedValue = parseFloat(value);
        // Verificar si el valor es un número válido
        if (isNaN(parsedValue)) {
            // Si no es un número válido, establecer el valor como null
            setEditedProduct(prevState => ({
                ...prevState,
                [name]: null
            }));
        } else {
            // Si es un número válido, establecer el valor convertido a tipo double
            setEditedProduct(prevState => ({
                ...prevState,
                [name]: parsedValue
            }));
        }
    } else {
        
        // Si no es el campo de precio, establecer el valor directamente
        setEditedProduct(prevState => ({
            ...prevState,
            [name]: value
            
        }));
    }
    };

    

    return (
        <>
            <Button variant="dark" style={{float: 'right', margin: "1rem"}} onClick={() => setShowAddModal(true)} >Añadir Producto</Button>
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
                                <td>{producto.category?.nombreCategoria || "Sin categoría"}</td>
                                <td ><DemandaButton/></td>
                                <td><EditButton onClick={() => handleShowEditModal(producto)}/></td>
                                <td><DeleteButton onClick={() => handleShowDeleteModal(producto)}/></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <ModalDeleteProduct
                show={showDeleteModal}
                handleClose={handleCloseDeleteModal}
                handleDelete={handleDeleteProduct}
                />
                <AgregarModal
                show={showAddModal}
                handleClose={() => setShowAddModal(false)}  // Cerrar el modal de añadir producto
                addProduct={handleAddProduct}
                nextId={maxId + 1}
                />
                <ModalEditProduct
                showModal={showEditModal}
                handleCloseModal={handleCloseEditModal}
                handleEditProduct={handleEditProduct}
                editedProduct={editedProduct}
                handleInputChange={handleInputChange}
                selectedProduct={selectedProduct}
            />
        </>
    );
};

export default ProductosTable;