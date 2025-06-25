package com.app.backend.model;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "categorias")
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String descripcion;

    @Enumerated(EnumType.STRING)
    private Tipo tipo;

    @Column(name = "imagen_url")
    private String imagenUrl;

    private Integer popularidad;

    private Boolean destacado;

    @Enumerated(EnumType.STRING)
    private Estado estado;

    @Column(name = "codigo_categoria")
    private String codigoCategoria;

    private Integer orden;

    private String observaciones;

    @Column(name = "fecha_creacion", insertable = false, updatable = false,
            columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp fechaCreacion;

    // Enums
    public enum Tipo {
        pan, pastel, galleta, otros
    }

    public enum Estado {
        activo, inactivo
    }

    // Getters y Setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public Tipo getTipo() { return tipo; }
    public void setTipo(Tipo tipo) { this.tipo = tipo; }

    public String getImagenUrl() { return imagenUrl; }
    public void setImagenUrl(String imagenUrl) { this.imagenUrl = imagenUrl; }

    public Integer getPopularidad() { return popularidad; }
    public void setPopularidad(Integer popularidad) { this.popularidad = popularidad; }

    public Boolean isDestacado() { return destacado; }
    public void setDestacado(Boolean destacado) { this.destacado = destacado; }

    public Estado getEstado() { return estado; }
    public void setEstado(Estado estado) { this.estado = estado; }

    public String getCodigoCategoria() { return codigoCategoria; }
    public void setCodigoCategoria(String codigoCategoria) { this.codigoCategoria = codigoCategoria; }

    public Integer getOrden() { return orden; }
    public void setOrden(Integer orden) { this.orden = orden; }

    public String getObservaciones() { return observaciones; }
    public void setObservaciones(String observaciones) { this.observaciones = observaciones; }

    public Timestamp getFechaCreacion() { return fechaCreacion; }
}
