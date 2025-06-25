const API_URL = 'http://localhost:8080/api/productos';

export const obtenerProductos = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const crearProducto = async (producto) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto),
  });
  return res.json();
};

export const actualizarProducto = async (id, producto) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto),
  });
  return res.json();
};

export const eliminarProducto = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  return res.ok;
};
