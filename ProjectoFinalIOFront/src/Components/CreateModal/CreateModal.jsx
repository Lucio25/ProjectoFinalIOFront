import { Modal, Button, Form } from 'react-bootstrap';

const AddProductModal = ({ show, handleClose, handleAddProduct }) => {
    const [newProduct, setNewProduct] = useState({
        nombreProducto: '',
        descripcionProducto: '',
        precioProveedorProducto: '',
        precioVentaProducto: '',
        categoria: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddProduct(newProduct);
        setNewProduct({
            nombreProducto: '',
            descripcionProducto: '',
            precioProveedorProducto: '',
            precioVentaProducto: '',
            categoria: ''
        });
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="nombreProducto">
                        <Form.Label>Nombre del Producto</Form.Label>
                        <Form.Control
                            type="text"
                            name="nombreProducto"
                            value={newProduct.nombreProducto}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="descripcionProducto">
                        <Form.Label>Descripción del Producto</Form.Label>
                        <Form.Control
                            type="text"
                            name="descripcionProducto"
                            value={newProduct.descripcionProducto}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="precioProveedorProducto">
                        <Form.Label>Precio del Proveedor</Form.Label>
                        <Form.Control
                            type="number"
                            name="precioProveedorProducto"
                            value={newProduct.precioProveedorProducto}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="precioVentaProducto">
                        <Form.Label>Precio de Venta</Form.Label>
                        <Form.Control
                            type="number"
                            name="precioVentaProducto"
                            value={newProduct.precioVentaProducto}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="categoria">
                        <Form.Label>Categoría</Form.Label>
                        <Form.Control
                            type="text"
                            name="categoria"
                            value={newProduct.categoria}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Agregar Producto
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddProductModal;
