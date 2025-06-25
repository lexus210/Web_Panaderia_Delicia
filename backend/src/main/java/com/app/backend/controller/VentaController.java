package com.app.backend.controller;

import com.app.backend.model.Venta;
import com.app.backend.service.VentaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ventas")
@CrossOrigin(origins = "http://localhost:5173")
public class VentaController {

    @Autowired
    private VentaService ventaService;

    @PostMapping
    public Venta registrar(@RequestBody Venta venta) {
        return ventaService.guardarVenta(venta);
    }

    @GetMapping("/cliente/{nombre}")
    public List<Venta> obtenerPorCliente(@PathVariable String nombre) {
        return ventaService.obtenerVentasPorCliente(nombre);
    }
}
