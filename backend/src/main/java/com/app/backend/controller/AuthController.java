package com.app.backend.controller;

import com.app.backend.model.Cliente;
import com.app.backend.model.Usuario;
import com.app.backend.repository.ClienteRepository;
import com.app.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody Map<String, String> data) {
        Map<String, Object> response = new HashMap<>();

        String correo = data.get("email");
        if (usuarioRepository.existsByCorreo(correo)) {
            response.put("success", false);
            response.put("message", "El correo ya está registrado.");
            return response;
        }

        // Crear usuario
        Usuario usuario = new Usuario();
        usuario.setNombre(data.get("nombre"));
        usuario.setCorreo(correo);
        usuario.setContrasena(data.get("password"));
        usuarioRepository.save(usuario);

        // Crear cliente
        Cliente cliente = new Cliente();
        cliente.setNombre(data.get("nombre"));
        cliente.setApellido(data.get("apellido"));
        cliente.setEmail(correo);
        cliente.setTelefono(data.get("telefono"));
        cliente.setDireccion(data.get("direccion"));
        cliente.setDni(data.get("dni"));
        cliente.setGenero(data.get("genero"));
        if (data.get("fechaNacimiento") != null && !data.get("fechaNacimiento").isEmpty()) {
            cliente.setFechaNacimiento(LocalDate.parse(data.get("fechaNacimiento")));
        }
        cliente.setEstado("activo");
        clienteRepository.save(cliente);

        response.put("success", true);
        response.put("user", usuario);
        return response;
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> data) {
        Map<String, Object> response = new HashMap<>();

        String email = data.get("email");
        String password = data.get("password");

        Optional<Usuario> optionalUsuario = usuarioRepository.findByCorreo(email);

        if (optionalUsuario.isPresent()) {
            Usuario usuario = optionalUsuario.get();
            if (usuario.getContrasena().equals(password)) {
                response.put("success", true);
                response.put("user", usuario);
            } else {
                response.put("success", false);
                response.put("message", "Contraseña incorrecta");
            }
        } else {
            response.put("success", false);
            response.put("message", "Correo no registrado");
        }

        return response;
    }
}
