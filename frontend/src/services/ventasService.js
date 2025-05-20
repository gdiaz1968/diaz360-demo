export const registrarVenta = async (formData) => {
    try {
      const res = await fetch('https://diaz360-demo.onrender.com/api/sales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.mensaje || 'Error al registrar la venta');
      }
  
      return await res.json();
    } catch (error) {
      throw new Error(error.message || 'Error en el servicio de ventas');
    }
  };
  