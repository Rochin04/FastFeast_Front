// MenuPrincipal.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

type Platillo = {
  id: number | string;
  nombre: string;
  descripcion?: string;
  precio: number | string;
  categoria?: string;
  imagenUrl?: string | null;
};

const defaultPlatillos: Platillo[] = [
  {
    id: "p1",
    nombre: "Hamburguesa Clásica",
    descripcion: "Carne de res, lechuga, tomate y queso cheddar.",
    precio: 10.99,
    categoria: "Hamburguesas",
    imagenUrl:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=60",
  },
  {
    id: "p2",
    nombre: "Pizza Pepperoni",
    descripcion: "Salsa de tomate, mozzarella y abundante pepperoni.",
    precio: 12.5,
    categoria: "Pizza",
    imagenUrl:
      "https://images.unsplash.com/photo-1601924928585-4ec087812b0c?auto=format&fit=crop&w=600&q=60",
  },
  {
    id: "p3",
    nombre: "Sushi Roll",
    descripcion: "Rollo de salmón fresco con pepino y aguacate.",
    precio: 8.99,
    categoria: "Sushi",
    imagenUrl:
      "https://images.unsplash.com/photo-1562158070-57129de036c9?auto=format&fit=crop&w=600&q=60",
  },
  {
    id: "p4",
    nombre: "Pancakes con miel",
    descripcion: "Esponjosos y dulces, acompañados de miel pura.",
    precio: 7.5,
    categoria: "Desayuno",
    imagenUrl:
      "https://images.unsplash.com/photo-1587731556938-38755b3e1d3a?auto=format&fit=crop&w=600&q=60",
  },
];

const categorias = [
  { key: "Pizza", icon: "https://img.icons8.com/emoji/48/pizza-emoji.png" },
  { key: "Hamburguesas", icon: "https://img.icons8.com/emoji/48/hamburger-emoji.png" },
  { key: "Comida rápida", icon: "https://img.icons8.com/emoji/48/french-fries-emoji.png" },
  { key: "Postres", icon: "https://img.icons8.com/emoji/48/cookie-emoji.png" },
  { key: "Mexicana", icon: "https://img.icons8.com/emoji/48/taco-emoji.png" },
  { key: "Café", icon: "https://img.icons8.com/emoji/48/hot-beverage.png" },
  { key: "Americana", icon: "https://img.icons8.com/emoji/48/hot-dog-emoji.png" },
  { key: "Desayuno", icon: "https://img.icons8.com/emoji/48/pancakes-emoji.png" },
  { key: "Comida reconfortante", icon: "https://img.icons8.com/emoji/48/waffle-emoji.png" }
];

const MenuPrincipal: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [platillos, setPlatillos] = useState<Platillo[]>([]);
  const [query, setQuery] = useState("");
  const [categoriaActiva, setCategoriaActiva] = useState<string>("");

  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem("platillos") || "null");
    let lista: Platillo[] = Array.isArray(guardados) ? guardados : defaultPlatillos;

    const nuevo = (location?.state as any)?.nuevoPlatillo;
    if (nuevo) lista = [nuevo, ...lista];

    setPlatillos(lista);
  }, [location?.state]);

  const listaMostrada = platillos.filter((p) => {
    const matchTexto =
      query.trim() &&
      (p.nombre.toLowerCase().includes(query.toLowerCase()) ||
        p.descripcion?.toLowerCase().includes(query.toLowerCase()));

    const matchCategoria =
      categoriaActiva &&
      p.categoria?.toLowerCase() === categoriaActiva.toLowerCase();

    return matchTexto || matchCategoria || (!query && !categoriaActiva);
  });

  return (
    <>
      <style>{`
        body {
          background: #ffffff !important;
          color: #000 !important;
        }

        .menu-root {
          width: 100%;
          max-width: 1300px;
          margin: 0 auto;
          padding: 25px;
          transform: translateX(80px);
        }

        h1, h2, h3, p, strong {
          color: #000 !important;
        }

        .cart-container {
          width: 100%;
          display: flex;
          justify-content: flex-end;
          margin-bottom: 20px;
        }
        .cart-icon {
          width: 38px;
          cursor: pointer;
          filter: invert(0);
        }

        .search-box {
          width: 100%;
          max-width: 650px;
          margin: 0 auto;
          display: block;
        }

        .cat-list {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 20px;
          margin-top: 20px;
        }

        .cat-item {
          width: 80px;
          text-align: center;
          cursor: pointer;
        }

        .cat-item img {
          width: 40px;
          height: 40px;
        }

        .grid-cards {
          margin-top: 30px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
          justify-items: center;
        }

        .card {
          width: 100%;
          max-width: 320px;
          background: #f7f7f7;
          border-radius: 14px;
          border: 1px solid #ddd;
          padding: 10px;
          cursor: pointer;
          transition: 0.2s;
        }

        .card:hover {
          transform: scale(1.03);
        }

        .thumb {
          width: 100%;
          height: 170px;
          overflow: hidden;
          border-radius: 12px;
        }

        .thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>

      <div className="menu-root">

        <div className="cart-container">
          <img
            className="cart-icon"
            src="https://img.icons8.com/material-outlined/48/shopping-cart.png"
            onClick={() => navigate("/carrito")}
          />
        </div>

        <h1 style={{ textAlign: "center" }}>¿Qué te apetece hoy?</h1>

        <input
          placeholder="Buscar platillo..."
          className="search-box"
          style={{
            padding: 15,
            borderRadius: 20,
            border: "1px solid #ccc",
            marginTop: 10,
          }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <h2 style={{ textAlign: "center", marginTop: 20 }}>Categorías</h2>

        <div className="cat-list">
          {categorias.map((c) => (
            <div
              key={c.key}
              className="cat-item"
              onClick={() => setCategoriaActiva(c.key)}
              style={{
                opacity: categoriaActiva && categoriaActiva !== c.key ? 0.4 : 1,
              }}
            >
              <img src={c.icon} />
              <p>{c.key}</p>
            </div>
          ))}
        </div>

        <h2 style={{ textAlign: "center", marginTop: 25 }}>Platillos populares</h2>

        <div className="grid-cards">
          {listaMostrada.map((p) => (
            <div
              key={p.id}
              className="card"
              onClick={() =>
                navigate(`/platillo/${p.id}`, { state: { platillo: p } })
              }
            >
              <div className="thumb">
                <img src={p.imagenUrl || ""} />
              </div>

              <h3>{p.nombre}</h3>
              <p>{p.descripcion}</p>
              <strong>${Number(p.precio).toFixed(2)}</strong>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MenuPrincipal;
