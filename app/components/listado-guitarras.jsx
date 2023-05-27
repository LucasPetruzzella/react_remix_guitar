import Guitarra from "./guitarra";

function ListadoGuitarras({ guitarras }) {
  return (
    <div>
      <h2 className="heading">Nuestra Colección</h2>

      {guitarras && guitarras.length && (
        <div className="guitarras-grid">
          {guitarras.map((guitarra) => (
            <Guitarra key={guitarra.id} guitarra={guitarra?.attributes} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ListadoGuitarras;
