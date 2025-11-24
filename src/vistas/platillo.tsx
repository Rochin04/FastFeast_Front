// Platillo.tsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Platillo: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const platillo = (location.state as any)?.platillo;

  if (!platillo) {
    return (
      <div style={{ padding: 30 }}>
        <h2>No se encontró el platillo</h2>
        <button onClick={() => navigate(-1)}>Regresar</button>
      </div>
    );
  }

  const agregarCarrito = () => {
  const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
  carrito.push(platillo);
  localStorage.setItem("carrito", JSON.stringify(carrito));

  navigate("/carrito"); // 🔥 Ir directamente al carrito
};


  return (
    <>
      <style>{`
        body {
          background: #ffffff !important;
          color: #000;
        }

        .platillo-root {
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
          padding: 25px;
          transform: translateX(350px); /* 🔥 Mueve solo el contenido */
        }

        .thumb {
          width: 100%;
          height: 320px;
          border-radius: 18px;
          overflow: hidden;
          margin-bottom: 20px;
        }

        .thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .btn {
          margin-top: 25px;
          padding: 15px;
          width: 100%;
          background: #000;
          color: #fff;
          font-size: 18px;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: 0.2s;
        }

        .btn:hover {
          background: #333;
        }

        .back {
          color: #000;
          cursor: pointer;
          margin-bottom: 20px;
          display: inline-block;
          font-size: 18px;
        }

        .back-container {
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
          padding: 25px;
          /* 🔥 No tiene transform, así que NO se mueve */
        }
      `}</style>

      {/* 🔥 Este NO se mueve */}
      <div className="back-container">
        <span className="back" onClick={() => navigate(-1)}>← Regresar</span>
      </div>

      {/* 🔥 Este SÍ se mueve */}
      <div className="platillo-root">
        <div className="thumb">
          <img src={platillo.imagenUrl} alt={platillo.nombre} />
        </div>

        <h1>{platillo.nombre}</h1>
        <p style={{ fontSize: 18 }}>{platillo.descripcion}</p>

        <h2 style={{ marginTop: 15 }}>
          Precio: <strong>${Number(platillo.precio).toFixed(2)}</strong>
        </h2>

        <button className="btn" onClick={agregarCarrito}>
          Agregar al carrito 🛒
        </button>
      </div>
    </>
  );
};

export default Platillo;
