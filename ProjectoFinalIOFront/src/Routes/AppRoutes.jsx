import { Route, Routes } from "react-router-dom"
import Productos from "../Page/Producto";
import Categoria from "../Page/Categoria";
import Cliente from "../Page/Cliente";
import Venta from "../Page/Venta";
import DetalleVenta from "../Page/DetalleVenta";
import OrdenCompra from "../Page/OrdenCompra.jsx";
import Proveedor from "../Page/Proveedor.jsx";



const AppRoutes = () => {
    
    return (
        <Routes>
            <Route path="/" element={<Productos />} />
            <Route path="/Cliente" element={<Cliente />} />
            <Route path="/Categorias" element={<Categoria />} />
            <Route path="/Ventas" element={<Venta />} />
            <Route path="/detalleventa/:id" element={<DetalleVenta />} />
            <Route path="/OrdenCompra" element={<OrdenCompra />} /> 
            <Route path="/Proveedor" element={<Proveedor />} />
        </Routes>
    )
}
export default AppRoutes;