import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Platillo = {
  id: number | string;
  nombre: string;
  descripcion?: string;
  precio: number | string;
  categoria?: string;
  imagenUrl?: string | null;
};

const ListaPlatillos: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [platillos, setPlatillos] = useState<Platillo[]>([]);

  // Cargar platillos guardados
  const cargarPlatillos = () => {
    const almacenados = JSON.parse(localStorage.getItem("platillos") || "[]");
    setPlatillos(almacenados);
  };

  useEffect(() => {
    cargarPlatillos();
  }, []);

  // Agregar nuevo platillo sin duplicar
  useEffect(() => {
    const data: any = location.state;
    const nuevo = data?.nuevoPlatillo;

    if (nuevo) {
      setPlatillos((prev) => {
        const existe = prev.some(
          (p) =>
            p.nombre.toLowerCase() === nuevo.nombre.toLowerCase() &&
            p.descripcion === nuevo.descripcion &&
            p.precio === nuevo.precio &&
            p.categoria === nuevo.categoria
        );

        if (existe) return prev;

        const actualizado = [nuevo, ...prev];
        localStorage.setItem("platillos", JSON.stringify(actualizado));
        return actualizado;
      });

      // Limpia el estado para evitar duplicados
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state]);

  const toPrice = (p: number | string) =>
    isNaN(Number(p)) ? "—" : `$${Number(p).toFixed(2)}`;

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "24px auto",
        padding: 20,
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* ENCABEZADO */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h2 style={{ margin: 0 }}>Platillos</h2>

        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={() => navigate("/crear-platillo")}
            style={{
              padding: "10px 16px",
              background: "#4caf50",
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: "bold",
              transition: "0.2s",
            }}
          >
            Nuevo platillo
          </button>

          {/* 🔄 BOTÓN DE SINCRONIZAR */}
          <button
            onClick={cargarPlatillos}
            style={{
              padding: "10px 16px",
              background: "#2196f3",
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: "bold",
              transition: "0.2s",
            }}
          >
             Sincronizar
          </button>
        </div>
      </header>

      {/* MENSAJE SI NO HAY PLATILLOS */}
      {platillos.length === 0 && (
        <p style={{ textAlign: "center", color: "#666" }}>
          No hay platillos agregados.
        </p>
      )}

      {/* GRID DE 3 COLUMNAS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 24,
        }}
      >
        {platillos.map((p) => (
          <div
            key={p.id}
            style={{
              borderRadius: 12,
              background: "#fff",
              overflow: "hidden",
              boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
              transition: "transform 0.2s, box-shadow 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.03)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.20)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.15)";
            }}
          >
            {/* Imagen */}
            <div style={{ height: 180, background: "#f2f2f2" }}>
              <img
                src={p.imagenUrl || "/placeholder-food.png"}
                alt={p.nombre}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            {/* Contenido */}
            <div style={{ padding: 16 }}>
              <h3 style={{ margin: "0 0 8px 0" }}>{p.nombre}</h3>
              <p style={{ color: "#555", margin: "0 0 8px 0" }}>
                {p.descripcion || "Sin descripción"}
              </p>

              <strong style={{ fontSize: 18 }}>{toPrice(p.precio)}</strong>
              <br />
              <small style={{ color: "#777" }}>
                {p.categoria || "Sin categoría"}
              </small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaPlatillos;
