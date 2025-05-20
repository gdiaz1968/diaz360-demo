export const registrarCompra = async (formData) => {
  try {
    const res = await fetch('https://diaz360-demo.onrender.com/api/purchases', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    // Si la respuesta no es OK (status != 200–299)
    if (!res.ok) {
      let errorData = {};
      try {
        errorData = await res.json(); // intenta parsear JSON si viene
      } catch (e) {
        // si no es JSON, no hace nada
      }
      throw new Error(errorData.mensaje || `Error ${res.status}: al registrar la compra`);
    }

    // Intenta devolver los datos si existen
    let data = {};
    try {
      data = await res.json();
    } catch (e) {
      // Si no hay JSON, devolvemos objeto vacío
    }

    return data;
  } catch (error) {
    throw new Error(error.message || 'Error en el servicio de compras');
  }
};
