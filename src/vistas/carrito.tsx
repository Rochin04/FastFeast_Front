import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./carrito.css"; // <- ARCHIVO NUEVO PARA NO ROMPER EL MENUPRINCIPAL

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
    <div className="contenedor-carrito">

      <header className="carrito-header">
        <h1 className="logo">Fast<span>Feast</span></h1>

        <button className="btn-regresar"
          onClick={() => navigate("/MenuPrincipal")}
        >
          Regresar
        </button>
      </header>

      <h2 className="titulo-carrito">🛒 Carrito</h2>

      <div className="lista-carrito">
        {carrito.length === 0 ? (
          <p className="vacio">No hay productos en el carrito</p>
        ) : (
          carrito.map((item, index) => (
            <div className="item-carrito" key={index}>
              <img src={item.imagenUrl} alt={item.nombre} />
              
              <div className="info">
                <h3>{item.nombre}</h3>
                <p className="precio">${item.precio}</p>
              </div>

              <button className="btn-eliminar" onClick={() => eliminarItem(index)}>
                Eliminar
              </button>
            </div>
          ))
        )}
      </div>

      {carrito.length > 0 && (
        <div className="total">
          <h2>Total: ${total.toFixed(2)}</h2>
          <button className="btn-pagar">Pagar</button>
        </div>
      )}

    </div>
  );
};

export default Carrito;
