import { CategoriaService } from "../../Services/CategoriaService";
import DeleteButton from "../DeleteButton/DeleteButton";
import EditButton from "../EditButton/EditButton";
import DemandaButton from "../DemandaButton/DemandaButton";
import ModalDeleteProduct from "../Modals/DeleteModal/DeleteModal.jsx";
import AgregarModalCategory from "../Modals/AgregarModal/AgregarModalCategory.jsx";
import ModalEditCategory from "../Modals/EditModal/EditModalCategory.jsx";

const CategoriasTable = () => {

    const [categorias, setCategorias] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState(null);  
    const [showAddModal, setShowAddModal] = useState(false);   
    const [maxId, setMaxId] = useState(0);   
    const [editedCategory, setEditedCategory] = useState(null);   
    const [showEditModal, setShowEditModal] = useState(false); 

    useEffect(() => {
        const fetchCategorias = async () => {
	const CategoriasTable = () => {
            console.log(categorias);
        };
        fetchCategorias();
    }, []);  

    const handleAddCategory = (category) => {
        setCategorias(prevCategorias => [...prevCategorias, category]);
    };  
    const handleShowModal = (categoria) => {
        setSelectedCategories(categoria);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedProvider(null);

        setSelectedCategories(null);
        setShowModal(false);
    };

    const handleDeleteCategories = async () => {
        try {
            await CategoriaService.deleteCategoria(selectedCategories.id);
            setCategorias(categorias.filter(c => c.id !== selectedCategories.id));
            handleCloseModal();
        } catch (error) {
            console.error('Error al eliminar la categoria:', error);
        }
    };   

    const handleEditCategory= async (updateValues) => {
        try {
            await CategoriaService.updateCategoria(selectedCategories.id, updateValues);
            setCategorias(categorias.map(p => (p.id === selectedCategories.id ? updateValues : p)));
            handleCloseEditModal();
        } catch (error) {
            console.error('Error al editar categorias', error);
        }
    };    
    const handleShowEditModal = (categorias) => {
        setSelectedCategories(categorias);
        setEditedCategory(categorias)
        setShowEditModal(true);
    };    

    const handleCloseEditModal = () => {
        setSelectedCategories(null);
        setEditedCategory(null)
        setShowEditModal(false); 
    };    

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setEditedCategory(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    return (
        <>
                <Button variant="dark" style={{float: 'right', margin: "1rem"}} onClick={()=>setShowAddModal(true)}>Añadir Categoria</Button>   
                <Table hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre de la Categoria</th>
                            <th>descripcion de la Categoria</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
			</thead>
                    	<tbody>
                                <td>{categoria.id}</td>
                                <td>{categoria.nombreCategoria}</td>
                                <td>{categoria.descripcionCategoria}</td>
                                <td><EditButton onClick={()=> handleShowEditModal(categoria)}/></td>
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

                <AgregarModalCategory
                show={showAddModal}
                handleClose={() => setShowAddModal(false)}  // Cerrar el modal de añadir producto
                addCategory={handleAddCategory}
                nextId={maxId + 1}
                />   

                 <ModalEditCategory
                showModal={showEditModal}
                handleCloseModal={handleCloseEditModal}
                handleEditCategory={handleEditCategory}
                editedCategory={editedCategory}
                handleInputChange={handleInputChange}
                selectedCategories={selectedCategories}  

            
                />
  

        </>
    );
