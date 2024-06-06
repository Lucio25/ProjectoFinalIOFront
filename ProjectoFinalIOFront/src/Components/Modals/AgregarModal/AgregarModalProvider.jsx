
/* eslint-disable react/prop-types */
import { useState, useEffect} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { ProviderService } from '../../../Services/ProviderService';


const AgregarModalProvider = ({ show, handleClose, addProvider, nextId }) => {
    const [newProvider, setNewProvider] = useState({
        id: nextId,
        nombreProveedor: '',
       
    });

  
   

    useEffect(() => {
       
        setNewProvider(prevProvider => ({
            ...prevProvider,
            id: nextId,
        }));
    }, [nextId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProvider({
            ...newProvider,
            [name]: value
        });
   
    };

    const handleSubmit = async () => {
        try {

            const createProvider = await ProviderService.createProvider(newProvider)
            console.log(createProvider)
            if (!createProvider) {
                throw new Error('El proveedor no pudo ser creado');
            }
            addProvider(createProvider);
            
            handleClose();
        } catch (error) {
            console.error('Error al crear el proveedor:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Proveedor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="nombreProveedor">
                        <Form.Label>Nombre del Proveedor</Form.Label>
                        <Form.Control
                            type="text"
                            name="nombreProveedor"
                            value={newProvider.nombreProveedor}
                            onChange={handleChange}
                        />
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

export default AgregarModalProvider;