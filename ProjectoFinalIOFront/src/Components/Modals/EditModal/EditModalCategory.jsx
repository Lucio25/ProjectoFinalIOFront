/* eslint-disable react/prop-types */
import { Modal, Button } from 'react-bootstrap';


const ModalEditCategory = ({ showModal, handleCloseModal, handleEditCategory, editedCategory, handleInputChange, selectedCategories }) => {


    const handleSaveChanges = () => {
        const updatedValues = {};
        
        // Iterar sobre las claves de editedProduct
        Object.keys(editedCategory).forEach(key => {
            updatedValues[key] = editedCategory[key] == selectedCategories[key] ? selectedCategories[key] : editedCategory[key];
        });

        handleEditCategory(updatedValues);
    };  

    

    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Cliente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="form-group">
                        <label htmlFor="nombreCategoria">Nombre:</label>
                        <input type="text" className="form-control" id="nombreCategoria" name="nombreCategoria" value={editedCategory?.nombreCategoria || selectedCategories?.nombreCategoria} onChange={handleInputChange} />
                    </div> 
                    <div className="form-group">
                        <label htmlFor="descripcionCategoria">Descripcion:</label>
                        <input type="text" className="form-control" id="descripcionCategoria" name="descripcionCategoria" value={editedCategory?.descripcionCategoria|| selectedCategories?.descripcionCategoria} onChange={handleInputChange} />
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

export default ModalEditCategory;