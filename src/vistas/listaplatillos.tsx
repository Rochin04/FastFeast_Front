import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

type Platillo = {
  id: string | number;
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPlatillos = async (retry = true) => {
    setLoading(true);
    setError(null);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    try {
      const res = await fetch("/api/platillos", { signal: controller.signal });
      clearTimeout(timeout);

      const ct = res.headers.get("content-type") || "";
      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(txt || `Error HTTP ${res.status}`);
      }
      if (!ct.includes("application/json")) {
        const txt = await res.text().catch(() => "");
        console.warn("Respuesta no JSON:", txt);
        throw new Error("Respuesta inválida del servidor (no JSON)");
      }

      const data = await res.json().catch(() => {
        throw new Error("No se pudo parsear JSON");
      });

      setPlatillos(Array.isArray(data) ? data : []);
    } catch (err: any) {
      if (err.name === "AbortError" && retry) {
        console.warn("Fetch abortado por timeout, reintentando...");
        fetchPlatillos(false);
        return;
      }
      if (err.message && err.message.includes("Failed to fetch")) {
        setError("No se pudo conectar al backend. Verifica que el servidor esté activo.");
      } else {
        setError(err.message || "Error desconocido al cargar platillos.");
      }
    } finally {
      clearTimeout(timeout);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlatillos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Insertar platillo recibido via navigation state (si existe) evitando duplicados
  useEffect(() => {
    const stateAny: any = location.state as any;
    const nuevo = stateAny?.nuevoPlatillo as Platillo | undefined;
    if (nuevo) {
      setPlatillos((prev) => {
        const existsById = nuevo.id != null && prev.some((p) => String(p.id) === String(nuevo.id));
        if (existsById) return prev;
        const existsByKeys = prev.some((p) => p.nombre === nuevo.nombre && String(p.precio) === String(nuevo.precio));
        if (existsByKeys) return prev;
        return [nuevo, ...prev];
      });
      // limpiar state para evitar re-inserciones
      navigate(location.pathname, { replace: true, state: {} });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  const handleDelete = async (id: string | number) => {
    if (!confirm("¿Desea eliminar este platillo?")) return;
    try {
      const res = await fetch(`/api/platillos/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(txt || "Error al eliminar.");
      }
      setPlatillos((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      alert(err?.message || "No se pudo eliminar el platillo.");
    }
  };

  const toPrice = (p: number | string) => {
    const n = typeof p === "number" ? p : Number(p);
    if (isNaN(n)) return "—";
    return `$${n.toFixed(2)}`;
  };

  return (
    <div style={{ maxWidth: 1100, margin: "24px auto", padding: 16 }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <h2 style={{ margin: 0 }}>Platillos</h2>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => navigate("/crear-platillo")} style={{ padding: "8px 12px" }}>
            Nuevo platillo
          </button>
          <button onClick={() => fetchPlatillos()} style={{ padding: "8px 12px" }}>
            Actualizar
          </button>
        </div>
      </header>

      {loading && <div>Cargando platillos...</div>}
      {error && <div style={{ color: "#fff", background: "#c0392b", padding: 10, borderRadius: 6 }}>{error}</div>}
      {!loading && !error && platillos.length === 0 && <div>No se encontraron platillos.</div>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 16,
          marginTop: 12,
        }}
      >
        {/*
          Renderizado de tarjetas recorriendo la lista.
          En React se usa .map para iterar y devolver JSX.
        */}
        {platillos.map((p) => (
          <article
            key={p.id}
            style={{
              border: "1px solid #e6e6e6",
              borderRadius: 10,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              background: "#fff",
              boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
            }}
            aria-label={`Platillo ${p.nombre}`}
          >
            <div style={{ width: "100%", height: 160, background: "#f6f6f6", overflow: "hidden" }}>
              <img
                src={p.imagenUrl || "/placeholder-food.png"}
                alt={p.nombre}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder-food.png";
                }}
              />
            </div>

            <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
                <h3 style={{ margin: 0, fontSize: 16, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {p.nombre}
                </h3>
                <span style={{ fontWeight: 600, color: "#2d3436" }}>{toPrice(p.precio)}</span>
              </div>

              <div style={{ color: "#6c6c6c", fontSize: 13, minHeight: 40 }}>
                {p.descripcion ? (
                  <p style={{ margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {p.descripcion}
                  </p>
                ) : (
                  <small>Sin descripción</small>
                )}
              </div>

              <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                <small style={{ color: "#888" }}>{p.categoria || "Sin categoría"}</small>

                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={() => navigate(`/platillos/${p.id}`)}
                    style={{ padding: "6px 10px", background: "transparent", border: "1px solid #ddd", borderRadius: 6 }}
                  >
                    Ver
                  </button>
                  <button
                    onClick={() => navigate(`/platillos/${p.id}/editar`)}
                    style={{ padding: "6px 10px", background: "#0984e3", color: "#fff", border: "none", borderRadius: 6 }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    style={{ padding: "6px 10px", background: "#e17055", color: "#fff", border: "none", borderRadius: 6 }}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ListaPlatillos;