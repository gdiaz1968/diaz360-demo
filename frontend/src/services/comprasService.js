// frontend/src/services/comprasService.js

export const registrarCompra = async (formData) => {
  try {
    const res = await fetch('/api/purchases', { // ✅ CAMBIADO de "/api/compras" a "/api/purchases"
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.mensaje || 'Error al registrar la compra');
    }

    return await res.json(); // Devuelve la compra registrada
  } catch (error) {
    throw new Error(error.message || 'Error en el servicio de compras');
  }
};
