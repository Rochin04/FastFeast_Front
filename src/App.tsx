import PWABadge from './PWABadge.tsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CrearPlatillos from "./vistas/crearplatillos.tsx";

import ListaPlatillos from "./vistas/listaplatillos.tsx";
function App() {

  return (
    <>
       <BrowserRouter>
      <Routes>
        {/* Ruta principal */}
        <Route path="/" element={<h1>Página de inicio</h1>} />
       
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
