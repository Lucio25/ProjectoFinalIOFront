/* eslint-disable react/prop-types */
import { Modal, Button } from 'react-bootstrap';


const ModalEditProductProvider = ({ showModal, handleCloseModal, handleEditProductProvider, editedPP, handleInputChange, selectedPP }) => {


    const handleSaveChanges = () => {
        const updatedValues = {};
         
        // Iterar sobre las claves de editedProduct
        Object.keys(editedPP).forEach(key => {
            updatedValues[key] = editedPP[key] == selectedPP[key] ? selectedPP[key] : editedPP[key];
        });

        handleEditProductProvider(updatedValues);
    };

    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Producto del Proveedor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="form-group">
                        <label htmlFor="nombreProducto">Nombre del Producto:</label>
                        <input type="text" className="form-control" id="nombreProducto" name="nombreProducto" value={editedPP?.product.nombreProducto || selectedPP?.product.nombreProducto} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="PrecioProveedorProducto">Precio del Proveedor:</label>
                        <input type="number" className="form-control" id="PrecioProveedorProducto" name="PrecioProveedorProducto" value={editedPP?.PrecioProveedorProducto || selectedPP?.PrecioProveedorProducto} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="costoPedido">Costo de Pedido:</label>
                        <input type="number" className="form-control" id="costoPedido" name="costoPedido" value={editedPP?.costoPedido || selectedPP?.costoPedido} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="TiempoEsperaProducto">Tiempo de espera (dias):</label>
                        <input type="number" className="form-control" id="TiempoEsperaProducto" name="TiempoEsperaProducto" value={editedPP?.TiempoEsperaProducto || selectedPP?.TiempoEsperaProducto} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ZValue">Valor de Z:</label>
                        <input type="number" className="form-control" id="ZValue" name="ZValue" value={editedPP?.ZValue || selectedPP?.ZValue} onChange={handleInputChange} />
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

export default ModalEditProductProvider;