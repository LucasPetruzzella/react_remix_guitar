import { getGuitarra } from "~/models/guitarras.server";
import { useLoaderData, useOutletContext } from "@remix-run/react";
import styles from '~/styles/guitarras.css'
import { useState } from "react";

export async function loader({ params }) {
    const { urlGuitarra } = params;
    const guitarra = await getGuitarra(urlGuitarra);
  
    if(guitarra.data.length === 0){
        throw new Response('',{
            status: 404,
            statusText: 'Guitarra no encontrada'
        })
    }
    return guitarra;
  }

export function meta({data}){
    return [
        {title: `GuitarLA - ${data.data[0].attributes.nombre}`},
        {description: `Guitarras, venta de guitarras, guitarra ${data.data[0].attributes.nombre}`}
    ]
}

export function links(){
    return [
        {
            rel: "stylesheet",
            href: styles
        }
    ]
}



function GuitarrasUrl() {
  const [cantidad, setCantidad] = useState(0)
  const guitarra = useLoaderData();
  const { nombre, descripcion, imagen, precio } = guitarra.data[0].attributes;
  const { agregarCarrito } = useOutletContext()
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if(cantidad < 1){
      alert("Debe seleccionar una cantidad")
      return
    }

    const guitarraSeleccionada = {
      id: guitarra.data[0].id,
      imagen: imagen.data.attributes.url,
      nombre,
      precio,
      cantidad
    }

    agregarCarrito(guitarraSeleccionada)
  }

  return (
    <main className="contenedor guitarra">
      <img
        className="imagen"
        src={imagen.data.attributes.url}
        alt={`imagen ${nombre}`}
      />
      <div className="contenido">
        <h3>{nombre}</h3>
        <p className="texto">{descripcion}</p>
        <p className="precio">${precio}</p>

        <form 
        onSubmit={handleSubmit}
        className="formulario">
          <label htmlFor="cantidad">Cantidad</label>
          <select
            id="cantidad"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}>
            <option value="0">Seleccione</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          <input
            type="submit"
            value="Anañir al carrito">
          </input>
        </form>

      </div>
    </main>
  );
}

export default GuitarrasUrl;
