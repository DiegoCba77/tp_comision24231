// Seleccionar el contenedor del carrito
const carritoContainer = document.getElementById("carrito-container");

// Función para mostrar productos del carrito
function mostrarCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carritoContainer.innerHTML = ""; // Limpiar el contenido previo

  if (carrito.length === 0) {
    carritoContainer.innerHTML = "<p>El carrito está vacío.</p>";
    return;
  }

  carrito.forEach((producto) => {
    const item = document.createElement("div");
    item.classList.add("carrito-item");

    item.innerHTML = `
      <img src="${producto.image}" alt="${producto.title}" width="100">
      <h3>${producto.title}</h3>
      <p>Precio: $${producto.price}</p>
      <p>Cantidad: ${producto.cantidad}</p>
      <button class="btn-editar" data-id="${producto.id}">Editar</button>
      <button class="btn-eliminar" data-id="${producto.id}">Eliminar</button>
    `;

    carritoContainer.appendChild(item);
  });
}

// Event listener para editar o eliminar productos
carritoContainer.addEventListener("click", (event) => {
  const idProducto = parseInt(event.target.dataset.id);
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  if (event.target.classList.contains("btn-editar")) {
    const nuevaCantidad = parseInt(prompt("Nueva cantidad:"));
    carrito = carrito.map((producto) => {
      if (producto.id === idProducto) {
        producto.cantidad = nuevaCantidad > 0 ? nuevaCantidad : 1;
      }
      return producto;
    });
  }

  if (event.target.classList.contains("btn-eliminar")) {
    carrito = carrito.filter((producto) => producto.id !== idProducto);
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
});

// Inicializar
mostrarCarrito();

