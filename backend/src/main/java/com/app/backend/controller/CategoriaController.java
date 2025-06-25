package com.app.backend.controller;

import com.app.backend.model.Categoria;
import com.app.backend.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categorias")
@CrossOrigin(origins = "http://localhost:5173")
public class CategoriaController {

    @Autowired
    private CategoriaRepository categoriaRepository;

    @GetMapping
    public List<Categoria> listar() {
        return categoriaRepository.findAll();
    }

    @PostMapping
    public Categoria crear(@RequestBody Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    @PutMapping("/{id}")
    public Categoria actualizar(@PathVariable Long id, @RequestBody Categoria nuevaCategoria) {
        return categoriaRepository.findById(id).map(categoria -> {
            categoria.setNombre(nuevaCategoria.getNombre());
            categoria.setDescripcion(nuevaCategoria.getDescripcion());
            categoria.setTipo(nuevaCategoria.getTipo());
            categoria.setImagenUrl(nuevaCategoria.getImagenUrl());
            categoria.setPopularidad(nuevaCategoria.getPopularidad());
            categoria.setDestacado(nuevaCategoria.isDestacado());
            categoria.setEstado(nuevaCategoria.getEstado());
            categoria.setCodigoCategoria(nuevaCategoria.getCodigoCategoria());
            categoria.setOrden(nuevaCategoria.getOrden());
            categoria.setObservaciones(nuevaCategoria.getObservaciones());
            return categoriaRepository.save(categoria);
        }).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        categoriaRepository.deleteById(id);
    }
}