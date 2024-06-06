/* eslint-disable react/prop-types */
import { Modal, Button } from 'react-bootstrap';


const ModalEditProduct = ({ showModal, handleCloseModal, handleEditProduct, editedProduct, handleInputChange, selectedProduct, categorias }) => {


    const handleSaveChanges = () => {
        const updatedValues = {};
        
        // Iterar sobre las claves de editedProduct
        Object.keys(selectedProduct).forEach(key => {
            // Si el valor en editedProduct es diferente al de selectedProduct, usar el valor de editedProduct
            // De lo contrario, usar el valor de selectedProduct
            if (Object.prototype.hasOwnProperty.call(editedProduct, key) && editedProduct[key] !== selectedProduct[key]) {
                updatedValues[key] = editedProduct[key];
            } else {
                updatedValues[key] = selectedProduct[key];
            }
        });

            // Agregar category_id al objeto updatedValues si es diferente en editedProduct
        if (editedProduct.category_id !== selectedProduct.category_id) {
            updatedValues.category_id = editedProduct.category_id;
        }
    

        handleEditProduct(updatedValues);
    };

    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="form-group">
                        <label htmlFor="nombreProducto">Nombre:</label>
                        <input type="text" className="form-control" id="nombreProducto" name="nombreProducto" value={editedProduct?.nombreProducto || selectedProduct?.nombreProducto} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="descripcionProducto">Descripción:</label>
                        <input type="text" className="form-control" id="descripcionProducto" name="descripcionProducto" value={editedProduct?.descripcionProducto || selectedProduct?.descripcionProducto} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="precioProveedorProducto">Precio del Proveedor:</label>
                        <input type="number" className="form-control" id="precioProveedorProducto" name="precioProveedorProducto" value={editedProduct?.precioProveedorProducto || selectedProduct?.precioProveedorProducto} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="precioVentaProducto">Precio de Venta:</label>
                        <input type="number" className="form-control" id="precioVentaProducto" name="precioVentaProducto" value={editedProduct?.precioVentaProducto || selectedProduct?.precioVentaProducto} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="categoriaProducto">Categoría:</label>
                        <select className="form-control" id="categoriaProducto" name="categoriaProducto" value={editedProduct?.category.nombreCategoria || selectedProduct?.category.nombreCategoria} onChange={handleInputChange}>
                            {categorias.map(categoria => (
                                <option key={categoria.id} value={categoria.nombreCategoria}>
                                    {categoria.nombreCategoria}
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
export default ModalEditProduct;