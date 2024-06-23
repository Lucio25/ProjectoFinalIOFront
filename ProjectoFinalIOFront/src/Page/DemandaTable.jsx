
import { Table, Button } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { ProductoService } from "../Services/ProductService";
 import ModalDeleteProduct from "../Components/Modals/DeleteModal/DeleteModal";
import { DemandaService } from "../Services/DemandaService";
import DeleteButton from "../Components/DeleteButton/DeleteButton";
import EditButton from "../Components/EditButton/EditButton";
import DemandaProyectadaModal from "../Components/Modals/DemandaProyectadaModal/DemandaProyectadaModal";
import AgregarDemandaModal from "../Components/Modals/AgregarModal/AgregarDemanadModal";
import ModalEditDemanda from "../Components/Modals/EditModal/EditDemandaModal";



const DemandaTable = () => {
    
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [demandas, setDemandas] = useState([]);
    const [selectedDemanda, setSelectedDemanda] = useState(null);
    const [editedDemanda, setEditedDemanda] = useState(null);  

    const [showDemProyectadaModal, setShowDemProyectadaModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);  

    const [maxId, setMaxId] = useState(0);
    
    useEffect(() => {
        const fetchDemandas = async () => {
            const demandas = await DemandaService.getDemandas();
            setDemandas(demandas)
            const maxId = demandas.reduce((max, demanda) => (demanda.id > max ? demanda.id : max), 0);
            setMaxId(maxId);
        };
        fetchDemandas();
    }, []);

    useEffect(() => {
        const fetchProducto = async () => {
            const prod = await ProductoService.getProducto(id);
            setProducto(prod);
            console.log(prod)
        };

        if (id) {
            fetchProducto();
        }
    }, [id]);

    const handleCloseDeleteModal = () => {
        setSelectedDemanda(null)
        setShowDeleteModal(false)
    };
    const handleShowDeleteModal = (producto) => {
        setSelectedDemanda(producto);
        setShowDeleteModal(true);
    };
    const handleDeleteProduct = async () => {
        try {
            await DemandaService.deleteDemanda(selectedDemanda.id);
            const updateDemandas = demandas.filter(d => d.id !== selectedDemanda.id)
            setDemandas(updateDemandas)
            setProducto(prevProducto => ({
                ...prevProducto,
                demands: updateDemandas
            }))
            handleCloseDeleteModal();
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
        }
    };
    const addDemanda = (newDemanda) => {
        const updateDemandas = [...demandas, newDemanda]
        setDemandas(updateDemandas);
        setMaxId(maxId + 1);
        setProducto(prevProducto => ({
            ...prevProducto,
            demands: updateDemandas
        }))
    };
    
    const handleCloseEditModal = () => {
        setSelectedDemanda(null);
        setEditedDemanda(null)
        setShowEditModal(false); 
    };  
    const handleEditDemanda = async (updateValues) => {
        try {
            await DemandaService.updateDemanda(selectedDemanda.id, updateValues);
            const updatedDemandas = demandas.map(d => (d.id === selectedDemanda.id ? updateValues : d));
            setDemandas(updatedDemandas);
            setProducto(prevProducto => ({
                ...prevProducto,
                demands: updatedDemandas
            }));
            handleCloseEditModal();
        } catch (error) {
            console.error('Error al editar la demanda:', error);
        }
    };  
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setEditedDemanda(prevState => ({
            ...prevState,
            [name]: value
            
        }));
    
    };
    const handleShowEditModal = (demanda) => {
        setSelectedDemanda(demanda);
        setEditedDemanda(demanda)
        setShowEditModal(true);
    };  

    if (!producto) {
        return <div>Loading...</div>;
    }
    return (
        <>

            <Button variant="dark" style={{ float: 'right', margin: "1rem" }} onClick={() => setShowAddModal(true)}>Crear nueva demanda</Button>
            <Button variant="dark" style={{ float: 'right', margin: "1rem" }} onClick={() => setShowDemProyectadaModal(true)}>Calcular nueva demanda proyectada</Button>

            <h1>Demanda de {producto.nombreProducto}</h1>
            <Table hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Demanda Real</th>
                        <th>Demanda Proyectada</th>
                        <th>Editar Demanda</th>
                        <th>Eliminar Demanda</th>

                    </tr>
                </thead>
                <tbody>
                    {producto.demands && producto.demands.map((demand) => (
                        <tr key={demand.id}>
                            <td>{demand.id}</td>
                            <td>{demand.demandaReal}</td>
                            <td>{demand.demandaProyectadaPM || demand.demandaProyectadaPMP}</td>
                            <td><EditButton onClick={() => handleShowEditModal(demand)} /></td>
                            <td><DeleteButton onClick={() => handleShowDeleteModal(demand)} /></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <DemandaProyectadaModal
                showModal={showDemProyectadaModal}
                handleCloseModal={() => setShowDemProyectadaModal(false)}
                producto={producto}
            />
            <AgregarDemandaModal
                show={showAddModal}
                handleClose={() => setShowAddModal(false)}
                nextId = {maxId}
                producto = {producto}
                addDemanda={addDemanda}
            />
            <ModalDeleteProduct
                show={showDeleteModal}
                handleClose={handleCloseDeleteModal}
                handleDelete={handleDeleteProduct}
                msj="esta demanda"
            />
            <ModalEditDemanda
                showModal={showEditModal}
                handleCloseModal={handleCloseEditModal}
                handleEditDemanda={handleEditDemanda}
                editedDemanda={editedDemanda}
                handleInputChange={handleInputChange}
                selectedDemanda={selectedDemanda}
            />
        </>
    );
};

export default DemandaTable;