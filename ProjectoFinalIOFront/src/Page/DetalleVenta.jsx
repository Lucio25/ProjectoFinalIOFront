
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
            console.log(vta.product_sales)
        };

        if (id) {
            fetchVenta();
        }
    }, [id]);

    if (!venta) {
        return <div>Loading...</div>;
    }
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
                    {venta.product_sales && venta.product_sales.map((ventaProducto) => (
                    <tr key={ventaProducto.id}>
                        <td>{ventaProducto.id}</td>
                        <td>{ventaProducto.product.nombreProducto}</td>
                        <td>{ventaProducto.cantVentaProducto}</td>
                        <td>{ventaProducto.product.precioVentaProducto*ventaProducto.cantVentaProducto}</td>
                        <td>{ventaProducto.product.precioVentaProducto}</td>
                    </tr>
                     ))} 
                    </tbody>
                </Table>
                
        </>
    );
};

export default DetalleVentaTable;