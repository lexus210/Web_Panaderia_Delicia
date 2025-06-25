import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    telefono: '',
    direccion: '',
    dni: '',
    genero: '',
    fechaNacimiento: ''
  });

  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setMensaje('Registro exitoso');
        localStorage.setItem('usuario', JSON.stringify(data.user));
        navigate('/');
      } else {
        setMensaje(data.message || 'Error al registrarse');
      }
    } catch (error) {
      setMensaje('Error de conexión con el servidor');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8 border border-pink-300">
        <h2 className="text-3xl font-bold text-pink-600 text-center mb-4">
          🍰 Regístrate en Delicia Pastelería
        </h2>

        {mensaje && (
          <p className="text-center mb-4 text-red-600 font-medium">{mensaje}</p>
        )}

        <form onSubmit={handleRegister} className="space-y-3">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="w-full border border-pink-300 px-4 py-2 rounded-lg"
          />
          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
            className="w-full border border-pink-300 px-4 py-2 rounded-lg"
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-pink-300 px-4 py-2 rounded-lg"
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border border-pink-300 px-4 py-2 rounded-lg"
          />
          <input
            type="text"
            name="telefono"
            placeholder="Teléfono"
            value={formData.telefono}
            onChange={handleChange}
            className="w-full border border-pink-300 px-4 py-2 rounded-lg"
          />
          <input
            type="text"
            name="direccion"
            placeholder="Dirección"
            value={formData.direccion}
            onChange={handleChange}
            className="w-full border border-pink-300 px-4 py-2 rounded-lg"
          />
          <input
            type="text"
            name="dni"
            placeholder="DNI"
            value={formData.dni}
            onChange={handleChange}
            className="w-full border border-pink-300 px-4 py-2 rounded-lg"
          />
          <input
            type="text"
            name="genero"
            placeholder="Género"
            value={formData.genero}
            onChange={handleChange}
            className="w-full border border-pink-300 px-4 py-2 rounded-lg"
          />
          <input
            type="date"
            name="fechaNacimiento"
            placeholder="Fecha de nacimiento"
            value={formData.fechaNacimiento}
            onChange={handleChange}
            className="w-full border border-pink-300 px-4 py-2 rounded-lg"
          />

          <button
            type="submit"
            className="w-full bg-pink-500 text-white font-semibold py-2 rounded-lg hover:bg-pink-600 transition"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
