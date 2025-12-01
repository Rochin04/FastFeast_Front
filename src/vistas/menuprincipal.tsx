import React from "react";
import "./menuprincipal.css";
import { useNavigate } from "react-router-dom";

const MenuPrincipal: React.FC = () => {
  const navigate = useNavigate();

  const agregarAlCarrito = (item: any) => {
    const carritoActual = JSON.parse(localStorage.getItem("carrito") || "[]");
    carritoActual.push(item);
    localStorage.setItem("carrito", JSON.stringify(carritoActual));
  };

  return (
    <div className="contenedor">

      {/* HEADER */}
     <header className="header">
  <h1 className="logo">
    Fast<span>Feast</span>
  </h1>

  <img className="hamburguesa" src="/menu.png" alt="menu" />

  <nav className="menu">
    <ul className="navegacion">
      <li><a href="#">Inicio</a></li>
      <li><a href="#">Menú</a></li>
      <li><a href="#">Sobre Nosotros</a></li>

      <li style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        <a href="#">Iniciar Sesión</a>

        {/* 🔥 NUEVO BOTÓN — VER CARRITO */}
        <button
          onClick={() => navigate("/Carrito")}
          className="boton-carrito-header"
        >
          Ver Carrito
        </button>
      </li>
    </ul>
  </nav>
</header>

      {/* PRESENTACIÓN */}
      <section className="presentacion">
        <div className="informacion">
          <h2>La comida que te encanta directo a tu puerta</h2>
          <p>Explora nuestros platillos más populares y disfruta de una experiencia deliciosa.</p>
          <div className="informacion--boton">
            <button onClick={() => navigate("/Carrito")}>Ver Carrito</button>
          </div>
        </div>

        <img 
          className="presentacion--imagen"
          src="/banner-comida.png"
          alt="comida"
        />
      </section>

      {/* PLATOS */}
      <section className="comida">
        <h2 className="comida--titulo">Platillos Populares</h2>

        <div className="platos">

          {/* TARJETA 1 */}
          <div className="plato">
            <img src="/hamburguesa.png" alt="Hamburguesa" />
            <h3>Hamburguesa Especial</h3>
            <p>Pan artesanal, carne de res y queso cheddar.</p>

            <div className="plato--info">
              <p>$120</p>
              <button onClick={() => agregarAlCarrito({
                nombre: "Hamburguesa Especial",
                precio: 120,
                imagenUrl: "/hamburguesa.png"
              })}>+</button>
            </div>
          </div>

          {/* TARJETA 2 */}
          <div className="plato">
            <img src="/pizza.png" alt="Pizza" />
            <h3>Pizza Suprema</h3>
            <p>Pepperoni, queso mozzarella y salsa italiana.</p>

            <div className="plato--info">
              <p>$150</p>
              <button onClick={() => agregarAlCarrito({
                nombre: "Pizza Suprema",
                precio: 150,
                imagenUrl: "/pizza.png"
              })}>+</button>
            </div>
          </div>

          {/* TARJETA 3 */}
          <div className="plato">
            <img src="/tacos.png" alt="Tacos" />
            <h3>Tacos al Pastor</h3>
            <p>Piña, tortilla de maíz y salsa especial.</p>

            <div className="plato--info">
              <p>$90</p>
              <button onClick={() => agregarAlCarrito({
                nombre: "Tacos al Pastor",
                precio: 90,
                imagenUrl: "/tacos.png"
              })}>+</button>
            </div>
          </div>

          {/* TARJETA 4 */}
          <div className="plato">
            <img src="/ensalada.png" alt="Ensalada" />
            <h3>Ensalada Fit</h3>
            <p>Lechuga, tomate, aguacate y pollo.</p>

            <div className="plato--info">
              <p>$110</p>
              <button onClick={() => agregarAlCarrito({
                nombre: "Ensalada Fit",
                precio: 110,
                imagenUrl: "/ensalada.png"
              })}>+</button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default MenuPrincipal;
