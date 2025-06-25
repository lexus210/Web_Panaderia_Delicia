import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Productos from './pages/Productos';
import Carrito from './pages/Carrito';
import Nosotros from './pages/Nosotros';
import Checkout from './pages/Chekout';
import Login from './pages/login';
import Register from './pages/Register'; // asegúrate de importar
//
import GestionProductos from './pages/GestionProductos';
import GestionCategorias from './pages/GestionCategorias';
import AsignarRol from './pages/AsignarRol';
import HistorialPedidos from './pages/HistorialPedidos';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { CartProvider } from './context/CartContext';
 
function App() {
  return (
    <CartProvider>
      <Router>
        <div className="font-sans text-gray-900 bg-white min-h-screen flex flex-col">
          <Navbar />

          <main className="flex-grow pt-20"> {/* deja espacio para el navbar fijo */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin/productos" element={<GestionProductos />} />
              <Route path="/admin/categorias" element={<GestionCategorias />} />
              <Route path="/asignar-rol" element={<AsignarRol />} />
              <Route path="/historial" element={<HistorialPedidos />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}


export default App;
