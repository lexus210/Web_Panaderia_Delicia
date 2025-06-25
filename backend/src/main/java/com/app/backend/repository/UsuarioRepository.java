package com.app.backend.repository;

import com.app.backend.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    boolean existsByCorreo(String correo);
    Optional<Usuario> findByCorreo(String correo);
    Optional<Usuario> findByCorreoAndContrasena(String correo, String contrasena);
}
