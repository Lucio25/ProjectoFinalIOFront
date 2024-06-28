import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Table, Button } from "react-bootstrap";
import {OrdenCompraService }from  "../../Services/OrdenCompraService";
import {ProviderService }from  "../../Services/ProviderService.js";
import { format } from 'date-fns';
import EditButton from "../EditButton/EditButton";
import DeleteButton from "../DeleteButton/DeleteButton";
import DemandaButton from "../DemandaButton/DemandaButton";
import ModalDeleteProduct from "../Modals/DeleteModal/DeleteModal.jsx";
import AgregarOrdenModal from "../Modals/AgregarModal/AgregarOrdenModal.jsx";
import CambioEstadoButton from "../CambioEstadoButton/CambioEstadoButton.jsx";

const estadosOrdenCompra = {
    0: 'pedido',
    1: 'preparando',
    2: 'en_camino',
    3: 'entregado'
};

const getEstadoNombre = (numero) => estadosOrdenCompra[numero] || 'Estado desconocido';

const getEstadoNumero = (nombre) => {
    return Object.keys(estadosOrdenCompra).find(key => estadosOrdenCompra[key] === nombre);
};

const OrdenDeCompraTable = () => {

    const navigate = useNavigate();

    const [orCompra, setOrCompra] = useState([]);
    const [proveedores, setProveedores] = useState([]);

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [maxId, setMaxId] = useState(0);
    const [editedOrder, setEditedOrder] = useState(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

  

    useEffect(() => {
        const fetchOrdenCompra = async () => {
            const ordenCompra = await OrdenCompraService.getOrdenCompras();
            setOrCompra(ordenCompra);
            console.log(ordenCompra);
            const maxId = orCompra.reduce((max, orden) => (orden.id > max ? orden.id : max), 0);
            setMaxId(maxId);
        };
        fetchOrdenCompra();
    }, []);
    useEffect(() => {
        const fetchProveedores = async () => {
            const proveedores = await ProviderService.getProviders();
            setProveedores(proveedores);
            console.log(proveedores);
        };
        fetchProveedores();
    }, []);


    const fechasFormateadas = orCompra.map(item => {
        const fechaFormateada = format(new Date(item.fechaEstimadaEntrega), 'dd/MM/yyyy HH:mm:ss');
        return { ...item, fechaFormateada };
      });

      const handleDetalleOrdenCompraClick = (oc) => {

        navigate(`/detalleorden/${oc.id}`);
        console.log(oc.id, "id pa")
        
      };
     
    const handleShowDeleteModal = (orden) => {
        setSelectedOrder(orden);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setSelectedOrder(null);
        setShowDeleteModal(false);
    };

    const handleDeleteOrder = async () => {
        try {
            await OrdenCompraService.deleteOrdenCompra(selectedOrder.id);
            setOrCompra(orCompra.filter(o => o.id !== selectedOrder.id));
            handleCloseDeleteModal();
        } catch (error) {
            console.error('Error al eliminar la orden:', error);
        }
    };

    const handleAddOrder = (orden) => {
        setOrCompra((prevOrders) => [...prevOrders, orden]);
    };
    const handleChangeState = async (oc) => {
        const currentNumero = getEstadoNumero(oc.estadoOrdenCompra);
        if (currentNumero < 3) {
            const updatedNumero = parseInt(currentNumero) + 1;
            const updatedEstado = getEstadoNombre(updatedNumero);
            try {
                await OrdenCompraService.updateOrdenCompra(oc.id, { estadoOrdenCompra: updatedNumero });
                setOrCompra(orCompra.map(order => order.id === oc.id ? { ...order, estadoOrdenCompra: updatedEstado } : order));
            } catch (error) {
                console.error('Error al actualizar el estado de la orden:', error);
            }
        }
    }
    return (
        <>
                <Button variant="dark" style={{float: 'right', margin: "1rem"}} onClick={() => setShowAddModal(true)}>Añadir Orden de Compra</Button>
                <Table hover>
                    <thead>
                        <tr>
                            <th>ID</th>                            
                            <th>Costo total de la Orden</th>
                            <th>Estado de la Orden</th>
                            <th>Fecha estimada de entrega</th>
                            <th>Proveedor</th>
                            <th>Detalle Orden Compra</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fechasFormateadas.map(oc => {
                            // Buscar el cliente correspondiente en el array de clientes
                            const proveedor = proveedores.find(p => p.id === oc.provider_id);
                            const nombreProveedor = proveedor ? proveedor.nombreProveedor : 'Proveedor no encontrado';
                            return(
                            <tr key={oc.id}>
                                <td>{oc.id}</td>
                                <td>{oc.totalCostoOrdenCompra}</td>
                                <td>
                                    {oc.estadoOrdenCompra} 
                                    {oc.estadoOrdenCompra !== "entregado" && (
                                        <CambioEstadoButton onClick={() => handleChangeState(oc)} />
                                    )}
                                </td>
                                <td>{oc.fechaFormateada || "null"}</td>
                                <td>{nombreProveedor }</td>
                                <td><DemandaButton onClick={() => handleDetalleOrdenCompraClick(oc)}/></td>
                                <td><EditButton/></td>
                                <td><DeleteButton onClick={() => handleShowDeleteModal(oc)}/></td>
                            </tr>
                            )
})}
                    </tbody>
                </Table>
                <ModalDeleteProduct
                show={showDeleteModal}
                handleClose={handleCloseDeleteModal}
                handleDelete={handleDeleteOrder}
                msj="esta Orden de compra"
                />
                <AgregarOrdenModal
                show={showAddModal}
                handleClose={() => setShowAddModal(false)}  // Cerrar el modal de añadir producto
                addOrder={handleAddOrder}
                nextId={maxId + 1}
                />
        </>
    );
};

export default OrdenDeCompraTable;