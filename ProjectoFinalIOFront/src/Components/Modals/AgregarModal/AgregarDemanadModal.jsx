/* eslint-disable react/prop-types */
import { useState, useEffect} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { DemandaService } from '../../../Services/DemandaService';



const AgregarDemandaModal = ({ show, handleClose,  nextId, producto, addDemanda }) => {
    const [newDemanda, setNewDemanda] = useState({
        id: nextId,
        demandaReal: '',
        demandaProyectadaPM: '',
        demandaProyectadaPMP: '',
        product_id: ''
    });

    useEffect(() => {
       
        setNewDemanda(prevDemand => ({
            ...prevDemand,
            id: nextId,
            product_id: producto.id
        }));
    }, [nextId, producto]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewDemanda(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    

    const handleSubmit = async () => {
        try {
            const demandaToSubmit = {
                ...newDemanda,
                demandaReal: parseFloat(newDemanda.demandaReal),
                demandaProyectadaPM: parseFloat(newDemanda.demandaProyectadaPM),
                demandaProyectadaPMP: parseFloat(newDemanda.demandaProyectadaPMP),
                product_id: producto.id
            };
            console.log('Demanda a enviar:', demandaToSubmit);
            const createdDemanda = await DemandaService.createDemanda(demandaToSubmit);
            console.log('Demanda creada:', createdDemanda);
            if (!createdDemanda) {
                throw new Error('La demanda no pudo ser creada');
            }
            addDemanda(createdDemanda)
            handleClose();
        } catch (error) {
            console.error('Error al crear la demanda:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Demanda</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="demandaReal">
                        <Form.Label>Demanda Real</Form.Label>
                        <Form.Control
                            type="number"
                            name="demandaReal"
                            value={newDemanda.demandaReal}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="demandaProyectadaPM">
                        <Form.Label>Demanda Proyectada con Promedio Movil</Form.Label>
                        <Form.Control
                            type="number"
                            name="demandaProyectadaPM"
                            value={newDemanda.demandaProyectadaPM}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="demandaProyectadaPMP">
                        <Form.Label>Demanda Proyectada con Promedio Movil Ponderado</Form.Label>
                        <Form.Control
                            type="number"
                            name="demandaProyectadaPMP"
                            value={newDemanda.demandaProyectadaPMP}
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

export default AgregarDemandaModal;