import React, { useEffect, useState } from 'react';

const API_BASE = 'http://localhost:8080/api/auth';

const AsignarRol = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState('');
  const [tipoRol, setTipoRol] = useState('cliente');
  const [subrolEmpleado, setSubrolEmpleado] = useState('vendedor');
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);

  // Cargar usuarios al inicio
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const res = await fetch(`${API_BASE}/usuarios`);
        const data = await res.json();
        setUsuarios(data);
      } catch (error) {
        console.error('❌ Error al cargar usuarios:', error);
        setMensaje('Error al cargar usuarios.');
      }
    };

    fetchUsuarios();
  }, []);

  const handleAsignarRol = async (e) => {
    e.preventDefault();
    setMensaje('');
    setLoading(true);

    try {
      const usuario = usuarios.find(u => u.id === parseInt(usuarioSeleccionado));
      if (!usuario) {
        setMensaje('❌ Usuario no válido.');
        setLoading(false);
        return;
      }

      const commonData = {
        nombre: usuario.nombre,
        apellido: '',
        email: usuario.correo,
        telefono: '',
        direccion: '',
        estado: 'activo'
      };

      if (tipoRol === 'cliente') {
        const cliente = {
          ...commonData,
          dni: '',
          genero: ''
        };

        const res = await fetch(`${API_BASE}/asignar-cliente`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(cliente)
        });

        const data = await res.json();
        setMensaje(data.id ? '✅ Cliente asignado con éxito' : '❌ Error al asignar cliente.');
      }

      if (tipoRol === 'empleado') {
        const empleado = {
          ...commonData,
          usuario: usuario.correo,
          password: usuario.contraseña, // Asegúrate que este campo exista
          rol: subrolEmpleado
        };

        const res = await fetch(`${API_BASE}/asignar-empleado`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(empleado)
        });

        const data = await res.json();
        setMensaje(data.id
          ? `✅ Empleado (${subrolEmpleado}) asignado con éxito`
          : '❌ Error al asignar empleado.');
      }
    } catch (error) {
      console.error('❌ Error al asignar rol:', error);
      setMensaje('Ocurrió un error inesperado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-pink-50">
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-8 border border-pink-200">
        <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">🎯 Asignar Rol a Usuario</h2>

        {mensaje && (
          <p className="text-center text-pink-600 font-semibold mb-4">{mensaje}</p>
        )}

        <form onSubmit={handleAsignarRol} className="space-y-5">
          {/* Selección de usuario */}
          <div>
            <label className="block mb-1 text-pink-800 font-medium">Seleccionar usuario</label>
            <select
              value={usuarioSeleccionado}
              onChange={(e) => setUsuarioSeleccionado(e.target.value)}
              className="w-full border border-pink-300 px-4 py-2 rounded-lg"
              required
            >
              <option value="">-- Selecciona un usuario --</option>
              {usuarios.map(u => (
                <option key={u.id} value={u.id}>
                  {u.nombre} ({u.correo})
                </option>
              ))}
            </select>
          </div>

          {/* Tipo de rol */}
          <div>
            <label className="block mb-1 text-pink-800 font-medium">Rol</label>
            <select
              value={tipoRol}
              onChange={(e) => setTipoRol(e.target.value)}
              className="w-full border border-pink-300 px-4 py-2 rounded-lg"
            >
              <option value="cliente">Cliente</option>
              <option value="empleado">Empleado</option>
            </select>
          </div>

          {/* Subrol si es empleado */}
          {tipoRol === 'empleado' && (
            <div>
              <label className="block mb-1 text-pink-800 font-medium">Subrol del empleado</label>
              <select
                value={subrolEmpleado}
                onChange={(e) => setSubrolEmpleado(e.target.value)}
                className="w-full border border-pink-300 px-4 py-2 rounded-lg"
              >
                <option value="admin">Administrador</option>
                <option value="vendedor">Vendedor</option>
                <option value="repostero">Repostero</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-pink-500 text-white py-2 rounded-lg font-semibold transition 
              ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-pink-600'}`}
          >
            {loading ? 'Asignando...' : 'Asignar Rol'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AsignarRol;
