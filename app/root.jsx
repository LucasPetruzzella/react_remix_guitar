import { useState, useEffect } from "react";
import {
  Meta,
  Links,
  Outlet,
  Scripts,
  LiveReload,
  useRouteError,
  isRouteErrorResponse,
  Link,
} from "@remix-run/react";
import styles from "~/styles/index.css";
import Header from "~/components/header";
import Footer from "~/components/footer";

export function meta({ data }) {
  return [
    { charset: "utf-8" },
    { title: "GuitarLA - Remix" },
    { viewport: "width=device-width,initial-scale=1" },
  ];
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: "https://necolas.github.io/normalize.css/8.0.1/normalize.css",
    },
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "true",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap",
    },
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
}

export default function App() {
  const carritoLS =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("carrito")) || []
      : null;
  const [carrito, setCarrito] = useState(carritoLS);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregarCarrito = (guitarra) => {
    if (carrito.some((guitarraState) => guitarraState.id === guitarra.id)) {
      const carritoFiltrado = carrito.filter((c) => c.id !== guitarra.id);
      setCarrito([...carritoFiltrado, guitarra]);
    } else {
      setCarrito([...carrito, guitarra]);
    }
  };

  const actualizarCantidad = (guitarra) => {
    const carritoActualizado = carrito.map((guitarraState) => {
      if (guitarraState.id === guitarra.id) {
        guitarraState = guitarra;
      }

      return guitarraState;
    });

    setCarrito(carritoActualizado);
  };

  const eliminarCarrito = (guitarra) => {
    const carritoFiltrado = carrito.filter((c) => c.id !== guitarra.id);
    setCarrito(carritoFiltrado);
  };

  return (
    <Document>
      <Outlet
        context={{
          agregarCarrito,
          actualizarCantidad,
          eliminarCarrito,
          carrito,
        }}
      />
    </Document>
  );
}

function Document({ children }) {
  return (
    <html lang="es">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        {children}

        <Footer />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

/** Manejo de Errores */
export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    // Error 404
    return (
      <Document>
        <h1 className="error">{error.statusText}</h1>
        <Link to="/" className="error-enlace">
          Tal vez quieras volver a la página principal
        </Link>
      </Document>
    );
  } else {
    // Errores 500
    return (
      <Document>
        <h1 className="error">{error.message}</h1>
        <Link to="/" className="error-enlace">
          Tal vez quieras volver a la página principal
        </Link>
      </Document>
    );
  }
}
