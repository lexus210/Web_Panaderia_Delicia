import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Catalogo from '../components/catalogo/Catalogo';
import Slider from 'react-slick';

const Home = () => {
  const [destacados, setDestacados] = useState([]);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/productos');
        const data = await res.json();
        const top3 = data.slice(0, 3); // Primeros 3 productos
        setDestacados(top3);
      } catch (error) {
        console.error('Error al obtener productos destacados:', error);
      }
    };

    cargarProductos();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000
  };

  return (
    <div className="bg-[url('/jpg/fondo.jpg')] bg-cover bg-fixed bg-center min-h-screen">
      {/* HERO SECTION */}
      <header className="relative bg-[url('/assets/hero-pasteleria.jpg')] bg-cover bg-center text-white py-32 px-6">
        <div className="absolute inset-0 bg-pink-200 bg-opacity-30 backdrop-blur-sm"></div>
        <div className="relative max-w-5xl mx-auto text-center">
          <p className="text-lg mb-3 font-semibold text-pink-400 tracking-widest uppercase drop-shadow-lg">
            Sweet Bakery
          </p>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-xl tracking-wide text-white">
            Momentos Dulces, <br /> <span className="text-pink-300">Sabores Inolvidables</span>
          </h1>
          <div className="flex justify-center gap-8 mt-8">
            <a href="#productos" className="bg-gradient-to-r from-pink-400 to-pink-300 hover:from-pink-500 hover:to-pink-400 shadow-lg text-white font-bold px-8 py-4 rounded-full transition-all duration-300">
              Comprar Ahora
            </a>
            <Link to="/nosotros" className="bg-gradient-to-r from-pink-400 to-pink-300 hover:from-pink-500 hover:to-pink-400 shadow-lg text-white font-bold px-8 py-4 rounded-full transition-all duration-300">
              Conócenos
            </Link>
          </div>
        </div>
      </header>

      {/* SLIDER DE PRODUCTOS DESTACADOS */}
      <section className="py-16 px-6 bg-pink-100">
        <h2 className="text-center text-4xl font-extrabold mb-10 text-pink-600">✨ Productos Destacados ✨</h2>
        <div className="max-w-3xl mx-auto">
          {destacados.length === 0 ? (
            <p className="text-center text-gray-500">No hay productos destacados disponibles en este momento.</p>
          ) : (
            <Slider {...sliderSettings}>
              {destacados.map((producto) => (
                <div key={producto.id} className="bg-white rounded-lg shadow-lg p-6 text-center">
                  <img
                    src={producto.imagenUrl || '/img/default.jpg'}
                    alt={producto.nombre}
                    onError={(e) => { e.target.src = '/img/default.jpg'; }}
                    className="mx-auto h-60 w-full object-cover rounded mb-4"
                  />
                  <h3 className="text-2xl font-bold text-pink-600 mb-2">{producto.nombre}</h3>
                  <p className="text-gray-600 mb-2">{producto.descripcion}</p>
                  <span className="text-lg font-bold text-pink-500">S/ {parseFloat(producto.precio).toFixed(2)}</span>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </section>

      {/* PROMOCIÓN */}
      <section className="py-20 px-6 bg-gradient-to-r from-pink-100 via-pink-50 to-pink-100 text-center rounded-tl-3xl rounded-br-3xl shadow-xl max-w-4xl mx-auto mt-20">
        <h3 className="text-4xl font-extrabold text-pink-600 mb-6 tracking-wide drop-shadow-sm">
          20% de Descuento en tu Primer Pedido
        </h3>
        <p className="text-gray-700 text-lg mb-8 max-w-xl mx-auto">
          Suscríbete y recibe un dulce regalo de bienvenida. ¡Disfruta nuestros sabores únicos!
        </p>
        <button className="bg-pink-400 hover:bg-pink-500 text-white px-10 py-4 rounded-full font-bold shadow-md transition-all duration-300 hover:scale-105">
          Más Información
        </button>
      </section>
    </div>
  );
};

export default Home;
