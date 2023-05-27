import { getGuitarras } from "~/models/guitarras.server";
import { getPosts } from "~/models/posts.server";
import { useLoaderData } from "@remix-run/react";
import ListadoGuitarras from "~/components/listado-guitarras";
import stylesGuitarras from "~/styles/guitarras.css";
import stylesPost from "~/styles/blog.css";
import ListadoPosts from "~/components/listado-post";
import { getCurso } from "~/models/curso.server";
import Curso from "~/components/curso";
import stylesCurso from "~/styles/curso.css"

export function meta() {}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: stylesGuitarras,
    },
    {
      rel: "stylesheet",
      href: stylesPost,
    },
    {
      rel: "stylesheet",
      href: stylesCurso,
    }
  ];
}

export async function loader() {
  const [guitarras, posts, curso] = await Promise.all([getGuitarras(), getPosts(),getCurso()]);

  const data = {
    guitarras: guitarras.data,
    posts: posts.data,
    curso: curso.data
  };

  return data;
}

function Index() {
  const { guitarras, posts, curso } = useLoaderData();

  console.log(curso)

  return (
    <>
      <main className="contenedor">
        <ListadoGuitarras guitarras={guitarras} />
      </main>
      <Curso curso={curso.attributes} />

      <section className="contenedor">
        <ListadoPosts posts={posts} />
      </section>
    </>
  );
}

export default Index;
