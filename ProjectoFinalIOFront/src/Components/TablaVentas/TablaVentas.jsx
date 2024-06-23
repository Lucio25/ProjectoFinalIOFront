import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import { Button, Table } from "react-bootstrap";
import { VentasService } from "../../Services/VentasService";
import DetalleVentaButton from "../DetalleVentaButton/DetalleVentaButton";
import DeleteButton from "../DeleteButton/DeleteButton";
import EditButton from "../EditButton/EditButton";
import {ClienteService} from "../../Services/ClienteService.js"
import ModalDeleteProduct from "../Modals/DeleteModal/DeleteModal.jsx";
import AgregarVentaModal from "../Modals/AgregarModal/AgregarVentaModal.jsx";
import ModalEditVenta from "../Modals/EditModal/EditVentaModal.jsx";

const VentasTable = () => {
    
    const navigate = useNavigate();
    
    const [ventas, setVentas] = useState([]);
    const [clientes, setClientes] = useState([]);

    const [showEditVentaModal, setShowEditVentaModal] = useState(false);
    const [showDeleteVentaModal, setShowDeleteVentaModal] = useState(false);
    const [selectedVenta, setSelectedVenta] = useState(null);
    const [showAddVentaModal, setShowAddVentaModal] = useState(false);
    const [maxId, setMaxId] = useState(0);
    const [editedVenta, setEditedVenta] = useState(null);
    
    

    const handleDetalleVentaClick = (v) => {

        navigate(`/detalleventa/${v.id}`);
        console.log(v.id, "id pa")
        
      };

    useEffect(() => {
        const fetchVentas = async () => {
            const VentasArreglo = await VentasService.getVentas();
            setVentas(VentasArreglo);
            console.log(VentasArreglo);
            const maxId = ventas.reduce((max, venta) => (venta.id > max ? venta.id : max), 0);
            setMaxId(maxId);
        };
        fetchVentas();
    }, []);
    useEffect(() => {
        const fetchClientes = async () => {
            const clientes = await ClienteService.getClientes();
            setClientes(clientes);
            console.log(clientes);
        };
        fetchClientes();
    }, []);



    const handleShowDeleteVentaModal = (venta) => {
        setSelectedVenta(venta);
        setShowDeleteVentaModal(true);
    };

    const handleCloseDeleteVentaModal = () => {
        setSelectedVenta(null);
        setEditedVenta(null)
        setShowDeleteVentaModal(false);
    };

    
    const handleDeleteVenta = async () => {
        try {
            await VentasService.deleteVenta(selectedVenta.id);
            setVentas(ventas.filter(v => v.id !== selectedVenta.id));
            handleCloseDeleteVentaModal();
        } catch (error) {
            console.error('Error al eliminar la venta:', error);
        }
    };


    const handleAddVenta = (venta) => {
        setVentas((prevVentas) => [...prevVentas, venta]);
    };

    const handleEditVenta = async (updateValues) => {
        try {
            await VentasService.updateVenta(selectedVenta.id, updateValues);
            
            setVentas(ventas.map(v => (v.id === selectedVenta.id ? updateValues : v)));
            handleCloseEditModal();
        } catch (error) {
            console.error('Error al editar el producto:', error);
        }
    };

    const handleShowEditModal = (venta) => {
        setSelectedVenta(venta);
        setEditedVenta(venta);
        setShowEditVentaModal(true);
    };

    const handleCloseEditModal = () => {
        setSelectedVenta(null);
        setEditedVenta(null)
        setShowEditVentaModal(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
    let parsedValue;
    // Verificar si el campo es el totalcostoventa
    if (name === "totalCostoVenta" ) {
        // Convertir el valor a tipo double
        parsedValue = parseFloat(value);
        // Verificar si el valor es un número válido
        if (isNaN(parsedValue)) {
            // Si no es un número válido, establecer el valor como null
            setEditedVenta(prevState => ({
                ...prevState,
                [name]: null
            }));
        } else {
            // Si es un número válido, establecer el valor convertido a tipo double
            setEditedVenta(prevState => ({
                ...prevState,
                [name]: parsedValue
            }));
        }
    } else if (name.includes("id")) {
        // Convertir el valor a tipo entero
        parsedValue = parseInt(value, 10);
        setEditedVenta(prevState => ({
            ...prevState,
            [name]: isNaN(parsedValue) ? null : parsedValue
        }));
    } else {
        // Si no es el campo de precio, establecer el valor directamente
        setEditedVenta(prevState => ({
            ...prevState,
            [name]: value
            
        }));
    }
    };


    return (
        <>
                <Button variant="dark" style={{float: 'right', margin: "1rem"}} onClick={() => setShowAddVentaModal(true)}>Añadir Venta</Button>
                <Table hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Estado de la Venta</th>
                            <th>Total Costo de la Venta</th>
                            <th>Cliente</th>
                            <th>Detalle Venta</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                    {ventas.map(v => {
                        // Buscar el cliente correspondiente en el array de clientes
                        const cliente = clientes.find(cliente => cliente.id === v.client_id);
                        const nombreCliente = cliente ? cliente.nombreCliente : 'Cliente no encontrado';

                        return (
                            <tr key={v.id}>
                                <td>{v.id}</td>
                                <td>{v.estadoVenta}</td>
                                <td>{v.totalCostoVenta}</td>
                                <td>{nombreCliente}</td>
                                <td><DetalleVentaButton onClick={() => handleDetalleVentaClick(v)} /></td>
                                <td><EditButton onClick={() => handleShowEditModal(v)} /></td>
                                <td><DeleteButton onClick={() => handleShowDeleteVentaModal(v)} /></td>
                            </tr>
                        );
                    })}
                    </tbody>
                </Table>
                <ModalDeleteProduct
                show={showDeleteVentaModal}
                handleClose={handleShowDeleteVentaModal}
                handleDelete={handleDeleteVenta}
                msj="esta venta"
                />
                <AgregarVentaModal
                show={showAddVentaModal}
                handleClose={() => setShowAddVentaModal(false)}  // Cerrar el modal de añadir producto
                addVenta={handleAddVenta}
                nextId={maxId + 1}
                />
                <ModalEditVenta
                showModal={showEditVentaModal}
                handleCloseModal={handleCloseEditModal}
                handleEditVenta={handleEditVenta}
                editedVenta={editedVenta}
                handleInputChange={handleInputChange}
                selectedVenta={selectedVenta}
                clientes={clientes}
                />
        </>
    );
};

export default VentasTable;