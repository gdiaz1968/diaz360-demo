import React from 'react';

function ProductoLista({ productos, editarProducto, eliminarProducto }) {
  return (
    <table className="table table-bordered mt-4">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Categoría</th>
          <th>Precio Compra</th>
          <th>Precio Venta</th>
          <th>Stock</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((p, index) => (
          <tr key={p._id || `${p.nombre}-${p.categoria}-${index}`}>
            <td>{p.nombre}</td>
            <td>{p.categoria}</td>
            <td>${p.precio_compra}</td>
            <td>${p.precio_venta}</td>
            <td>{p.stock}</td>
            <td>
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => editarProducto(p)}
              >
                Editar
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => eliminarProducto(p._id)}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductoLista;
