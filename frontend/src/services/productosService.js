const API_URL = 'http://localhost:5000/api/products';


const obtenerTodos = async () => {
  const res = await fetch(API_URL);
  return await res.json();
};

const crearProducto = async (producto) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto)
  });
  return await res.json();
};

const actualizarProducto = async (id, producto) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto)
  });
  return await res.json();
};

const eliminarProducto = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  return await res.json();
};

export default {
  obtenerTodos,
  crearProducto,
  actualizarProducto,
  eliminarProducto
};
