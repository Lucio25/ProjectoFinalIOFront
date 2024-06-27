
import { Table } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { ProviderService } from "../Services/ProviderService";
import EditButton from "../Components/EditButton/EditButton";
import DeleteButton from "../Components/DeleteButton/DeleteButton";
import ModalDeleteProduct from "../Components/Modals/DeleteModal/DeleteModal";
import { ProductProviderService } from "../Services/ProductProviderService";
import ModalEditProductProvider from "../Components/Modals/EditModal/EditProductProvider";



const ProveedorProductoTable = () => {
    
    const { id } = useParams();
    const [proveedor, setProveedor] = useState(null);
    const [productProviders, setProductProviders] = useState(null);
    const [selectedPP, setSelectedPP] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [maxId, setMaxId] = useState(0); 
    const [editedPP, setEditedPP] = useState(null);  
    const [showEditModal, setShowEditModal] = useState(false); 
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        const fetchProveedor = async () => {
            const prov = await ProviderService.getProvider(id);
            setProveedor(prov);
            console.log(prov.product_providers)
        };

        if (id) {
            fetchProveedor();
        }
    }, [id]);

    useEffect(() => {
        const fetchProductProviders = async () => {
            const pp = await ProductProviderService.getproductProviders();
            setProductProviders(pp);
            console.log(pp); 
            const maxId = productProviders.reduce((max, pp) => (pp.id > max ? pp.id : max), 0);
            setMaxId(maxId);
        };
        fetchProductProviders();
    }, []);   

    const handleShowDeleteModal = (pp) => {
        setSelectedPP(pp);
        setShowDeleteModal(true);
    };

    const handleCloseModal = () => {
        setSelectedPP(null);
        setShowDeleteModal(false);
        setShowAddModal(false); 
        setEditedPP(null); 
    };
    const handleDeleteProvider = async () => {
        try {
            await ProductProviderService.deleteproductProvider(selectedPP.id);
            setProductProviders(productProviders.filter(pp => pp.id !== selectedPP.id));
            handleCloseModal();
        } catch (error) {
            console.error('Error al eliminar el producto del proveedor:', error);
        }
    };  

    const handleShowEditModal = (pp) => {
        setSelectedPP(pp);
        setEditedPP(pp)
        setShowEditModal(true);
    };  

    const handleCloseEditModal = () => {
        setSelectedPP(null);
        setEditedPP(null)
        setShowEditModal(false);
    };  
    const handleEditProductProvider = async (updateValues) => {
        try {
            await ProductProviderService.updateproductProvider(selectedPP.id, updateValues);
            const updatedPP = productProviders.map(p => (p.id === selectedPP.id ? updateValues : p));
            setProductProviders(updatedPP);
            setProveedor(prevProveedor => ({
                ...prevProveedor,
                product_providers: updatedPP
            }))
            handleCloseEditModal();
        } catch (error) {
            console.error('Error al editar el producto del proveedor:', error);
        }
    };  
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setEditedPP(prevState => ({
            ...prevState,
            [name]: value
            
        }));
    
    };


    if (!proveedor) {
        return <div>Loading...</div>;
    }
    return (
        <>
        <h1>Productos del proveedor {proveedor.nombreProveedor}</h1>
                <Table hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre Producto</th>
                            <th>Precio del Proveedor</th>
                            <th>Costo de Pedido</th>
                            <th>Tiempo de espera (dias)</th>
                            <th>Valor de Z</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                    {proveedor.product_providers && proveedor.product_providers.map((pp) => (
                    <tr key={pp.id}>
                        <td>{pp.id}</td>
                        <td>{pp.product.nombreProducto}</td>
                        <td>{pp.PrecioProveedorProducto}</td>
                        <td>{pp.costoPedido}</td>
                        <td>{pp.TiempoEsperaProducto}</td>
                        <td>{pp.ZValue}</td>
                        <td><EditButton onClick={()=>handleShowEditModal(pp)}/></td>
                        <td><DeleteButton onClick={() => handleShowDeleteModal(pp)}/></td>
                    </tr>
                     ))} 
                    </tbody>
                </Table>
                <ModalDeleteProduct
                show={showDeleteModal}
                handleClose={handleCloseModal}
                handleDelete={handleDeleteProvider}
                msj="este proveedor"
                />  
                <ModalEditProductProvider
                showModal={showEditModal}
                handleCloseModal={handleShowEditModal}
                handleEditProductProvider={handleEditProductProvider}
                editedPP={editedPP}
                handleInputChange={handleInputChange}
                selectedPP={selectedPP}  
                />
                
        </>
    );
};

export default ProveedorProductoTable;