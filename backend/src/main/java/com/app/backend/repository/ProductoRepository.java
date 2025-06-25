package com.app.backend.repository;

import com.app.backend.model.Producto;
import com.app.backend.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
    List<Producto> findByCategoria(Categoria categoria);
    List<Producto> findByEstado(String estado);
    List<Producto> findByNombreContainingIgnoreCase(String nombre);
}
