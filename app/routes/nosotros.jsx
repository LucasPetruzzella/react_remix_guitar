import imagen from '../../public/img/nosotros.jpg'
import styleNosotros from '~/styles/nosotros.css'

export function meta() {
    return [
        { charset: "utf-8" },
        { title: "Nosotros" },
        { description: "Venta de Guirras, blog sobre música" },
        { viewport: "width=device-width,initial-scale=1" },
      ];
}

export function links() {
    return [
      {
        rel: "stylesheet",
        href: styleNosotros,
      },{
        rel: "preload",
        href: imagen,
        as: 'image'
      },
    ];
  }

function Nosotros() {
  return (
    <main className="contenedor nosotros">
        <h2 className="heading">Nosotros</h2>

        <div className='contenido'>
            <img src={imagen} alt="imagen nosotros" />

            <div>
            Cras vel interdum tellus. Aliquam ullamcorper gravida ornare. Curabitur eget luctus nibh. Suspendisse gravida arcu in augue viverra tempus. Integer magna urna, accumsan eget interdum sit amet, luctus et nibh. Phasellus malesuada augue sed risus varius sagittis. Donec convallis dolor eget pharetra eleifend. Aliquam sollicitudin pretium odio, eget lobortis orci auctor a. Nulla luctus ex et nisi accumsan bibendum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
        </div>
    </main>
  )
}
export default Nosotros