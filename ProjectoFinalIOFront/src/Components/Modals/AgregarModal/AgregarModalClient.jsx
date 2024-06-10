import { useState, useEffect} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { ClienteService } from '../../../Services/ClienteService';


// eslint-disable-next-line react/prop-types
const AgregarModalClient= ({ show, handleClose, addClient, nextId }) => {
    const [newClient, setNewClient] = useState({
        id: nextId,
        nombreCliente: '', 
        apellidoCliente:'', 
        mailCliente:'', 
        telefonoCliente:'',
       
    });

  
   

    useEffect(() => {
       
        setNewClient(prevClient => ({
            ...prevClient,
            id: nextId,
        }));
    }, [nextId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewClient({
            ...newClient,
            [name]: value
        });
   
    };

    const handleSubmit = async () => {
        try {

            const createClient = await ClienteService.createCliente(newClient)
            console.log(createClient)
            if (!createClient) {
                throw new Error('El cliente no pudo ser creado');
            }
            addClient(createClient);
            
            handleClose();
        } catch (error) {
            console.error('Error al crear el Cliente:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Cliente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="nombreCliente">
                        <Form.Label>Nombre del Cliente</Form.Label>
                        <Form.Control
                            type="text"
                            name="nombreCliente"
                            value={newClient.nombreCliente}
                            onChange={handleChange}
                        />   
                     
                    <Form.Group controlId="apellidoCliente">
                        <Form.Label>Apellido del cliente</Form.Label>
                        <Form.Control
                            type="text"
                            name="apellidoCliente"
                            value={newClient.apellidoCliente}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="mailCliente">
                        <Form.Label>Mail del cliente</Form.Label>
                        <Form.Control
                            type="text"
                            name="mailCliente"
                            value={newClient.mailCliente}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="telefonoCliente">
                        <Form.Label>Telefono del cliente</Form.Label>
                        <Form.Control
                            type="number"
                            name="telefonoCliente"
                            value={newClient.telefonoCliente}
                            onChange={handleChange}
                        />
                    </Form.Group>
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

export default AgregarModalClient;