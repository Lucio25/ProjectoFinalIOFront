
import { Table } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { VentasService } from "../Services/VentasService";

const DetalleVentaTable = () => {
    
    const { id } = useParams();
    const [venta, setVenta] = useState(null);
 

    useEffect(() => {
        const fetchVenta = async () => {
            const vta = await VentasService.getVenta(id);
            setVenta(vta);
        };

        if (id) {
            fetchVenta();
        }
    }, [id]);

    if (!venta) {
        return <div>Loading...</div>;
    }
    console.log(venta, "venta")
console.log(venta.id, "venta id")
    return (
        <>
        <h1>Detalle Venta</h1>
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
                    {venta.ventaProductos && venta.ventaProductos.map((ventaProducto) => (
                    <tr key={ventaProducto.id}>
                        <td>{venta.id}</td>
                        <td>{ventaProducto.producto.nombreProducto}</td>
                        <td>{ventaProducto.cantVentaProducto}</td>
                        <td>{ventaProducto.producto.precioVentaProducto*ventaProducto.cantVentaProducto}</td>
                        <td>{ventaProducto.producto.precioVentaProducto}</td>
                    </tr>
                     ))} 
                    </tbody>
                </Table>
                
        </>
    );
};

export default DetalleVentaTable;