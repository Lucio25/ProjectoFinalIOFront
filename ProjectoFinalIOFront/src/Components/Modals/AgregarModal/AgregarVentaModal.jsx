/* eslint-disable react/prop-types */
import { useState, useEffect} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { ClienteService } from '../../../Services/ClienteService';
import { VentasService } from '../../../Services/VentasService';

const AgregarVentaModal = ({ show, handleClose, addVenta, nextId }) => {
    const [newVenta, setNewVenta] = useState({
        id: nextId,
        estadoVenta: '',
        totalCostoVenta: '',
        client_id: ''
    });

    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const clientesData = await ClienteService.getClientes();
                setClientes(clientesData);
            } catch (error) {
                console.error('Error fetching clients:', error);
            }
        };

        fetchClientes();
    }, []);


    useEffect(() => {
       
        setNewVenta(prevVenta => ({
            ...prevVenta,
            id: nextId,
        }));
    }, [nextId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewVenta({
            ...newVenta,
            [name]: value
        });
   
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