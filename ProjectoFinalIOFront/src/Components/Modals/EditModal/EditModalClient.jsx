/* eslint-disable react/prop-types */
import { Modal, Button } from 'react-bootstrap';


const ModalEditClient = ({ showModal, handleCloseModal, handleEditClient, editedClient, handleInputChange, selectedClient }) => {


    const handleSaveChanges = () => {
        const updatedValues = {};
        
        // Iterar sobre las claves de editedProduct
        Object.keys(editedClient).forEach(key => {
            updatedValues[key] = editedClient[key] == selectedClient[key] ? selectedClient[key] : editedClient[key];
        });

        handleEditClient(updatedValues);
    };  

    

    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Cliente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="form-group">
                        <label htmlFor="nombreCliente">Nombre:</label>
                        <input type="text" className="form-control" id="nombreCliente" name="nombreCliente" value={editedClient?.nombreCliente || selectedClient?.nombreCliente} onChange={handleInputChange} />
                    </div> 
                    <div className="form-group">
                        <label htmlFor="apellidoCliente">Apellido:</label>
                        <input type="text" className="form-control" id="apellidoCliente" name="apellidoCliente" value={editedClient?.apellidoCliente|| selectedClient?.apellidoCliente} onChange={handleInputChange} />
                    </div>   
                    <div className="form-group">
                        <label htmlFor="mailCliente">Mail:</label>
                        <input type="text" className="form-control" id="mailCliente" name="mailCliente" value={editedClient?.mailCliente|| selectedClient?.mailCliente} onChange={handleInputChange} />
                    </div>  
                    <div className="form-group">
                        <label htmlFor="telefonoCliente">Telefono:</label>
                        <input type="text" className="form-control" id="telefonoCliente" name="telefonoCliente" value={editedClient?.telefonoCliente|| selectedClient?.telefonoClienteCliente} onChange={handleInputChange} />
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

export default ModalEditClient;