/* eslint-disable react/prop-types */
import { Modal, Button } from 'react-bootstrap';


const ModalEditProvider = ({ showModal, handleCloseModal, handleEditProvider, editedProvider, handleInputChange, selectedProvider }) => {


    const handleSaveChanges = () => {
        const updatedValues = {};
        
        // Iterar sobre las claves de editedProduct
        Object.keys(editedProvider).forEach(key => {
            updatedValues[key] = editedProvider[key] == selectedProvider[key] ? selectedProvider[key] : editedProvider[key];
        });

        handleEditProvider(updatedValues);
    };

    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Proveedor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="form-group">
                        <label htmlFor="nombreProveedor">Nombre:</label>
                        <input type="text" className="form-control" id="nombreProveedor" name="nombreProveedor" value={editedProvider?.nombreProveedor || selectedProvider?.nombreProveedor} onChange={handleInputChange} />
                    </div>
                    {/* Agrega aquí los otros campos de edición */}
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>Cerrar</Button>
                <Button variant="primary" onClick={handleSaveChanges}>Guardar Cambios</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalEditProvider;