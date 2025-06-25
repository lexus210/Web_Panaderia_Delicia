const API_URL = 'http://localhost:8080/api/ordenes';

export const crearOrden = async (orden) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orden),
  });
  return res.json();
};

export const obtenerOrdenesPorUsuario = async (userId) => {
  const res = await fetch(`${API_URL}/usuario/${userId}`);
  return res.json();
};
