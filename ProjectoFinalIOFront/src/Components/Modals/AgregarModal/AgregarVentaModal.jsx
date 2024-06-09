/* eslint-disable react/prop-types */
import { useState, useEffect} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { ClienteService } from '../../../Services/ClienteService';
import { VentasService } from '../../../Services/VentasService';
import { ProductoService } from '../../../Services/ProductService'; 
import { DetalleVentaService } from '../../../Services/DetalleVentaService'; 


const AgregarVentaModal = ({ show, handleClose, addVenta, nextId }) => {
    const [newVenta, setNewVenta] = useState({
        id: nextId,
        estadoVenta: '',
        totalCostoVenta: '',
        client_id: ''
    });

    const [clientes, setClientes] = useState([]);
    const [productos, setProductos] = useState([]);
    const [productosSeleccionados, setProductosSeleccionados] = useState([]);
    const [cantidadProductos, setCantidadProductos] = useState({});


    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const clientesData = await ClienteService.getClientes();
                setClientes(clientesData);
            } catch (error) {
                console.error('Error fetching clients:', error);
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

        fetchClientes();
        fetchProductos();
    }, []);


    useEffect(() => {
       
        setNewVenta(prevVenta => ({
            ...prevVenta,
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
            setNewVenta({
                ...newVenta,
                [name]: value
            });
        }
    };
    

    const handleSubmit = async () => {
        try {
            console.log('Client ID before submission:', newVenta.client_id);
            const cliente = clientes.find(cliente => cliente.id.toString() === newVenta.client_id.toString());
            // Obtener solo el ID de la categoría
            const clienteID = cliente ? cliente.id : null;
            // Construir el objeto productToSubmit con solo el ID de la categoría
            const ventaToSubmit = {
                ...newVenta,
                totalCostoVenta: parseFloat(newVenta.totalCostoVenta),
                // Asignar solo el ID de la categoría
                client_id: clienteID
            };
            console.log('Venta a enviar:', ventaToSubmit);
            const createdVenta = await VentasService.createVenta(ventaToSubmit);
            console.log('Venta creada:', createdVenta);
            if (!createdVenta) {
                throw new Error('La venta no pudo ser creada');
            }
            for (const productoId of productosSeleccionados) {
                const cantidad = cantidadProductos[productoId];
                const producto = productos.find(producto => producto.id === parseInt(productoId));
                const costoSubtotal = producto.precioProducto;
                const costoTotal = costoSubtotal * cantidad;
                const detalleVenta = {
                    sale_id: createdVenta.id,
                    product_id: parseInt(productoId),
                    cantVentaProducto: cantidad,
                    subTotalVentaProducto: costoSubtotal,
                    totalCostoVentaProducto: costoTotal
                };
                await DetalleVentaService.createDetalleVenta(detalleVenta);
            }
            addVenta(createdVenta);
            
            handleClose();
        } catch (error) {
            console.error('Error al crear la venta:', error);
        }
    };

    

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Venta</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="estadoVenta">
                        <Form.Label>Estado de la Venta</Form.Label>
                        <Form.Control
                            type="text"
                            name="estadoVenta"
                            value={newVenta.estadoVenta}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="totalCostoVenta">
                        <Form.Label>Total del costo de Venta</Form.Label>
                        <Form.Control
                            type="number"
                            name="totalCostoVenta"
                            value={newVenta.totalCostoVenta}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="client_id">
                        <Form.Label>Cliente</Form.Label>
                        <Form.Control
                            as="select"
                            name="client_id"
                            value={newVenta.client_id}
                            onChange={handleChange}
                        >
                            <option value="">Seleccione un Cliente</option>
                            {clientes.map(cliente => (
                                <option key={cliente.id} value={cliente.id}>
                                    {cliente.nombreCliente}
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

export default AgregarVentaModal;