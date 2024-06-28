/* eslint-disable react/prop-types */
import { Modal, Button } from 'react-bootstrap';
import { useState } from "react";
import PromedioMovil from '../../Promedios Demanda/PromedioMovil';
import PromedioMovilPonderado from '../../Promedios Demanda/PromedioMovilPonderado';
import { DemandaService } from '../../../Services/DemandaService';


const DemandaProyectadaModal = ({ showModal, handleCloseModal, producto }) => {

    
    const [metodoPrediccion, setMetodoPrediccion] = useState('');
    const [formValues, setFormValues] = useState({
        periodos: '',
        periodosPonderados: '',
        ponderaciones: []
    });
    const [resultado, setResultado] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const newValue = value < 1 ? 1 : value;
        setFormValues({
            ...formValues,
            [name]: newValue
        });
        if (metodoPrediccion === 'promedio_movil') {
            calcularPromedio()
        } else if (metodoPrediccion === 'promedio_movil_ponderado') {
            //metodo para pmp
        }
    };
    const handleMetodoChange = (event) => {
        setMetodoPrediccion(event.target.value);
        setResultado('');
    };

    // const handleSaveChanges = async () => {
    //     const idProd = producto.id
    //     //metodo del back al que le envio el id del producto + n
    //     try {
    //         await ProductoService.setPromedio(idProd, periodos)
    //         handleCloseModal();
    //     } catch (error) {
    //         console.log("Error al crear un n")
    //     }
    // };
    const handlePonderacionesChange = (event) => {
        const { name, value } = event.target;
        const index = parseInt(name.replace('ponderacion', ''));
        const newPonderaciones = [...formValues.ponderaciones];
        newPonderaciones[index] = value < 1 ? 1 : value;
        setFormValues({
            ...formValues,
            ponderaciones: newPonderaciones
        });
        //metodo calcular pmp
    };

    const calcularPromedio = async () => {
        const periodos = parseInt(formValues.periodos, 10);
        const response = await DemandaService.calcularDemandaPromedio(producto.id, periodos);
        console.log(response)
        console.log('Producto ID:', producto.id, 'Periodos:', periodos);
        setResultado(response.demandaProyectadaPM); 
    }
    const calcularPromedioPonderado = async () => {
        const periodos = parseInt(formValues.periodosPonderados, 10);
        const ponderaciones = formValues.ponderaciones.map(p => parseFloat(p));

        const response = await DemandaService.calcularDemandaPromedioPonderado(producto.id, periodos, ponderaciones);
        console.log(response)
        console.log('Producto ID:', producto.id, 'Periodos:', periodos, 'Ponderaciones', ponderaciones);
        setResultado(response.demandaProyectadaPMP); 
    }
    const handleCalcularClick = () => {
        if (metodoPrediccion === 'promedioMovil') {
            calcularPromedio();
        } else if (metodoPrediccion === 'promedioMovilPonderado') {
            calcularPromedioPonderado();
        }
    };
    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Calculadora de Demanda</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="form-group">
                        <label htmlFor="metodoPrediccion">Método de Predicción:</label>
                        <select className="form-control" id="metodoPrediccion" name="metodoPrediccion" value={metodoPrediccion} onChange={handleMetodoChange}>
                            <option value="" disabled hidden>Elija el método de promedio</option>
                            <option value="promedioMovil">Promedio móvil</option>
                            <option value="promedioMovilPonderado">Promedio móvil ponderado</option>
                        </select>
                    </div>
                </form>
                {metodoPrediccion === 'promedioMovil' && (
                    <PromedioMovil onChange={handleInputChange} values={formValues} resultado={resultado}/>
                )}
                {metodoPrediccion === 'promedioMovilPonderado' && (
                    <PromedioMovilPonderado onChange={handleInputChange} values={formValues} resultado={resultado} handlePonderacionesChange={handlePonderacionesChange}/>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>Cerrar</Button>
                <Button variant="primary" onClick={handleCalcularClick}>Calcular</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DemandaProyectadaModal;