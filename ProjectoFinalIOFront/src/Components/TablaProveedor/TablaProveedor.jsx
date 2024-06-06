import { useEffect, useState } from "react";
import { Table, Button} from "react-bootstrap";
import { ProviderService } from  "../../Services/ProviderService.js" 
import DeleteButton from "../DeleteButton/DeleteButton";
import EditButton from "../EditButton/EditButton";
import DemandaButton from "../DemandaButton/DemandaButton";
import ModalDeleteProduct from "../Modals/DeleteModal/DeleteModal.jsx";
import AgregarModalProvider from "../Modals/AgregarModal/AgregarModalProvider.jsx";

const ProveedorTable = () => {
    
    
    const [proveedores, setProveedores] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedProvider, setSelectedProvider] = useState(null); 
    const [showAddModal, setShowAddModal] = useState(false);
    const [maxId, setMaxId] = useState(0);
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


    const handleShowModal = (proveedores) => {
        setSelectedProvider(proveedores);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedProvider(null);
        setShowAddModal(false);
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
                                <td><EditButton/></td>
                                <td><DeleteButton onClick={() => handleShowModal(p)}/></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <ModalDeleteProduct
                show={showModal}
                handleClose={handleCloseModal}
                handleDelete={handleDeleteProvider}
                />  
                <AgregarModalProvider
                show={showAddModal}
                handleClose={() => setShowAddModal(false)}  // Cerrar el modal de añadir producto
                addProvider={handleAddProvider}
                nextId={maxId + 1}
                /> 

        </>
    );
};

export default ProveedorTable;