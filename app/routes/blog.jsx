import { getPosts } from "~/models/posts.server"
import { useLoaderData } from "@remix-run/react"
import ListadoPosts from "~/components/listado-post"
import style from "~/styles/blog.css"

export async function loader(){
  const posts = await getPosts()

  return posts.data
}

export function meta(){
  return [
      {title: "GuitarLA - Nuestro Blog"}
  ]
}

export function links(){
  return [{
    rel: "stylesheet",
    href: style
  }]
}

function Blog() {
  const posts = useLoaderData();

  return (
    <main className="contenedor">
      <ListadoPosts posts={posts} />
      
    </main>
  )
}

export default Blog