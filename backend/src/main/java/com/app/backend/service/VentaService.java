package com.app.backend.service;

import com.app.backend.model.Venta;
import com.app.backend.repository.VentaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VentaService {

    @Autowired
    private VentaRepository ventaRepository;

    public Venta guardarVenta(Venta venta) {
        if (venta == null || venta.getDetalles() == null || venta.getDetalles().isEmpty()) {
            throw new IllegalArgumentException("La venta debe tener al menos un detalle.");
        }

        // Establecer la relación inversa: cada detalle debe tener asignada la venta
        venta.getDetalles().forEach(detalle -> detalle.setVenta(venta));

        return ventaRepository.save(venta);
    }

    public List<Venta> obtenerVentasPorCliente(String nombreCliente) {
        if (nombreCliente == null || nombreCliente.isBlank()) {
            throw new IllegalArgumentException("El nombre del cliente es obligatorio.");
        }
        return ventaRepository.findByCliente(nombreCliente);
    }
}
