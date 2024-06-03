import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import {ClienteService }from  "../../Services/ClienteService.js" 

const ClientesTable = () => {
    
    
    const [clientes, setClientes] = useState([]);
    useEffect(() => {
        const fetchClientes = async () => {
            const clientes = await ClienteService.getClientes();
            setClientes(clientes);
            console.log(clientes);
        };
        fetchClientes();
    }, []);

    return (
        <>
                <Table hover>
                    <thead>
                        <tr>
                            <th>ID</th>                            
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Mail</th>
                            <th>Telefono</th>
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
                            </tr>
                        ))}
                    </tbody>
                </Table>
        </>
    );
};

export default ClientesTable;