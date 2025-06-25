import React, { useEffect, useMemo, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [entrega, setEntrega] = useState('delivery');
  const [metodoPago, setMetodoPago] = useState('yape');
  const [nombreCliente, setNombreCliente] = useState('');
  const [esInvitado, setEsInvitado] = useState(false);

  useEffect(() => {
    try {
      const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));
      if (usuarioGuardado) {
        setNombreCliente(usuarioGuardado.nombre || '');
        setEsInvitado(false);
      } else {
        setNombreCliente('¡Únete!');
        setEsInvitado(true);
      }
    } catch {
      setNombreCliente('¡Únete!');
      setEsInvitado(true);
    }
  }, []);

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.precio * item.cantidad, 0),
    [cartItems]
  );

  const igv = useMemo(() => subtotal * 0.18, [subtotal]);
  const envio = entrega === 'delivery' ? 5.0 : 0;
  const total = useMemo(() => subtotal + igv + envio, [subtotal, igv, envio]);

  const handleConfirmar = async () => {
    if (esInvitado) {
      alert('Por favor, inicia sesión para confirmar tu pedido.');
      navigate('/login');
      return;
    }

    const venta = {
      cliente: nombreCliente,
      tipoPago: metodoPago,
      formaEntrega: entrega,
      estado: 'pendiente',
      total,
      detalles: cartItems.map((item) => ({
        productoId: item.id,
        nombre: item.nombre,
        cantidad: item.cantidad,
        precioUnitario: item.precio
      }))
    };

    try {
      const res = await fetch('http://localhost:8080/api/ventas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(venta)
      });

      if (res.ok) {
        alert('✅ Pedido confirmado. ¡Gracias por tu compra!');
        clearCart();
        navigate('/');
      } else {
        alert('❌ Ocurrió un error al guardar el pedido.');
      }
    } catch (error) {
      console.error('Error en el servidor:', error);
      alert('⚠️ No se pudo conectar con el servidor.');
    }
  };

  return (
    <div className="px-6 py-10 max-w-4xl mx-auto bg-pink-50 min-h-screen">
      <h1 className="text-3xl font-bold text-pink-700 mb-8 text-center">🧾 Confirmar Pedido</h1>

      <div className="mb-6">
        <label className="block mb-2 font-medium text-pink-800">Nombre del cliente:</label>
        <input
          type="text"
          value={nombreCliente}
          disabled={esInvitado}
          onChange={(e) => setNombreCliente(e.target.value)}
          placeholder="Tu nombre completo"
          className="border border-pink-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-300"
        />
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-pink-700 mb-3">🧺 Resumen del carrito:</h2>
        <ul className="space-y-2">
          {cartItems.map((item) => (
            <li
              key={item.id}
              className="flex justify-between border-b border-pink-200 pb-2 text-gray-700"
            >
              <span>
                {item.nombre} x {item.cantidad}
              </span>
              <span>S/ {(item.precio * item.cantidad).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-gray-800">Subtotal: <strong>S/ {subtotal.toFixed(2)}</strong></p>
        <p className="text-gray-800">IGV (18%): <strong>S/ {igv.toFixed(2)}</strong></p>
        <p className="text-gray-800">Envío: <strong>S/ {envio.toFixed(2)}</strong></p>
        <p className="text-lg mt-2 font-bold text-pink-700">Total: S/ {total.toFixed(2)}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-pink-700">🚚 Método de entrega:</h2>
        <label className="block mt-1">
          <input
            type="radio"
            value="delivery"
            checked={entrega === 'delivery'}
            onChange={(e) => setEntrega(e.target.value)}
          />
          <span className="ml-2">Delivery</span>
        </label>
        <label className="block mt-1">
          <input
            type="radio"
            value="recojo"
            checked={entrega === 'recojo'}
            onChange={(e) => setEntrega(e.target.value)}
          />
          <span className="ml-2">Recojo en tienda</span>
        </label>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-pink-700">💳 Método de pago:</h2>
        <select
          className="border border-pink-300 rounded px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-pink-300"
          value={metodoPago}
          onChange={(e) => setMetodoPago(e.target.value)}
        >
          <option value="yape">Yape</option>
          <option value="plin">Plin</option>
          <option value="tarjeta">Tarjeta</option>
          <option value="efectivo">Efectivo</option>
        </select>
      </div>

      <button
        onClick={handleConfirmar}
        className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-lg transition w-full"
      >
        Confirmar pedido
      </button>
    </div>
  );
};

export default Checkout;
