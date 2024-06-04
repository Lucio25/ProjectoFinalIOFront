/* eslint-disable react/prop-types */
import { Modal, Button } from 'react-bootstrap';

const ModalDeleteProduct = ({ show, handleClose, handleDelete }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmar Eliminación</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                ¿Estás seguro de que deseas eliminar este producto?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Eliminar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalDeleteProduct;