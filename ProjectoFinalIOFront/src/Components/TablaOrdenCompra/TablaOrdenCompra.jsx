import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import {OrdenCompraService }from  "../../Services/OrdenCompraService" 
import { format } from 'date-fns';
import EditButton from "../EditButton/EditButton";
import DeleteButton from "../DeleteButton/DeleteButton";
import DemandaButton from "../DemandaButton/DemandaButton";
import ModalDeleteProduct from "../DeleteModal/DeleteModal";

const OrdenDeCompraTable = () => {

    const [orCompra, setOrCompra] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const fetchOrdenCompra = async () => {
            const ordenCompra = await OrdenCompraService.getOrdenCompras();
            setOrCompra(ordenCompra);
            console.log(ordenCompra);
        };
        fetchOrdenCompra();
    }, []);
    const fechasFormateadas = orCompra.map(item => {
        const fechaFormateada = format(new Date(item.fechaEstimadaEntrega), 'dd/MM/yyyy HH:mm:ss');
        return { ...item, fechaFormateada };
      });

     
    const handleShowModal = (orden) => {
        setSelectedOrder(orden);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedOrder(null);
        setShowModal(false);
    };

    const handleDeleteOrder = async () => {
        try {
            await OrdenCompraService.deleteOrdenCompra(selectedOrder.id);
            setOrCompra(orCompra.filter(o => o.id !== selectedOrder.id));
            handleCloseModal();
        } catch (error) {
            console.error('Error al eliminar la orden:', error);
        }
    };
    return (
        <>
                <Table hover>
                    <thead>
                        <tr>
                            <th>ID</th>                            
                            <th>Costo total de la Orden</th>
                            <th>Estado de la Orden</th>
                            <th>Fecha estimada de entrega</th>
                            <th>Demanda</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fechasFormateadas.map(oc => (
                            <tr key={oc.id}>
                                <td>{oc.id}</td>
                                <td>{oc.totalCostoOrdenCompra}</td>
                                <td>{oc.estadoOrdenCompra}</td>
                                <td>{oc.fechaFormateada || "null"}</td>
                                <td><DemandaButton/></td>
                                <td><EditButton/></td>
                                <td><DeleteButton onClick={() => handleShowModal(oc)}/></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <ModalDeleteProduct
                show={showModal}
                handleClose={handleCloseModal}
                handleDelete={handleDeleteOrder}
                />
        </>
    );
};

export default OrdenDeCompraTable;