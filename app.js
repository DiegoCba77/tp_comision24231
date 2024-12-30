// Limpiar el carrito si hay datos inválidos
function limpiarLocalStorage() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const carritoValido = carrito.filter((producto) => producto.title && producto.price);
  localStorage.setItem("carrito", JSON.stringify(carritoValido));
}
limpiarLocalStorage();

// Seleccionar el contenedor de productos
const productosContainer = document.getElementById("productos");

// Función para obtener datos de la API
async function obtenerProductos() {
  try {
    const respuesta = await fetch("https://fakestoreapi.com/products");
    const datos = await respuesta.json();
    mostrarProductosDesdeAPI(datos);
    window.productos = datos; // Guardamos los productos en una variable global
  } catch (error) {
    console.error("Error al obtener los productos:", error);
  }
}

// Función para mostrar productos de la API
function mostrarProductosDesdeAPI(productos) {
  productos.forEach((producto) => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <img src="${producto.image}" alt="${producto.title}" class="product-image">
      <h3>${producto.title}</h3>
      <p>${producto.description.substring(0, 100)}...</p>
      <p>Precio: $${producto.price}</p>
      <button class="btn-agregar" data-id="${producto.id}">Agregar al carrito</button>
    `;

    productosContainer.appendChild(card);
  });
}

// Función para agregar un producto al carrito
function agregarAlCarrito(idProducto) {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const producto = productos.find((prod) => prod.id === idProducto);

  if (!producto) {
    alert("Producto no encontrado");
    return;
  }

  // Verificar si el producto ya está en el carrito
  const productoEnCarrito = carrito.find((prod) => prod.id === idProducto);
  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    carrito.push({
      id: producto.id,
      title: producto.title,
      price: producto.price,
      image: producto.image,
      cantidad: 1,
    });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert(`Producto "${producto.title}" agregado al carrito!`);
}

// Event listener para los botones "Agregar al carrito"
productosContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-agregar")) {
    const idProducto = parseInt(event.target.dataset.id);
    agregarAlCarrito(idProducto);
  }
});

// Inicializar
obtenerProductos();
