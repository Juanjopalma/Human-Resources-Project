package gm.app.controllers;

import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import gm.app.exception.ResourceNotFound;
import gm.app.models.RhUser;
import gm.app.service.IRhUserService;
import gm.app.utils.JWTUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("users-app")
@CrossOrigin(value = "http://localhost:5173")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private IRhUserService rhUserService;

    @Autowired
    private JWTUtil jwtUtil;


    // Look for users by Email
    @GetMapping("/users/byEmail")
    public RhUser getRhUser(@RequestParam String email) {
        return rhUserService.getUserByEmail(email);
    }

    // Register an RhUser if it isn't registered
    @PostMapping("/signIn")
    public RhUser createRhUser(@RequestBody RhUser received_rhUser) {


        // Buscar el usuario por correo electrónico
        RhUser rhUser = rhUserService.getUserByEmail(received_rhUser.getEmail());

        // verificar si el usuario está ya registrado
        if (rhUser != null) {
            throw new ResourceNotFound("There is already a user registered with this email");
        }

        // En caso de que el usuario no está registrado
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hash = argon2.hash(1, 1024, 1, received_rhUser.getPassword());
        received_rhUser.setPassword(hash);

        logger.info("User to add: " + hash);
        return rhUserService.createRhUser(received_rhUser);
    }

    // Login
    @PostMapping("/loginIn")
    public ResponseEntity<?> loginIn(@RequestBody RhUser received_rhUser) {

        String received_email = received_rhUser.getEmail();
        String received_password = received_rhUser.getPassword(); // sin hashear

        // Buscar el usuario por correo electrónico
        RhUser rhuser = rhUserService.getUserByEmail(received_email);

        // Verificar si el usuario existe
        if (rhuser == null) {
            // Usuario no existe
            logger.info("Usuario no existe");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuario no encontrado");
        }

        // Verificar la contraseña solo si el usuario existe
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        boolean verified_hash = argon2.verify(rhuser.getPassword(), received_password); // hasheada, sin hashear

        // Verificar si la contraseña es correcta
        if (!verified_hash) {
            // Contraseña incorrecta
            logger.info("Contraseña incorrecta");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Contraseña incorrecta");
        } else {
            // Contraseña válida
            String tokenJwt = jwtUtil.create(String.valueOf(rhuser.getRrhh_user_id()), rhuser.getEmail());
            logger.info("Usuario autenticado");
            Map<String, String> response = new HashMap<>();
            response.put("token", tokenJwt);
            return ResponseEntity.ok(response);
        }
    }


}

