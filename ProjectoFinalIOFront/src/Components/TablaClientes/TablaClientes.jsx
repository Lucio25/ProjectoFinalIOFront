import { useEffect, useState } from "react";
import { Table, Button} from "react-bootstrap";
import {ClienteService }from  "../../Services/ClienteService.js" 
import DeleteButton from "../DeleteButton/DeleteButton";
import EditButton from "../EditButton/EditButton";
import ModalDeleteProduct from "../Modals/DeleteModal/DeleteModal.jsx";
import AgregarModalClient from "../Modals/AgregarModal/AgregarModalClient.jsx";  
import ModalEditClient from "../Modals/EditModal/EditModalClient.jsx";

const ClientesTable = () => {
    
    
    const [clientes, setClientes] = useState([]);
    const [showModal, setShowModal] = useState(false);  
    const [showAddModal, setShowAddModal] = useState(false);  
    const [maxId, setMaxId] = useState(0); 
    const [selectedClient, setSelectedClient] = useState(null); 
    const [showEditModal, setShowEditModal] = useState(false);  
    const [editedClient, setEditedClient] = useState(null);  
    useEffect(() => {
        const fetchClientes = async () => {
            const clientes = await ClienteService.getClientes();
            setClientes(clientes);
            console.log(clientes);
            const maxId = clientes.reduce((max, c) => (c.id > max ? c.id : max), 0);
            setMaxId(maxId);
        };
        fetchClientes();
    }, []);  

    const handleAddClient = (client) => {
        setClientes(prevClientes => [...prevClientes, client]);
    };  


    
    const handleShowModal = (cliente) => {
        setSelectedClient(cliente);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedClient(null);
        setShowModal(false); 
        setEditedClient(false)
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
     //boton editar
     const handleEditClient = async (updateValues) => {
        try {
            await ClienteService.updatecliente(selectedClient.id, updateValues);
            
            setClientes(clientes.map(p => (p.id === selectedClient.id ? updateValues : p)));
            handleCloseEditModal();
        } catch (error) {
            console.error('Error al editar el clientes:', error);
        }
    };  

    const handleShowEditModal = (clientes) => {
        setSelectedClient(clientes);
        setEditedClient(clientes)
        setShowEditModal(true);
    };  

    const handleCloseEditModal = () => {
        setSelectedClient(null);
        setEditedClient(null)
        setShowEditModal(false); 
    };  

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setEditedClient(prevState => ({
            ...prevState,
            [name]: value
            
        }));
    
    };

    return (
        <>
                <Button variant="dark" style={{float: 'right', margin: "1rem"}}onClick={()=>setShowAddModal(true)}>Añadir Cliente</Button>
                <Table hover>
                    <thead>
                        <tr>
                            <th>ID</th>                            
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Mail</th>
                            <th>Telefono</th>
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
                                <td><EditButton onClick={()=>handleShowEditModal(c)}/></td>
                                <td><DeleteButton onClick={() => handleShowModal(c)}/></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <ModalDeleteProduct
                show={showModal}
                handleClose={handleCloseModal}
                handleDelete={handleDeleteClient}
                msj="este cliente"
                /> 
                  <AgregarModalClient
                show={showAddModal}
                handleClose={() => setShowAddModal(false)}  // Cerrar el modal de añadir producto
                addClient={handleAddClient}
                nextId={maxId + 1}
                />    
                <ModalEditClient
                showModal={showEditModal}
                handleCloseModal={handleCloseEditModal}
                handleEditClient={handleEditClient}
                editedClient={editedClient}
                handleInputChange={handleInputChange}
                selectedClient={selectedClient}  
            
                />


        </>
    );
};

export default ClientesTable;