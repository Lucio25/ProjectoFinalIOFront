import { useEffect, useState } from "react";
import { Table, Button} from "react-bootstrap";
import { ProviderService } from  "../../Services/ProviderService.js" 
import DeleteButton from "../DeleteButton/DeleteButton";
import EditButton from "../EditButton/EditButton";

import ModalDeleteProduct from "../Modals/DeleteModal/DeleteModal.jsx";
import AgregarModalProvider from "../Modals/AgregarModal/AgregarModalProvider.jsx"; 
import ModalEditProvider from "../Modals/EditModal/EditModalProveedor.jsx";

const ProveedorTable = () => {
    
    
    const [proveedores, setProveedores] = useState([]);
  
    const [selectedProvider, setSelectedProvider] = useState(null); 
    const [showAddModal, setShowAddModal] = useState(false);
    const [maxId, setMaxId] = useState(0); 
    const [editedProvider, setEditedProvider] = useState(null);  
    const [showEditModal, setShowEditModal] = useState(false); 
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    
    useEffect(() => {
        const fetchProveedores = async () => {
            const proveedores = await ProviderService.getProviders();
            setProveedores(proveedores);
            console.log(proveedores); 
            const maxId = proveedores.reduce((max, proveedores) => (proveedores.id > max ? proveedores.id : max), 0);
            setMaxId(maxId);
        };
        fetchProveedores();
    }, []);   
    

    const handleAddProvider = (provider) => {
        setProveedores(prevProveedores => [...prevProveedores, provider]);
    };  


    const handleShowDeleteModal = (proveedores) => {
        setSelectedProvider(proveedores);
        setShowDeleteModal(true);
    };

    const handleCloseModal = () => {
        setSelectedProvider(null);
        setShowDeleteModal(false);
        setShowAddModal(false); 
        setEditedProvider(null); 
    };

    const handleDeleteProvider = async () => {
        try {
            await ProviderService.deleteProvider(selectedProvider.id);
            setProveedores(proveedores.filter(c => c.id !== selectedProvider.id));
            handleCloseModal();
        } catch (error) {
            console.error('Error al eliminar el proveedor:', error);
        }
    };  

    
    //boton editar
    const handleEditProvider = async (updateValues) => {
        try {
            await ProviderService.updateProvider(selectedProvider.id, updateValues);
            
            setProveedores(proveedores.map(p => (p.id === selectedProvider.id ? updateValues : p)));
            handleCloseEditModal();
        } catch (error) {
            console.error('Error al editar el proveedor:', error);
        }
    };  

    const handleShowEditModal = (proveedores) => {
        setSelectedProvider(proveedores);
        setEditedProvider(proveedores)
        setShowEditModal(true);
    };  

    const handleCloseEditModal = () => {
        setSelectedProvider(null);
        setEditedProvider(null)
        setShowEditModal(false);
    };  

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setEditedProvider(prevState => ({
            ...prevState,
            [name]: value
            
        }));
    
    };

    return (
        <>
                <Button variant="dark" style={{float: 'right', margin: "1rem"}} onClick={()=>setShowAddModal(true)}>Añadir Proveedor</Button>
                <Table hover>
                    <thead>
                        <tr>
                            <th>ID</th>                            
                            <th>NombreProveedor</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {proveedores.map(p => (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.nombreProveedor}</td>
                                <td><EditButton onClick={()=>handleShowEditModal(p)}/></td>
                                <td><DeleteButton onClick={() => handleShowDeleteModal(p)}/></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <ModalDeleteProduct
                show={showDeleteModal}
                handleClose={handleCloseModal}
                handleDelete={handleDeleteProvider}
                />  
                <AgregarModalProvider
                show={showAddModal}
                handleClose={() => setShowAddModal(false)}  // Cerrar el modal de añadir producto
                addProvider={handleAddProvider}
                nextId={maxId + 1}
                />   

                <ModalEditProvider
                showModal={showEditModal}
                handleCloseModal={handleShowEditModal}
                handleEditProvider={handleEditProvider}
                editedProvider={editedProvider}
                handleInputChange={handleInputChange}
                selectedProvider={selectedProvider}  
                handleClose={handleCloseModal}
                />

        </>
    ); 
  };  
export default ProveedorTable;