package com.app.backend.controller;

import com.app.backend.model.Producto;
import com.app.backend.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductoController {

    @Autowired
    private ProductoRepository productoRepository;

    @GetMapping
    public List<Producto> listar() {
        return productoRepository.findAll();
    }

    @PostMapping
    public Producto crear(@RequestBody Producto producto) {
        return productoRepository.save(producto);
    }

    @GetMapping("/{id}")
    public Producto obtener(@PathVariable Long id) {
        return productoRepository.findById(id).orElse(null);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        productoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Producto> actualizar(@PathVariable Long id, @RequestBody Producto nuevo) {
        return productoRepository.findById(id).map(producto -> {
            producto.setNombre(nuevo.getNombre());
            producto.setDescripcion(nuevo.getDescripcion());
            producto.setPrecio(nuevo.getPrecio());
            producto.setStock(nuevo.getStock());
            producto.setImagenUrl(nuevo.getImagenUrl());
            producto.setPeso(nuevo.getPeso());
            producto.setTiempoPreparacion(nuevo.getTiempoPreparacion());
            producto.setEstado(nuevo.getEstado());
            producto.setCodigoProducto(nuevo.getCodigoProducto());
            producto.setCategoria(nuevo.getCategoria());
            return ResponseEntity.ok(productoRepository.save(producto));
        }).orElse(ResponseEntity.notFound().build());
    }
}
