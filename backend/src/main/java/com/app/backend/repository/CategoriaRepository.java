package com.app.backend.repository;

import com.app.backend.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    List<Categoria> findByEstado(Categoria.Estado estado);
    List<Categoria> findByTipo(Categoria.Tipo tipo);
    List<Categoria> findByDestacadoTrue();
}
