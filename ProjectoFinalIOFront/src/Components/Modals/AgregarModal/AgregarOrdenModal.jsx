/* eslint-disable react/prop-types */
import { useState, useEffect} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';


import { OrdenCompraService } from '../../../Services/OrdenCompraService.js';
import { ProviderService } from '../../../Services/ProviderService';
import { ProductoService } from '../../../Services/ProductService'; 
import { DetalleOrdenComrpaService } from '../../../Services/DetalleOrdenCompraService.js';


const AgregarOrdenModal = ({ show, handleClose, addOrder, nextId }) => {
    const [newOrder, setNewOrder] = useState({
        id: nextId,
        estadoOrdenCompra: '',
        totalCostoOrdenCompra: '',
        fechaEstimadaEntrega: '',
        provider_id: ''
    });

    const [proveedores, setProveedores] = useState([]);
    const [productos, setProductos] = useState([]);
    const [productosSeleccionados, setProductosSeleccionados] = useState([]);
    const [cantidadProductos, setCantidadProductos] = useState({});

    useEffect(() => {
        const fetchProveedores = async () => {
            try {
                const clientesData = await ProviderService.getProviders();
                setProveedores(clientesData);
            } catch (error) {
                console.error('Error fetching providers:', error);
            }
        };
        const fetchProductos = async () => {
            try {
                const productosData = await ProductoService.getProductos();
                setProductos(productosData);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProductos();
        fetchProveedores();
    }, []);

//esto estaria demas?
    useEffect(() => {
       
        setNewOrder(prevOrder => ({
            ...prevOrder,
            id: nextId,
        }));
    }, [nextId]);

    const handleChange = (e) => {
        const { name, value, options } = e.target;
        if (name === 'productos') {
            const selectedOptions = Array.from(options)
                .filter(option => option.selected)
                .map(option => option.value);
            console.log('Productos seleccionados:', selectedOptions);
            setProductosSeleccionados(prevSelected => {
                // Creamos un nuevo conjunto que incluye los productos seleccionados
                const newSelectedArray = [...prevSelected, ...selectedOptions.filter(option => !prevSelected.includes(option))];
                // Convertimos el conjunto de nuevo a un arreglo
                return newSelectedArray;
            });
        }  else if (name.startsWith('cantidad')) {
            const productoId = name.split('-')[1];
            const cantidad = parseInt(value);
            setCantidadProductos(prevState => ({
                ...prevState,
                [productoId]: cantidad
            }));
        }else {
            setNewOrder({
                ...newOrder,
                [name]: value
            });
        }
   
    };

    const handleSubmit = async () => {
        try {
            console.log('Provider ID before submission:', newOrder.provider_id);
            const provedor = proveedores.find(p => p.id.toString() ===  newOrder.provider_id.toString());
            // Obtener solo el ID de la categoría
            const provID = provedor ? provedor.id : null;
            // Construir el objeto productToSubmit con solo el ID de la categoría
            const orderToSubmit = {
                ...newOrder,
                totalCostoOrdenCompra: parseFloat(newOrder.totalCostoOrdenCompra),
                // Asignar solo el ID de la categoría
                provider_id: provID
            };
            console.log('Orden a enviar:', orderToSubmit);
            const createdOrder = await OrdenCompraService.createOrdenCompra(orderToSubmit);
            console.log('Venta creada:', createdOrder);
            if (!createdOrder) {
                throw new Error('La venta no pudo ser creada');
            }
            for (const productoId of productosSeleccionados) {
                const cantidad = cantidadProductos[productoId];
                const producto = productos.find(producto => producto.id === parseInt(productoId));
                const costoSubtotal = producto.precioVentaProducto;
                const costoTotal = costoSubtotal * cantidad;
                const detalleOrden = {
                    purchase_order_id: createdOrder.id,
                    product_id: parseInt(productoId),
                    cantOrdenCompraProducto: cantidad,
                    subTotalCostoOrdenCompraProducto: costoSubtotal,
                    totalCostoOrdenCompraProducto: costoTotal
                };
                await DetalleOrdenComrpaService.createDetalleOrdenCompra(detalleOrden);
            }
            addOrder(createdOrder);
            
            handleClose();
        } catch (error) {
            console.error('Error al crear la orden:', error);
        }
    };

    

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Orden de Compra</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="estadoOrdenCompra">
                        <Form.Label>Estado de la Orden</Form.Label>
                        <Form.Control
                            type="text"
                            name="estadoOrdenCompra"
                            value={newOrder.estadoOrdenCompra}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="totalCostoOrdenCompra">
                        <Form.Label>Total del costo de la Orden</Form.Label>
                        <Form.Control
                            type="number"
                            name="totalCostoOrdenCompra"
                            value={newOrder.totalCostoOrdenCompra}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="fechaEstimadaEntrega">
                        <Form.Label>Fecha Estimada de Entrega</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            name="fechaEstimadaEntrega"
                            value={newOrder.fechaEstimadaEntrega}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="provider_id">
                        <Form.Label></Form.Label>
                        <Form.Control
                            as="select"
                            name="provider_id"
                            value={newOrder.provider_id}
                            onChange={handleChange}
                        >
                            <option value="">Seleccione un Proveedor</option>
                            {proveedores.map(p => (
                                <option key={p.id} value={p.id}>
                                    {p.nombreProveedor}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="productos">
                        <Form.Label>Productos</Form.Label>
                        <Form.Control
                            as="select"
                            name="productos"
                            multiple
                            value={productosSeleccionados}
                            onChange={handleChange}
                        >
                            {productos.map(producto => (
                                <option 
                                    key={producto.id} 
                                    value={producto.id}
                                    style={{
                                        cursor: 'pointer',
                                        backgroundColor: productosSeleccionados.includes(producto.id) ? '#d4edda' : '',
                                        color: productosSeleccionados.includes(producto.id.toString()) ? '#155724' : '',
                                    }}
                                >
                                    {producto.nombreProducto}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    {productosSeleccionados.map(productoId => (
                        <Form.Group key={productoId} controlId={`cantidad-${productoId}`}>
                            <Form.Label>Cantidad de {productos.find(producto => producto.id === parseInt(productoId)).nombreProducto}</Form.Label>
                            <Form.Control
                                type="number"
                                name={`cantidad-${productoId}`}
                                value={cantidadProductos[productoId] || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    ))}
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

export default AgregarOrdenModal;