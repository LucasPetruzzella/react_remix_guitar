import styles from "~/styles/carrito.css";
import { useOutletContext } from "@remix-run/react";
import { useEffect, useState } from "react";
import { ClientOnly } from "remix-utils";

export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
}

export function meta() {
  return [
    { title: "GuitarLA - Carrito de Compras" },
    { description: "Carrito de compras de guitarras" },
  ];
}

function Carrito() {
  const [precioTotal, setPrecioTotal] = useState(0);
  const { carrito, actualizarCantidad, eliminarCarrito } = useOutletContext();

  useEffect(() => {
    const subTotalCarrito = carrito.reduce((total, producto) => {
      return total + producto.cantidad * producto.precio;
    }, 0);

    setPrecioTotal(subTotalCarrito);
  }, [carrito]);

  const handleOnChange = (cantidad, guitarra) => {
    guitarra.cantidad = cantidad;
    actualizarCantidad(guitarra);
  };

  return (
    <ClientOnly fallback={"cargando..."}>
      {() => (
        <main className="contenedor">
          <h1 className="heading">Carrito de Compras</h1>
          <div className="contenido">
            <div className="carrito">
              <h2>Articulos</h2>

              {carrito?.length === 0
                ? "Sin Productos"
                : carrito?.map((producto) => (
                    <div key={producto.id} className="producto">
                      <div>
                        <img
                          src={producto.imagen}
                          alt={`imagen producto ${producto.nombre}`}
                        />
                      </div>
                      <div>
                        <p className="nombre">{producto.nombre}</p>
                        <p className="cantidad">Cantidad</p>
                        <select
                          id="cantidad"
                          className="select"
                          value={producto.cantidad}
                          onChange={(e) =>
                            handleOnChange(+e.target.value, producto)
                          }
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                        <p className="precio">${producto.precio}</p>
                        <p className="subtotal">
                          Subtotal: $ {""}
                          <span>{producto.cantidad * producto.precio}</span>
                        </p>
                      </div>

                      <button
                        type="button"
                        className="btn_eliminar"
                        onClick={() => {
                          eliminarCarrito(producto);
                        }}
                      >
                        X
                      </button>
                    </div>
                  ))}
            </div>
            <aside className="resumen">
              <h3>Resumen del Pedido</h3>
              <p>Total a pagar: $ {precioTotal}</p>
            </aside>
          </div>
        </main>
      )}
    </ClientOnly>
  );
}

export default Carrito;
