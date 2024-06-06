/* eslint-disable react/prop-types */
import { useState, useEffect} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { ProductoService } from '../../../Services/ProductService';
import { CategoriaService } from '../../../Services/CategoriaService';
 
const AgregarModal = ({show, handleClose, addProduct, nextId }) => {
    const [newProduct, setNewProduct] = useState({
        id: nextId,
        nombreProducto: '',
        descripcionProducto: '',
        precioProveedorProducto: '',
        precioVentaProducto: '',
        categoria: '',
        fechaHoraAltaProducto: null,
        fechaHoraBajaProducto: null,
        fechaHoraModificacionProducto: null
    });

    const [categorias, setCategorias] = useState([]);
    const [categoriaSelect, setCategoriaSelect] = useState();

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const categoriasData = await CategoriaService.getCategorias();
                setCategorias(categoriasData);
            } catch (error) {
                console.error('Error fetching categorias:', error);
            }
        };

        fetchCategorias();
    }, []);


    useEffect(() => {
       
        setNewProduct(prevProduct => ({
            ...prevProduct,
            id: nextId,
        }));
    }, [nextId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({
            ...newProduct,
            [name]: value
        });
   
    };

    const handleSubmit = async () => {
        try {
            const categoria = categorias.find(categoria => categoria.nombreCategoria === newProduct.categoria);
            // Obtener solo el ID de la categoría
            const categoriaId = categoria ? categoria.id : null;
            // Construir el objeto productToSubmit con solo el ID de la categoría
            const productToSubmit = {
                ...newProduct,
                precioProveedorProducto: parseFloat(newProduct.precioProveedorProducto),
                precioVentaProducto: parseFloat(newProduct.precioVentaProducto),
                // Asignar solo el ID de la categoría
                category_id: categoriaId
            };
            console.log(productToSubmit)
            const createdProduct = await ProductoService.createProducto(productToSubmit);
            console.log(createdProduct)
            if (!createdProduct) {
                throw new Error('El producto no pudo ser creado');
            }
            addProduct(createdProduct);
            
            handleClose();
        } catch (error) {
            console.error('Error al crear el producto:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="nombreProducto">
                        <Form.Label>Nombre del Producto</Form.Label>
                        <Form.Control
                            type="text"
                            name="nombreProducto"
                            value={newProduct.nombreProducto}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="descripcionProducto">
                        <Form.Label>Descripción del Producto</Form.Label>
                        <Form.Control
                            type="text"
                            name="descripcionProducto"
                            value={newProduct.descripcionProducto}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="precioProveedorProducto">
                        <Form.Label>Precio del Proveedor del Producto</Form.Label>
                        <Form.Control
                            type="number"
                            name="precioProveedorProducto"
                            value={newProduct.precioProveedorProducto}
                            onChange={handleChange}
                            min="0"
                        />
                    </Form.Group>
                    <Form.Group controlId="precioVentaProducto">
                        <Form.Label>Precio de Venta</Form.Label>
                        <Form.Control
                            type="number"
                            name="precioVentaProducto"
                            value={newProduct.precioVentaProducto}
                            onChange={handleChange}
                            min="0"
                        />
                    </Form.Group>
                    <Form.Group controlId="categoria">
                        <Form.Label>Categoria</Form.Label>
                        <Form.Control
                            as="select"
                            name="categoria"
                            value={newProduct.categoria}
                            onChange={handleChange}
                        >
                            <option value="">Seleccione una categoría</option>
                            {categorias.map(categoria => (
                                <option key={categoria.id} value={categoria.nombreCategoria}>
                                    {categoria.nombreCategoria}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Añadir
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AgregarModal;