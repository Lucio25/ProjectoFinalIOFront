import { Route, Routes } from "react-router-dom"
import Productos from "../Page/Producto";
import Clientes from "../Page/Cliente"


const AppRoutes = () => {
    
    return (
        <Routes>
            <Route path="/" element={<Productos />} />
            <Route path="/Clientes" element={<Clientes />} />
        </Routes>
    )
}
export default AppRoutes;