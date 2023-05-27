export async function getPosts() {
  const respuesta = await fetch(`${process.env.API_URL}/posts?populate=imagen`);
  const resultado = await respuesta.json();

  return resultado;
}

export async function getPost(url) {
  const urlApi = `${process.env.API_URL}/posts?filters[url]=${url}&populate=imagen`;

  const respuesta = await fetch(urlApi);
  const resultado = await respuesta.json();

  return resultado;
}
