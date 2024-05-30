import { Route, Routes } from "react-router-dom"
import Productos from "../Page/Producto";
import Categoria from "../Page/Categoria";
import Cliente from "../Page/Cliente";



const AppRoutes = () => {
    
    return (
        <Routes>
            <Route path="/" element={<Productos />} />
            <Route path="/Cliente" element={<Cliente />} />
            <Route path="/Categorias" element={<Categoria />} />

        </Routes>
    )
}
export default AppRoutes;