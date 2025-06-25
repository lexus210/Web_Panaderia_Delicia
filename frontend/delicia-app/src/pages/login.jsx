import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setMensaje('Inicio de sesión exitoso');

        // Almacenar usuario y token (si existe)
        localStorage.setItem('usuario', JSON.stringify(data.user));

        if (data.token) {
          localStorage.setItem('token', data.token);
        }

        // Redirigir al home u otra ruta según rol
        navigate('/');
      } else {
        setMensaje(data.message || 'Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setMensaje('Error de conexión con el servidor');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <div className="max-w-md w-full bg-white border border-pink-200 rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-pink-700 mb-6">🍓 Iniciar Sesión</h2>

        {mensaje && (
          <p className="text-center mb-4 text-red-500 font-medium">{mensaje}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-pink-800 mb-1">Correo electrónico</label>
            <input
              type="email"
              required
              className="w-full border border-pink-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm text-pink-800 mb-1">Contraseña</label>
            <input
              type="password"
              required
              className="w-full border border-pink-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition"
          >
            Ingresar
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-600">
          ¿No tienes una cuenta?{' '}
          <Link to="/register" className="text-pink-600 font-medium hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
