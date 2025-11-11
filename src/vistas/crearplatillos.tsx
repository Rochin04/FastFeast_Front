import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type PlatilloForm = {
    nombre: string;
    descripcion: string;
    precio: string;
    categoria: string;
    imagen?: File | null;
};

const CrearPlatillos: React.FC = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState<PlatilloForm>({
        nombre: "",
        descripcion: "",
        precio: "",
        categoria: "",
        imagen: null,
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        setForm((prev) => ({ ...prev, imagen: file || null }));
    };

    const validate = (): boolean => {
        if (!form.nombre.trim()) {
            setError("El nombre es requerido.");
            return false;
        }
        if (!form.precio || isNaN(Number(form.precio)) || Number(form.precio) <= 0) {
            setError("Ingrese un precio válido mayor a 0.");
            return false;
        }
        setError(null);
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            const payload = new FormData();
            payload.append("nombre", form.nombre);
            payload.append("descripcion", form.descripcion);
            payload.append("precio", form.precio);
            payload.append("categoria", form.categoria);
            if (form.imagen) payload.append("imagen", form.imagen);

            // Intentar crear en backend; si la respuesta no es JSON o falla, se crea objeto local
            let createdPlatillo: any = null;
            try {
                const res = await fetch("/api/platillos", {
                    method: "POST",
                    body: payload,
                });

                const ct = res.headers.get("content-type") || "";
                if (res.ok && ct.includes("application/json")) {
                    createdPlatillo = await res.json().catch(() => null);
                } else if (!res.ok) {
                    const txt = await res.text().catch(() => "");
                    console.warn("API create failed:", txt);
                } else {
                    // res.ok pero no JSON
                    console.warn("API returned non-JSON response on create");
                }
            } catch (apiErr) {
                console.warn("No se pudo conectar a la API, se usará objeto local.", apiErr);
            }

            if (!createdPlatillo) {
                createdPlatillo = {
                    id: `local-${Date.now()}`,
                    nombre: form.nombre,
                    descripcion: form.descripcion,
                    precio: Number(form.precio) || form.precio,
                    categoria: form.categoria,
                    imagenUrl: form.imagen ? URL.createObjectURL(form.imagen) : null,
                };
            }

            // Navegar a lista pasando el nuevo platillo por location.state (reemplaza la entrada)
            navigate("/platillos", { state: { nuevoPlatillo: createdPlatillo }, replace: true });
        } catch (err: any) {
            setError(err.message || "Error desconocido.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 700, margin: "24px auto", padding: 16, border: "1px solid #eee", borderRadius: 8 }}>
            <h2>Crear Platillo</h2>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 12 }}>
                    <label>Nombre</label>
                    <input
                        name="nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        placeholder="Ej. Enchiladas"
                        required
                        style={{ width: "100%", padding: 8, marginTop: 4 }}
                    />
                </div>

                <div style={{ marginBottom: 12 }}>
                    <label>Descripción</label>
                    <textarea
                        name="descripcion"
                        value={form.descripcion}
                        onChange={handleChange}
                        placeholder="Descripción breve"
                        rows={3}
                        style={{ width: "100%", padding: 8, marginTop: 4 }}
                    />
                </div>

                <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                    <div style={{ flex: 1 }}>
                        <label>Precio</label>
                        <input
                            name="precio"
                            value={form.precio}
                            onChange={handleChange}
                            placeholder="0.00"
                            inputMode="decimal"
                            style={{ width: "100%", padding: 8, marginTop: 4 }}
                        />
                    </div>

                    <div style={{ flex: 1 }}>
                        <label>Categoría</label>
                        <select name="categoria" value={form.categoria} onChange={handleChange} style={{ width: "100%", padding: 8, marginTop: 4 }}>
                            <option value="">-- Seleccionar --</option>
                            <option value="entrada">Entrada</option>
                            <option value="plato-fuerte">Plato fuerte</option>
                            <option value="postre">Postre</option>
                            <option value="bebida">Bebida</option>
                        </select>
                    </div>
                </div>

                <div style={{ marginBottom: 12 }}>
                    <label>Imagen (opcional)</label>
                    <input type="file" accept="image/*" onChange={handleFile} style={{ display: "block", marginTop: 4 }} />
                </div>

                {error && (
                    <div style={{ color: "white", background: "#c0392b", padding: 8, borderRadius: 4, marginBottom: 12 }}>
                        {error}
                    </div>
                )}

                <div style={{ display: "flex", gap: 8 }}>
                    <button type="submit" disabled={loading} style={{ padding: "8px 16px" }}>
                        {loading ? "Guardando..." : "Crear"}
                    </button>
                    <button type="button" onClick={() => navigate(-1)} style={{ padding: "8px 16px" }}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CrearPlatillos;