import { Route, Routes } from "react-router-dom"
import Productos from "../Page/Producto";




const AppRoutes = () => {
    
    return (
        <Routes>
            <Route path="/" element={<Productos />} />
        </Routes>
    )
}
export default AppRoutes;