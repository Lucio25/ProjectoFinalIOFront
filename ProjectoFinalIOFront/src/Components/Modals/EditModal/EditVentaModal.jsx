/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { DetalleVentaService } from '../../../Services/DetalleVentaService'; 
import { ProductoService } from '../../../Services/ProductService'; 

const ModalEditVenta = ({ showModal, handleCloseModal, handleEditVenta, editedVenta, handleInputChange, selectedVenta, clientes }) => {
    const [productos, setProductos] = useState([]);
    const [productosSeleccionados, setProductosSeleccionados] = useState([]);
    const [cantidadProductos, setCantidadProductos] = useState({});

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const productosData = await ProductoService.getProductos();
                setProductos(productosData);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProductos();

        // Cargar los productos seleccionados y sus cantidades de la venta seleccionada
        if (selectedVenta && selectedVenta.product_sales) {
            const selectedProducts = selectedVenta.product_sales.map(detalle => detalle.product_id.toString());
            const selectedQuantities = {};
            selectedVenta.product_sales.forEach(detalle => {
                selectedQuantities[detalle.product_id] = detalle.cantVentaProducto;
            });
            setProductosSeleccionados(selectedProducts);
            setCantidadProductos(selectedQuantities);
        }
    }, [selectedVenta]);
    const handleProductoChange = (e) => {
        const { options } = e.target;
        const selectedOptions = Array.from(options)
            .filter(option => option.selected)
            .map(option => option.value);

        setProductosSeleccionados(selectedOptions);
    };

    const handleCantidadChange = (e, productoId) => {
        const { value } = e.target;
        setCantidadProductos(prev => ({
            ...prev,
            [productoId]: value
        }));
    };
    const handleSaveChanges = async () => {
        const updatedValues = {};
        
        // Iterar sobre las claves de selectedVenta
        Object.keys(selectedVenta).forEach(key => {
            if (Object.prototype.hasOwnProperty.call(editedVenta, key) && editedVenta[key] !== selectedVenta[key]) {
                updatedValues[key] = editedVenta[key];
            } else {
                updatedValues[key] = selectedVenta[key];
            }
        });

        // Agregar category_id al objeto updatedValues si es diferente en editedVenta
        // if (editedVenta.category_id !== selectedVenta.category_id) {
        //     updatedValues.category_id = editedVenta.category_id;
        // }

        // Actualizar la venta
        await handleEditVenta(updatedValues);

        // Actualizar los detalles de la venta
        const updatedDetalleVenta = productosSeleccionados.map(productoId => ({
            sale_id: selectedVenta.id,
            product_id: parseInt(productoId, 10),
            cantVentaProducto: parseInt(cantidadProductos[productoId], 10),
            subTotalVentaProducto: productos.find(producto => producto.id === parseInt(productoId, 10)).precioVentaProducto,
            totalCostoVentaProducto: productos.find(producto => producto.id === parseInt(productoId, 10)).precioVentaProducto * parseInt(cantidadProductos[productoId], 10)
        }));

        for (const detalle of updatedDetalleVenta) {
            await DetalleVentaService.updateDetalleVenta(detalle);
        }

        handleCloseModal();
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
                    <Form.Group controlId="productos">
                        <Form.Label>Productos:</Form.Label>
                        <Form.Control
                            as="select"
                            name="productos"
                            multiple
                            value={productosSeleccionados}
                            onChange={handleProductoChange}
                        >
                            {productos.map(producto => (
                                <option 
                                    key={producto.id} 
                                    value={producto.id}
                                >
                                    {producto.nombreProducto}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    {productosSeleccionados.map(productoId => (
                        <Form.Group key={productoId} controlId={`cantidad-${productoId}`}>
                            <Form.Label>Cantidad de {productos.find(producto => producto.id === parseInt(productoId)).nombreProducto}</Form.Label>
                            <Form.Control
                                type="number"
                                name={`cantidad-${productoId}`}
                                value={cantidadProductos[productoId] || ''}
                                onChange={(e) => handleCantidadChange(e, productoId)}
                            />
                        </Form.Group>
                    ))}
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