import { useState, useEffect} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { CategoriaService } from '../../../Services/CategoriaService';


// eslint-disable-next-line react/prop-types
const AgregarModalCategory= ({ show, handleClose, addCategory, nextId }) => {
    const [newCategory, setNewCategory] = useState({
        id: nextId,
        nombreCategoria: '', 
        descripcionCategoria:'', 
      
       
    });  

    
    useEffect(() => {
       
        setNewCategory(prevCategory => ({
            ...prevCategory,
            id: nextId,
        }));
    }, [nextId]);  
    
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCategory({
            ...newCategory,
            [name]: value
        });
   
    };  
    const handleSubmit = async () => {
        try {

            const createCategory = await CategoriaService.createCategoria(newCategory)
            console.log(createCategory)
            if (!createCategory) {
                throw new Error('La categora no pudo ser creado');
            }
            addCategory(createCategory);
            
            handleClose();
        } catch (error) {
            console.error('Error al crear la categorua :', error);
        }
    };
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Categoria</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="nombreCategoria">
                    <Form.Label>Nombre categoria </Form.Label>
                        <Form.Control
                            type="text"
                            name="nombreCategoria"
                            value={newCategory.nombreCategoria}
                            onChange={handleChange}
                        />   
                     
                    <Form.Group controlId="descripcionCategoria">
                        <Form.Label>Descripción categoria</Form.Label>
                        <Form.Control
                            type="text"
                            name="descripcionCategoria"
                            value={newCategory.descripcionCategoria}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Añadir
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AgregarModalCategory; 