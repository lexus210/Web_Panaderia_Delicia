import React from 'react';

const Nosotros = () => {
  return (
    <div className="bg-[url('/src/jpg/fondo2.jpg')] bg-cover bg-fixed bg-center min-h-screen text-gray-900">

      {/* Banner principal */}
      <section className="relative bg-[url('/src/assets/nosotros-banner.jpg')] bg-cover bg-center h-[500px] flex items-center justify-center rounded-b-3xl shadow-lg overflow-hidden">
        <div className="absolute inset-0 bg-pink-900 bg-opacity-50 backdrop-blur-md"></div>
        <div className="relative text-center px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-2xl mb-4">
            Sobre Nosotros
          </h1>
          <p className="mt-2 text-xl md:text-2xl text-pink-200 font-medium drop-shadow-lg">
            Pasión por la pastelería artesanal desde el corazón
          </p>
        </div>
      </section>

      {/* Historia */}
      <section className="max-w-6xl mx-auto py-20 px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg">
            <h2 className="text-4xl font-extrabold mb-6 text-pink-600 drop-shadow-sm">Nuestra Historia</h2>
            <p className="text-lg leading-relaxed mb-4 text-gray-700">
              Desde nuestros humildes comienzos, soñábamos con un lugar donde cada aroma y cada sabor
              transmitiera el amor por la repostería. Hoy, años después, seguimos creando cada pastel
              como el primer día: con pasión, dedicación y los mejores ingredientes.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              Creemos que la pastelería es un arte que conecta a las personas y crea momentos únicos.
              Cada cliente, cada historia, es parte de nuestra gran familia.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img
              src="/src/jpg/n4.jpg"
              alt="Nuestra historia"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="bg-pink-50 bg-opacity-80 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold text-pink-600 mb-14 drop-shadow-sm">Nuestros Valores</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                img: '/src/jpg/n1.jpg',
                title: 'Calidad',
                desc: 'Seleccionamos los mejores ingredientes para ofrecer productos frescos, saludables y deliciosos.'
              },
              {
                img: '/src/jpg/n2.jpg',
                title: 'Pasión',
                desc: 'Amamos lo que hacemos y transmitimos esa pasión en cada dulce que preparamos.'
              },
              {
                img: '/src/jpg/n3.jpg',
                title: 'Comunidad',
                desc: 'Somos parte de la comunidad, apoyamos el comercio local y buscamos crear espacios de encuentro.'
              }
            ].map((valor, index) => (
              <div key={index} className="p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all">
                <img src={valor.img} alt={valor.title} className="mx-auto mb-6 w-24 h-24" />
                <h3 className="text-2xl font-bold mb-4 text-pink-500">{valor.title}</h3>
                <p className="text-gray-600">{valor.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Llamado final */}
      <section className="py-20 bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 text-white text-center rounded-tl-3xl rounded-br-3xl shadow-2xl mx-6 my-20">
        <h2 className="text-4xl font-extrabold mb-6 drop-shadow-lg">¡Ven y forma parte de nuestra familia!</h2>
        <p className="text-lg mb-10 max-w-2xl mx-auto">
          Te invitamos a disfrutar de nuestros pasteles artesanales, preparados con el cariño de siempre.
        </p>
        <a
          href="/"
          className="bg-white text-pink-600 font-bold px-12 py-4 rounded-full shadow-lg hover:bg-pink-100 transition-all text-xl"
        >
          Descubre nuestros productos
        </a>
      </section>
      
    </div>
  );
};

export default Nosotros;
