
import { Table } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { OrdenCompraService } from "../Services/OrdenCompraService";


const DetalleOrdenCompraTable = () => {
    
    const { id } = useParams();
    const [orden, setOrden] = useState(null);
 

    useEffect(() => {
        const fetchOrden = async () => {
            const ord = await OrdenCompraService.getOrdenCompra(id);
            setOrden(ord);
            console.log(ord.product_purchase_orders)
        };

        if (id) {
            fetchOrden();
        }
    }, [id]);

    if (!orden) {
        return <div>Loading...</div>;
    }
    return (
        <>
        <h1>Detalle Orden Compra</h1>
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
                    {orden.product_purchase_orders && orden.product_purchase_orders.map((OCP) => (
                    <tr key={OCP.id}>
                        <td>{OCP.id}</td>
                        <td>{OCP.product.nombreProducto}</td>
                        <td>{OCP.cantOrdenCompraProducto}</td>
                        <td>{OCP.product.precioVentaProducto*OCP.cantOrdenCompraProducto}</td>
                        <td>{OCP.product.precioVentaProducto}</td>
                    </tr>
                     ))} 
                    </tbody>
                </Table>
                
        </>
    );
};

export default DetalleOrdenCompraTable;