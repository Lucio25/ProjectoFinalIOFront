import { Route, Routes } from "react-router-dom"
import Productos from "../Page/Producto";

import Categoria from "../Page/Categoria";



const AppRoutes = () => {
    
    return (
        <Routes>
            <Route path="/" element={<Productos />} />

            <Route path="/Categorias" element={<Categoria />} />

        </Routes>
    )
}
export default AppRoutes;