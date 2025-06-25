import React, { useEffect, useState } from 'react';

const GestionCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    tipo: 'pan',
    imagen_url: '',
    popularidad: 0,
    destacado: false,
    estado: 'activo',
    codigo_categoria: '',
    orden: 1,
    observaciones: ''
  });

  useEffect(() => {
    cargarCategorias();
  }, []);

  const cargarCategorias = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/categorias');
      const data = await res.json();
      setCategorias(data);
    } catch (err) {
      console.error('Error al cargar categorías:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const limpiarFormulario = () => {
    setForm({
      nombre: '',
      descripcion: '',
      tipo: 'pan',
      imagen_url: '',
      popularidad: 0,
      destacado: false,
      estado: 'activo',
      codigo_categoria: '',
      orden: 1,
      observaciones: ''
    });
    setModoEdicion(false);
    setIdEditar(null);
  };

  const handleCrear = async () => {
    if (!form.nombre.trim()) return alert('El nombre es obligatorio.');

    try {
      const res = await fetch('http://localhost:8080/api/categorias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        limpiarFormulario();
        cargarCategorias();
      }
    } catch (error) {
      console.error('Error al crear categoría:', error);
    }
  };

  const handleActualizar = async () => {
    if (!idEditar) return;
    try {
      const res = await fetch(`http://localhost:8080/api/categorias/${idEditar}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        limpiarFormulario();
        cargarCategorias();
      }
    } catch (error) {
      console.error('Error al actualizar categoría:', error);
    }
  };

  const handleEditar = (categoria) => {
    setForm({ ...categoria });
    setModoEdicion(true);
    setIdEditar(categoria.id);
  };

  const handleEliminar = async (id) => {
    const confirmar = window.confirm('¿Estás seguro de eliminar esta categoría?');
    if (!confirmar) return;

    try {
      await fetch(`http://localhost:8080/api/categorias/${id}`, { method: 'DELETE' });
      cargarCategorias();
    } catch (error) {
      console.error('Error al eliminar categoría:', error);
    }
  };

  return (
    <div className="p-10 bg-pink-50 min-h-screen">
      <h1 className="text-3xl font-bold text-pink-700 mb-6">📦 Gestión de Categorías</h1>

      {/* FORMULARIO */}
      <div className="grid grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow mb-10">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          className="border border-pink-300 px-4 py-2 rounded"
          required
        />

        <select
          name="tipo"
          value={form.tipo}
          onChange={handleChange}
          className="border border-pink-300 px-4 py-2 rounded"
        >
          <option value="pan">Pan</option>
          <option value="pastel">Pastel</option>
          <option value="galleta">Galleta</option>
          <option value="otros">Otros</option>
        </select>

        <input
          type="text"
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
          className="border border-pink-300 px-4 py-2 rounded"
        />

        <input
          type="text"
          name="imagen_url"
          placeholder="URL de imagen"
          value={form.imagen_url}
          onChange={handleChange}
          className="border border-pink-300 px-4 py-2 rounded"
        />

        <input
          type="number"
          name="popularidad"
          placeholder="Popularidad"
          value={form.popularidad}
          onChange={handleChange}
          className="border border-pink-300 px-4 py-2 rounded"
        />

        <input
          type="number"
          name="orden"
          placeholder="Orden"
          value={form.orden}
          onChange={handleChange}
          className="border border-pink-300 px-4 py-2 rounded"
        />

        <input
          type="text"
          name="codigo_categoria"
          placeholder="Código"
          value={form.codigo_categoria}
          onChange={handleChange}
          className="border border-pink-300 px-4 py-2 rounded"
        />

        <select
          name="estado"
          value={form.estado}
          onChange={handleChange}
          className="border border-pink-300 px-4 py-2 rounded"
        >
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>

        <textarea
          name="observaciones"
          placeholder="Observaciones"
          value={form.observaciones}
          onChange={handleChange}
          className="border border-pink-300 px-4 py-2 rounded col-span-2"
        />

        <label className="col-span-2 flex items-center gap-2 text-pink-600 font-medium">
          <input
            type="checkbox"
            name="destacado"
            checked={form.destacado}
            onChange={handleChange}
          />
          Destacar en catálogo
        </label>

        <div className="col-span-2 flex gap-4 mt-2">
          <button
            onClick={modoEdicion ? handleActualizar : handleCrear}
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-2 rounded"
          >
            {modoEdicion ? 'Actualizar Categoría' : 'Registrar Categoría'}
          </button>
          {modoEdicion && (
            <button
              onClick={limpiarFormulario}
              className="bg-gray-300 hover:bg-gray-400 text-black font-semibold px-6 py-2 rounded"
            >
              Cancelar
            </button>
          )}
        </div>
      </div>

      {/* LISTADO */}
      <table className="w-full table-auto bg-white rounded shadow">
        <thead>
          <tr className="bg-pink-200 text-pink-800">
            <th className="p-2">Nombre</th>
            <th>Tipo</th>
            <th>Destacado</th>
            <th>Estado</th>
            <th>Orden</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map(c => (
            <tr key={c.id} className="text-center border-t">
              <td className="p-2">{c.nombre}</td>
              <td>{c.tipo}</td>
              <td>{c.destacado ? '✅' : '—'}</td>
              <td>{c.estado}</td>
              <td>{c.orden}</td>
              <td className="flex justify-center gap-3 py-2">
                <button
                  onClick={() => handleEditar(c)}
                  className="text-blue-600 hover:underline"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleEliminar(c.id)}
                  className="text-red-600 hover:underline"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GestionCategorias;
