import React, { useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Carrito = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  // Obtener usuario con manejo de error por si localStorage está vacío o malformado
  const usuario = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('usuario'));
    } catch {
      return null;
    }
  }, []);

  // Calcular total con useMemo
  const total = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  }, [cartItems]);

  const handleCheckout = () => {
    if (!usuario) {
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-pink-50">
      <h1 className="text-3xl font-bold text-pink-700 mb-6 text-center">🛍️ Tu carrito</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">No hay productos en el carrito.</p>
      ) : (
        <>
          <ul className="space-y-4 max-w-2xl mx-auto">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="border border-pink-200 p-4 rounded-lg bg-white shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="font-semibold text-pink-700">{item.nombre}</h2>
                    <p className="text-sm text-gray-600">Cantidad: {item.cantidad}</p>
                    <p className="text-sm text-gray-600">
                      Precio unitario: S/ {item.precio.toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-sm text-red-500 hover:underline"
                    aria-label={`Quitar ${item.nombre} del carrito`}
                  >
                    Quitar
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 max-w-2xl mx-auto text-right">
            <p className="text-xl font-bold text-pink-700">
              Total: S/ {total.toFixed(2)}
            </p>

            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={clearCart}
                className="bg-gray-300 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Vaciar carrito
              </button>

              <button
                onClick={handleCheckout}
                className="bg-pink-500 text-white px-5 py-2 rounded-lg hover:bg-pink-600 transition"
              >
                Finalizar compra
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;
