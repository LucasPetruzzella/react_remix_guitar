import { useLoaderData } from "@remix-run/react";
import { getGuitarras } from "~/models/guitarras.server";
import Guitarra from "~/components/guitarra";
import cssGuitarras from "~/styles/guitarras.css"
import ListadoGuitarras from "~/components/listado-guitarras";

export function meta(){
  return [
    {title: "Tienda de Guitarras"},
    {description: "Nuestra tienda de guitarras"}
  ]
}

export function links(){
  return [
    {
      rel: "stylesheet",
      href: cssGuitarras
    }
  ]
}

export async function loader() {
  const guitarras = await getGuitarras();

  return guitarras.data;
}

function Tienda() {
  const guitarras = useLoaderData();

  return (
    <main className="contenedor">
      <ListadoGuitarras guitarras={guitarras} />
    </main>
  );
}

export default Tienda;
