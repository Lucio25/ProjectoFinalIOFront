/* eslint-disable react/prop-types */
import { useState, useEffect} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { ProductProviderService } from '../../../Services/ProductProviderService';
import { ProductoService } from '../../../Services/ProductService';



const AgregarProveedorProductoModal = ({ show, handleClose,  nextId, proveedor, addPP }) => {
    const [newPP, setNewPP] = useState({
        id: nextId,
        costoPedido: '',
        PrecioProveedorProducto: '',
        TiempoEsperaProducto: '',
        ZValue: '',
        provider_id: '',
        product_id: ''
    });
    const [productos, setProductos] = useState([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState('');

    
    useEffect(() => {
        
        const fetchProductos = async () => {
            try {
                const productosData = await ProductoService.getProductos();
                setProductos(productosData);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProductos();
    }, []);

    useEffect(() => {
        setNewPP(prevPP => ({
            ...prevPP,
            id: nextId,
            provider_id: proveedor.id
        }));
    }, [nextId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'productos') {
            setProductoSeleccionado(value);
        } else{
            setNewPP(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };
    

    const handleSubmit = async () => {
        try {
                
            const productProviderToSubmit = {
                ...newPP,
                costoPedido: parseFloat(newPP.costoPedido),
                PrecioProveedorProducto: parseFloat(newPP.PrecioProveedorProducto),
                TiempoEsperaProducto: parseFloat(newPP.TiempoEsperaProducto),
                ZValue: parseFloat(newPP.ZValue),
                product_id: parseInt(productoSeleccionado),
                provider_id: proveedor.id
            };
            console.log('PP a enviar:', productProviderToSubmit);
            const createdPP = await ProductProviderService.createproductProvider(productProviderToSubmit);
            console.log('Product provider creado:', createdPP);
            if (!createdPP) {
                throw new Error('El Product Provider no pudo ser creado');
            }
            addPP(createdPP)
            handleClose();
            window.location.reload()
        } catch (error) {
            console.error('Error al crear el PP:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Producto al Proveedor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="PrecioProveedorProducto">
                        <Form.Label>Precio del Proveedor</Form.Label>
                        <Form.Control
                            type="number"
                            name="PrecioProveedorProducto"
                            value={newPP.PrecioProveedorProducto}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="TiempoEsperaProducto">
                        <Form.Label>Tiempo de espera (dias)</Form.Label>
                        <Form.Control
                            type="number"
                            name="TiempoEsperaProducto"
                            value={newPP.TiempoEsperaProducto}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="costoPedido">
                        <Form.Label>Costo de Pedido</Form.Label>
                        <Form.Control
                            type="number"
                            name="costoPedido"
                            value={newPP.costoPedido}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="ZValue">
                        <Form.Label>Valor Z</Form.Label>
                        <Form.Control
                            type="number"
                            name="ZValue"
                            value={newPP.ZValue}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="productos">
                        <Form.Label>Producto</Form.Label>
                        <Form.Control
                            as="select"
                            name="productos"
                            value={productoSeleccionado}
                            onChange={handleChange}
                        >
                            <option value="">Selecciona un producto</option>
                            {productos.map(producto => (
                                <option key={producto.id} value={producto.id}>
                                    {producto.nombreProducto}
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

export default AgregarProveedorProductoModal;