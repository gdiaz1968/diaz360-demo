export const registrarCompra = async (formData) => {
  try {
    const res = await fetch('https://diaz360-demo.onrender.com/api/purchases', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    // 🔍 INTENTA obtener JSON, pero solo si hay cuerpo
    let data = null;
    try {
      const text = await res.text(); // primero obtenemos texto
      data = text ? JSON.parse(text) : null; // luego lo parseamos si no está vacío
    } catch (err) {
      console.warn('⚠️ No se pudo parsear JSON:', err.message);
    }

    if (!res.ok) {
      const mensaje = (data && data.mensaje) || `Error ${res.status}`;
      throw new Error(mensaje);
    }

    return data; // puede ser null si no hay contenido
  } catch (error) {
    throw new Error(error.message || 'Error inesperado al registrar la compra');
  }
};
