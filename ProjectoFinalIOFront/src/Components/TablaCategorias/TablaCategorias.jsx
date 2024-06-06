import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { CategoriaService } from "../../Services/CategoriaService";
import DeleteButton from "../DeleteButton/DeleteButton";
import EditButton from "../EditButton/EditButton";
import DemandaButton from "../DemandaButton/DemandaButton";
import ModalDeleteProduct from "../Modals/DeleteModal/DeleteModal.jsx";
const CategoriasTable = () => {

    const [categorias, setCategorias] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState(null);

    useEffect(() => {
        const fetchCategorias = async () => {
            const categorias = await CategoriaService.getCategorias();
            setCategorias(categorias);
            console.log(categorias);
        };
        fetchCategorias();
    }, []);
    
    const handleShowModal = (categoria) => {
        setSelectedCategories(categoria);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedCategories(null);
        setShowModal(false);
    };

    const handleDeleteCategories = async () => {
        try {
            await CategoriaService.deleteCategories(selectedCategories.id);
            setCategorias(categorias.filter(c => c.id !== selectedCategories.id));
            handleCloseModal();
        } catch (error) {
            console.error('Error al eliminar la categoria:', error);
        }
    };
    return (
        <>
                <Button variant="dark" style={{float: 'right', margin: "1rem"}}>Añadir Categoria</Button>   
                <Table hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre de la Categoria</th>
                            <th>descripcion de la Categoria</th>
                            <th>Demanda</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categorias.map(categoria => (
                            <tr key={categoria.id}>
                                <td>{categoria.id}</td>
                                <td>{categoria.nombreCategoria}</td>
                                <td>{categoria.descripcionCategoria}</td>
                                <td><DemandaButton/></td>
                                <td><EditButton/></td>
                                <td><DeleteButton onClick={() => handleShowModal(categoria)}/></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <ModalDeleteProduct
                show={showModal}
                handleClose={handleCloseModal}
                handleDelete={handleDeleteCategories}
                />
        </>
    );

};

export default CategoriasTable;