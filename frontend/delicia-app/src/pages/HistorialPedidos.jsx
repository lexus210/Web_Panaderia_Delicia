import React, { useEffect, useState } from 'react';

const GestionProductos = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoriaId: '',
    stock: '',
    imagenUrl: '',
    peso: '',
    tiempoPreparacion: '',
    estado: 'activo',
    codigoProducto: ''
  });

  useEffect(() => {
    recargarDatos();
  }, []);

  const recargarDatos = async () => {
    try {
      const [resProductos, resCategorias] = await Promise.all([
        fetch('http://localhost:8080/api/productos'),
        fetch('http://localhost:8080/api/categorias')
      ]);
      const dataProductos = await resProductos.json();
      const dataCategorias = await resCategorias.json();
      setProductos(dataProductos);
      setCategorias(dataCategorias);
    } catch (err) {
      console.error('Error al cargar datos:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const limpiarFormulario = () => {
    setForm({
      nombre: '',
      descripcion: '',
      precio: '',
      categoriaId: '',
      stock: '',
      imagenUrl: '',
      peso: '',
      tiempoPreparacion: '',
      estado: 'activo',
      codigoProducto: ''
    });
    setModoEdicion(false);
    setIdEditar(null);
  };

  const construirPayload = () => {
    return {
      ...form,
      precio: parseFloat(form.precio) || 0,
      stock: parseInt(form.stock) || 0,
      peso: parseFloat(form.peso) || 0,
      tiempoPreparacion: parseInt(form.tiempoPreparacion) || 0,
      categoria: { id: parseInt(form.categoriaId) || null }
    };
  };

  const handleCrear = async () => {
    if (!form.nombre.trim() || !form.precio || !form.categoriaId) {
      alert('Por favor, completa al menos nombre, precio y categoría.');
      return;
    }

    try {
      const res = await fetch('http://localhost:8080/api/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(construirPayload())
      });

      if (res.ok) {
        alert('Producto registrado correctamente');
        limpiarFormulario();
        recargarDatos();
      }
    } catch (err) {
      console.error('Error al crear producto:', err);
    }
  };

  const handleActualizar = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/productos/${idEditar}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(construirPayload())
      });

      if (res.ok) {
        alert('Producto actualizado correctamente');
        limpiarFormulario();
        recargarDatos();
      }
    } catch (err) {
      console.error('Error al actualizar producto:', err);
    }
  };

  const handleEditar = (producto) => {
    setForm({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      categoriaId: producto.categoria?.id || '',
      stock: producto.stock,
      imagenUrl: producto.imagenUrl,
      peso: producto.peso,
      tiempoPreparacion: producto.tiempoPreparacion,
      estado: producto.estado,
      codigoProducto: producto.codigoProducto
    });
    setModoEdicion(true);
    setIdEditar(producto.id);
  };

  const handleEliminar = async (id) => {
    const confirmar = window.confirm('¿Seguro que deseas eliminar este producto?');
    if (!confirmar) return;

    try {
      await fetch(`http://localhost:8080/api/productos/${id}`, { method: 'DELETE' });
      alert('Producto eliminado correctamente');
      recargarDatos();
    } catch (err) {
      console.error('Error al eliminar producto:', err);
    }
  };

  // Ordenar por nombre (opcional)
  const productosOrdenados = [...productos].sort((a, b) => a.nombre.localeCompare(b.nombre));

  return (
    <div className="p-10 bg-pink-50 min-h-screen">
      <h1 className="text-3xl font-bold text-pink-700 mb-6">🛠️ Gestión de Productos</h1>

      <form onSubmit={(e) => {
        e.preventDefault();
        modoEdicion ? handleActualizar() : handleCrear();
      }} className="grid grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow mb-10">
        <input type="text" name="nombre" placeholder="Nombre *" value={form.nombre} onChange={handleChange}
          className="border border-pink-300 px-4 py-2 rounded" required />
        <input type="text" name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange}
          className="border border-pink-300 px-4 py-2 rounded" />
        <input type="number" name="precio" placeholder="Precio *" value={form.precio} onChange={handleChange}
          className="border border-pink-300 px-4 py-2 rounded" required />
        <select name="categoriaId" value={form.categoriaId} onChange={handleChange}
          className="border border-pink-300 px-4 py-2 rounded" required>
          <option value="">Seleccionar categoría *</option>
          {categorias.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.nombre}</option>
          ))}
        </select>
        <input type="number" name="stock" placeholder="Stock" value={form.stock} onChange={handleChange}
          className="border border-pink-300 px-4 py-2 rounded" />
        <input type="text" name="imagenUrl" placeholder="URL de imagen" value={form.imagenUrl} onChange={handleChange}
          className="border border-pink-300 px-4 py-2 rounded" />
        <input type="number" name="peso" placeholder="Peso (kg)" value={form.peso} onChange={handleChange}
          className="border border-pink-300 px-4 py-2 rounded" />
        <input type="number" name="tiempoPreparacion" placeholder="Tiempo preparación (min)" value={form.tiempoPreparacion} onChange={handleChange}
          className="border border-pink-300 px-4 py-2 rounded" />
        <select name="estado" value={form.estado} onChange={handleChange}
          className="border border-pink-300 px-4 py-2 rounded">
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
        <input type="text" name="codigoProducto" placeholder="Código del producto" value={form.codigoProducto} onChange={handleChange}
          className="border border-pink-300 px-4 py-2 rounded" />

        {form.imagenUrl && (
          <div className="col-span-2">
            <img src={form.imagenUrl} alt="Vista previa" className="h-32 object-contain mx-auto rounded shadow" />
          </div>
        )}

        <div className="col-span-2 flex gap-4 mt-2">
          <button type="submit"
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-2 rounded">
            {modoEdicion ? 'Actualizar Producto' : 'Agregar Producto'}
          </button>
          {modoEdicion && (
            <button type="button" onClick={limpiarFormulario}
              className="bg-gray-300 hover:bg-gray-400 text-black font-semibold px-6 py-2 rounded">
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* LISTADO */}
      <table className="w-full table-auto bg-white rounded shadow">
        <thead>
          <tr className="bg-pink-200 text-pink-800">
            <th className="p-2">Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Estado</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productosOrdenados.map(p => (
            <tr key={p.id} className="text-center border-t">
              <td className="p-2">{p.nombre}</td>
              <td>S/ {parseFloat(p.precio).toFixed(2)}</td>
              <td>{p.stock}</td>
              <td>{p.estado}</td>
              <td>{p.categoria?.nombre || '-'}</td>
              <td className="flex justify-center gap-3 py-2">
                <button onClick={() => handleEditar(p)} className="text-blue-600 hover:underline">Editar</button>
                <button onClick={() => handleEliminar(p.id)} className="text-red-600 hover:underline">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GestionProductos;
