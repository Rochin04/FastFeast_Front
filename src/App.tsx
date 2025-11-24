import PWABadge from './PWABadge.tsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CrearPlatillos from "./vistas/crearplatillos.tsx";
import MenuPrincipal from "./vistas/menuprincipal.tsx";
import ListaPlatillos from "./vistas/listaplatillos.tsx";
import Platillo from "./vistas/platillo.tsx";
import Carrito from "./vistas/carrito.tsx";
function App() {

  return (
    <>
       <BrowserRouter>
      <Routes>
        {/* Ruta principal */}
        <Route path="/menuprincipal" element={<MenuPrincipal />} />

       <Route path="/platillo/:id" element={<Platillo />} />

        
      <Route path="/carrito" element={<Carrito />} />


        {/* Ruta para listar platillos */}
        <Route path="/platillos" element={<ListaPlatillos />} />

        {/* Ruta para crear platillos */}
        <Route path="/crear-platillo" element={<CrearPlatillos />} />
      </Routes>
    </BrowserRouter>
        
      <PWABadge />
    </>
  )
}

export default App
