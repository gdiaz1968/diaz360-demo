// Cambia localhost por la IP de tu máquina de desarrollo
//const API_URL = 'http://192.168.100.25:5000/api/products'; // Sustituye 192.168.100.25 por la IP de tu servidor

const API_URL = 'http://localhost:5000/api/products'; // Sustituye 192.168.100.25 por la IP de tu servidor

const obtenerTodos = async () => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) {
      throw new Error('Error al obtener productos');
    }
    return await res.json();
  } catch (error) {
    console.error('Error en obtenerTodos:', error);
    throw error;
  }
};

const crearProducto = async (producto) => {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(producto),
    });
    if (!res.ok) {
      throw new Error('Error al crear producto');
    }
    return await res.json();
  } catch (error) {
    console.error('Error en crearProducto:', error);
    throw error;
  }
};

const actualizarProducto = async (id, producto) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(producto),
    });
    if (!res.ok) {
      throw new Error('Error al actualizar producto');
    }
    return await res.json();
  } catch (error) {
    console.error('Error en actualizarProducto:', error);
    throw error;
  }
};

const eliminarProducto = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      throw new Error('Error al eliminar producto');
    }
    return await res.json();
  } catch (error) {
    console.error('Error en eliminarProducto:', error);
    throw error;
  }
};

export default {
  obtenerTodos,
  crearProducto,
  actualizarProducto,
  eliminarProducto
};
