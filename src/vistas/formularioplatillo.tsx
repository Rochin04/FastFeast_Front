import React, { useState } from "react";

const CrearPlatillos: React.FC = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagen, setImagen] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos enviados:", { nombre, descripcion, precio, categoria, imagen });
  };

  return (
    <>
      {/* ======== CSS INCRUSTADO ======== */}
      <style>
        {`
          body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background: #f5f5f5;
          }

          /* 🔥 CONTENEDOR PRINCIPAL PARA CENTRAR TODO */
          .contenedor-principal {
            width: 100%;
            height: 100vh;
            display: flex;
            justify-content: center;   /* horizontal */
            align-items: center;       /* vertical */
            padding: 20px;
            margin-left: 280px;
          }

          /* Wrapper para evitar bugs en móviles y mejor control */
          .form-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
          }

          .card {
            background: white;
            padding: 25px;
            width: 350px;
            border-radius: 12px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
          }

          .card h2 {
            text-align: center;
            margin-bottom: 20px;
            font-size: 22px;
            font-weight: bold;
          }

          .input-group {
            margin-bottom: 15px;
            display: flex;
            flex-direction: column;
          }

          .input-group label {
            font-size: 14px;
            margin-bottom: 5px;
            font-weight: bold;
          }

          .input-group input,
          .input-group textarea,
          .input-group select {
            padding: 10px;
            border-radius: 8px;
            border: 1px solid #ccc;
            outline: none;
            font-size: 14px;
          }

          .buttons {
            display: flex;
            justify-content: space-between;
            margin-top: 15px;
          }

          .btn {
            padding: 10px 15px;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            font-weight: bold;
            font-size: 14px;
          }

          .btn-cancelar {
            background: #e5e5e5;
          }

          .btn-crear {
            background: #4caf50;
            color: white;
          }
        `}
      </style>

      {/* ======== FORMULARIO ======== */}
      <div className="contenedor-principal">
        <div className="form-wrapper">

          <form className="card" onSubmit={handleSubmit}>
            <h2>Agregar Platillo 🍽️</h2>

            <div className="input-group">
              <label>Nombre</label>
              <input 
                type="text"
                placeholder="Ej. Enchiladas"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Descripción</label>
              <textarea 
                placeholder="Descripción del platillo"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Precio</label>
              <input 
                type="number"
                placeholder="0.00"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Categoría</label>
              <select 
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option value="">-- Seleccionar --</option>
                <option value="Mexicana">Mexicana</option>
                <option value="Italiana">Italiana</option>
                <option value="Rapida">Rápida</option>
              </select>
            </div>

            <div className="input-group">
              <label>Imagen (opcional)</label>
              <input 
                type="file"
                onChange={(e) => setImagen(e.target.files?.[0] || null)}
              />
            </div>

            <div className="buttons">
              <button type="button" className="btn btn-cancelar">Cancelar</button>
              <button type="submit" className="btn btn-crear">Crear</button>
            </div>

          </form>

        </div>
      </div>
    </>
  );
};

export default CrearPlatillos;
