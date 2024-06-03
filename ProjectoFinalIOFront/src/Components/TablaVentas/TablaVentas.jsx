import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import { Button, Table } from "react-bootstrap";
import { VentasService } from "../../Services/VentasService";
import DetalleVentaButton from "../DetalleVentaButton/DetalleVentaButton";
import DeleteButton from "../DeleteButton/DeleteButton";
import EditButton from "../EditButton/EditButton";

const VentasTable = () => {
    
    const navigate = useNavigate();
    
    const [ventas, setVentas] = useState([]);

    const handleDetalleVentaClick = (v) => {

        navigate(`/detalleventa/${v.id}`);
        console.log(v.id, "id pa")
        
      };

      
    
    useEffect(() => {
        const fetchVentas = async () => {
            const VentasArreglo = await VentasService.getVentas();
            setVentas(VentasArreglo);
            console.log(VentasArreglo);
        };
        fetchVentas();
    }, []);

    return (
        <>
                <Button variant="dark" style={{float: 'right', margin: "1rem"}}>Añadir Venta</Button>
                <Table hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Estado de la Venta</th>
                            <th>Total Costo de la Venta</th>
                            <th>Cliente</th>
                            <th>Detalle Venta</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {ventas.map(v => (
                            <tr key={v.id}>
                                <td>{v.id}</td>
                                <td>{v.estadoVenta}</td>
                                <td>{v.totalCostoVenta}</td>
                                <td>{v.client_id}</td>
                                <td><DetalleVentaButton onClick={() => handleDetalleVentaClick(v)}/></td>
                                <td><EditButton/></td>
                                <td><DeleteButton/></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
              
        </>
    );
};

export default VentasTable;