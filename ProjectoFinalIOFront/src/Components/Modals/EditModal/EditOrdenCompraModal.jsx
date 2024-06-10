/* eslint-disable react/prop-types */
import { Modal, Button } from 'react-bootstrap';


const ModalEditVenta = ({ showModal, handleCloseModal, handleEditVenta, editedVenta, handleInputChange, selectedVenta, clientes }) => {


    const handleSaveChanges = () => {
        const updatedValues = {};
        
        // Iterar sobre las claves de editedProduct
        Object.keys(selectedVenta).forEach(key => {
            // Si el valor en editedProduct es diferente al de selectedProduct, usar el valor de editedProduct
            // De lo contrario, usar el valor de selectedProduct
            if (Object.prototype.hasOwnProperty.call(editedVenta, key) && editedVenta[key] !== selectedVenta[key]) {
                updatedValues[key] = editedVenta[key];
            } else {
                updatedValues[key] = selectedVenta[key];
            }
        });

            // Agregar category_id al objeto updatedValues si es diferente en editedProduct
        if (editedVenta.category_id !== selectedVenta.category_id) {
            updatedValues.category_id = editedVenta.category_id;
        }
    

        handleEditVenta(updatedValues);
    };

    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Venta</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="form-group">
                        <label htmlFor="nombreProducto">Estado:</label>
                        <input type="text" className="form-control" id="estadoVenta" name="estadoVenta" value={editedVenta?.estadoVenta || selectedVenta?.estadoVenta} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="descripcionProducto">Total Costo de la venta:</label>
                        <input type="text" className="form-control" id="totalCostoVenta" name="totalCostoVenta" value={editedVenta?.totalCostoVenta || selectedVenta?.totalCostoVenta} onChange={handleInputChange} />
                    </div> 
                    <div className="form-group">
                        <label htmlFor="categoriaProducto">Cliente:</label>
                        <select className="form-control" id="client_id" name="client_id" value={editedVenta?.client_id || selectedVenta?.client_id} onChange={handleInputChange}>
                            {clientes.map(cliente => (
                                <option key={cliente.id} value={cliente.id}>
                                    {cliente.nombreCliente}
                                </option>
                            ))}
                        </select>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>Cerrar</Button>
                <Button variant="primary" onClick={handleSaveChanges}>Guardar Cambios</Button>
            </Modal.Footer>
        </Modal>
    );
};
//
export default ModalEditVenta;