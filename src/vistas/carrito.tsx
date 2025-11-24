import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Carrito: React.FC = () => {
  const [carrito, setCarrito] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("carrito") || "[]");
    setCarrito(data);
  }, []);

  const eliminarItem = (index: number) => {
    const nuevoCarrito = carrito.filter((_, i) => i !== index);
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const total = carrito.reduce((acc, item) => acc + Number(item.precio), 0);

  return (
    <>
      <style>{`
        body {
          background: #ffffff !important;
          color: #000;
        }

        /* 🔥 Contenedor general */
        .carrito-container {
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
          padding: 25px;
        }

        /* 🔥 Solo el contenido se mueve a la derecha */
        .carrito-root {
          transform: translateX(350px);
          text-align: center;
          padding: 20px;
          max-width: 800px;
        }

        .back-btn {
          font-size: 18px;
          cursor: pointer;
          color: black;
          margin-bottom: 20px;
          display: inline-block;
        }

        .item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #ccc;
          padding: 15px 0;
        }

        .item img {
          width: 100px;
          height: 100px;
          object-fit: cover;
          border-radius: 10px;
        }

        .delete-btn {
          background: none;
          border: none;
          cursor: pointer;
        }

        .delete-icon {
          font-size: 28px;
          color: red;
        }

        .pagar-btn {
          margin-top: 25px;
          padding: 15px;
          width: 100%;
          background: #000;
          color: #fff;
          font-size: 18px;
          border: none;
          border-radius: 12px;
          cursor: pointer;
        }
      `}</style>

      <div className="carrito-container">

        {/* 🔙 Botón Regresar (NO se mueve) */}
        <span className="back-btn" onClick={() => navigate(-1)}>
          ← Regresar
        </span>

        {/* 🔥 ESTE sí se mueve */}
        <div className="carrito-root">
          <h1>🛒 Carrito</h1>

          {carrito.length === 0 ? (
            <p>No hay productos en el carrito</p>
          ) : (
            carrito.map((item, index) => (
              <div key={index} className="item">
                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                  <img src={item.imagenUrl} alt={item.nombre} />
                  <div style={{ textAlign: "left" }}>
                    <h3>{item.nombre}</h3>
                    <p>${Number(item.precio).toFixed(2)}</p>
                  </div>
                </div>

                <button className="delete-btn" onClick={() => eliminarItem(index)}>
                  <span className="delete-icon">🗑️</span>
                </button>
              </div>
            ))
          )}

          <h2 style={{ marginTop: 20 }}>
            Total a pagar: <strong>${total.toFixed(2)}</strong>
          </h2>

          {carrito.length > 0 && (
            <button className="pagar-btn" onClick={() => alert("Pago completado ✔")}>
              Pagar
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Carrito;
