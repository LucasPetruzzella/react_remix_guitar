import { Link } from "@remix-run/react";

function Guitarra({ guitarra }) {
  const { nombre, descripcion, imagen, precio, url } = guitarra;
  const urlImagen = imagen.data.attributes.formats.medium.url

  return (
    <div className="guitarra">
        <img src={urlImagen} alt={`imagen guitarra ${nombre}`}></img>
      <div className="contenido">
        <h3>{nombre}</h3>
        <p className="descripcion"> {descripcion}</p>
        <p> ${precio}</p>

        <Link 
            to={`/guitarras/${url}`}
            className="enlace"
        >Ver producto</Link>
      </div>
    </div>
  );
}

export default Guitarra;
