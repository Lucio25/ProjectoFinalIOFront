import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { VentasService } from "../Services/VentasService";

const DetalleVentaTable = (id) => {
    
    
    const [venta, setVenta] = useState([]);
    useEffect(() => {
        const fetchventa = async () => {
            const vta = await VentasService.getVenta(id);
            setClientes(vta);
            console.log(vta);
        };
        fetchventa();
    }, []);

    return (
        <>
                <Table hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre Producto</th>
                            <th>Cantidad</th>
                            <th>Total Producto</th>
                            <th>Subtotal Producto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {venta.map(v => (
                            <tr key={v.id}>
                                <td>{v.id}</td>
                                <td>{v.ventaProductos}</td>
                                <td>{}</td>
                                <td>{v.ventaProductos}</td>
                                <td>{}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
        </>
    );
};

export default DetalleVentaTable;