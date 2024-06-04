import { useEffect, useState } from "react";
import { Table, Button} from "react-bootstrap";
import {ClienteService }from  "../../Services/ClienteService.js" 
import DeleteButton from "../DeleteButton/DeleteButton";
import EditButton from "../EditButton/EditButton";
import DemandaButton from "../DemandaButton/DemandaButton";
import ModalDeleteProduct from "../Modals/DeleteModal/DeleteModal.jsx";

const ClientesTable = () => {
    
    
    const [clientes, setClientes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    useEffect(() => {
        const fetchClientes = async () => {
            const clientes = await ClienteService.getClientes();
            setClientes(clientes);
            console.log(clientes);
        };
        fetchClientes();
    }, []);

    
    const handleShowModal = (cliente) => {
        setSelectedClient(cliente);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedClient(null);
        setShowModal(false);
    };

    const handleDeleteClient = async () => {
        try {
            await ClienteService.deleteCliente(selectedClient.id);
            setClientes(clientes.filter(c => c.id !== selectedClient.id));
            handleCloseModal();
        } catch (error) {
            console.error('Error al eliminar el cliente:', error);
        }
    };

    return (
        <>
                <Button variant="dark" style={{float: 'right', margin: "1rem"}}>Añadir Cliente</Button>
                <Table hover>
                    <thead>
                        <tr>
                            <th>ID</th>                            
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Mail</th>
                            <th>Telefono</th>
                            <th>Demanda</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map(c => (
                            <tr key={c.id}>
                                <td>{c.id}</td>
                                <td>{c.nombreCliente}</td>
                                <td>{c.apellidoCliente}</td>
                                <td>{c.mailCliente}</td>
                                <td>{c.telefonoCliente}</td>
                                <td><DemandaButton/></td>
                                <td><EditButton/></td>
                                <td><DeleteButton onClick={() => handleShowModal(c)}/></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <ModalDeleteProduct
                show={showModal}
                handleClose={handleCloseModal}
                handleDelete={handleDeleteClient}
                />
        </>
    );
};

export default ClientesTable;