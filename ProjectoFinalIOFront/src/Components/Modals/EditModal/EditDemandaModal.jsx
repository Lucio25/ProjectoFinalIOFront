/* eslint-disable react/prop-types */
import { Modal, Button } from 'react-bootstrap';


const ModalEditDemanda = ({ showModal, handleCloseModal, handleEditDemanda, editedDemanda, handleInputChange, selectedDemanda }) => {


    const handleSaveChanges = () => {
        const updatedValues = {};
        
        // Iterar sobre las claves de editedProduct
        Object.keys(editedDemanda).forEach(key => {
            updatedValues[key] = editedDemanda[key] == selectedDemanda[key] ? selectedDemanda[key] : editedDemanda[key];
        });

        handleEditDemanda(updatedValues);
    };  

    

    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Demanda</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="form-group">
                        <label htmlFor="demandaReal">Demanda Real:</label>
                        <input type="number" className="form-control" id="demandaReal" name="demandaReal" value={editedDemanda?.demandaReal || selectedDemanda?.demandaReal} onChange={handleInputChange} />
                    </div> 
                    <div className="form-group">
                        <label htmlFor="demandaProyectadaPM">Demanda Proyectada con Promedio Movil:</label>
                        <input type="text" className="form-control" id="demandaProyectadaPM" name="demandaProyectadaPM" value={editedDemanda?.demandaProyectadaPM|| selectedDemanda?.demandaProyectadaPM} onChange={handleInputChange} />
                    </div>   
                    <div className="form-group">
                        <label htmlFor="demandaProyectadaPMP">Demanda Proyectada con Promedio Movil Ponderado:</label>
                        <input type="text" className="form-control" id="demandaProyectadaPMP" name="demandaProyectadaPMP" value={editedDemanda?.demandaProyectadaPMP|| selectedDemanda?.demandaProyectadaPMP} onChange={handleInputChange} />
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

export default ModalEditDemanda;