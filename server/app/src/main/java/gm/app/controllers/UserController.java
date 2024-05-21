package gm.app.controllers;

import gm.app.exception.ResourceNotFound;
import gm.app.models.User;
import gm.app.service.IUserService;
import gm.app.utils.JWTUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("users-app")
@CrossOrigin(value = "http://localhost:5173")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private IUserService userService;

    @Autowired
    private JWTUtil jwtUtil;

    private boolean validateToken(String token) {
        String userId = jwtUtil.getKey(token);
        return userId != null;
    }

    // get all the users
    /*
    @GetMapping("/users")
    public List<User> getUsers() {
        var users = userService.getUsers();
        users.forEach ((user -> logger.info(user.toString())));
        return users;
    }
    */

    // get all the activate users
    @GetMapping("/users")
    public List<User> getAllActivateUsers(@RequestHeader(value = "Authorization") String token) {

        if (!validateToken(token)) { return null; }

        var users = userService.getActiveUsers();
        users.forEach ((user -> logger.info(user.toString())));
        return users;
    }


    // get a specific user
    @GetMapping("/users/{id}")
    public User getUser(@PathVariable Integer id) {
        User user = userService.getUser(id);

        if (user == null) {
            throw new ResourceNotFound("User with id " + id + " not found");
        }

        return user;
    }

    // create an user
    @PostMapping("/users")
    public User createUser(@RequestBody User user) {
        logger.info("User to add: " + user.toString());
        user.setIs_deleted(false);
        return userService.createUser(user);
    }

    // edit an user
    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@RequestHeader(value = "Authorization") String token,
                                           @PathVariable Integer id, @RequestBody User receivedUser) {
        if (!validateToken(token)) { return null; }

        User user = userService.getUser(id);

        if (user == null) {
            throw new ResourceNotFound("User with id " + id + " not found");
        }

        user.setFullname(receivedUser.getFullname());
        user.setDepartment(receivedUser.getDepartment());
        user.setSalary(receivedUser.getSalary());

        userService.updateUser(user);

        return ResponseEntity.ok(user);
    }

    // delete an user
    @DeleteMapping("/users/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteUser(@RequestHeader(value = "Authorization") String token,
                                                           @PathVariable Integer id) {
        if (!validateToken(token)) { return null; }

        User user = userService.getUser(id);

        if (user == null) {
            throw new ResourceNotFound("User with id " + id + " not found");
        }

        userService.deleteUser(id);

        // Respuesta: JSON {"eliminado": "true"}
        Map<String, Boolean> respuesta = new HashMap<>(); // crea un objeto HasMap que tiene como clave Stirng y como valor Boolean
        respuesta.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(respuesta);
    }

    // desactive an user
    @PutMapping("/users/{id}/deactivate")
    public ResponseEntity<Void> deactivateUser(@RequestHeader(value = "Authorization") String token,
                                               @PathVariable Integer id) {
        System.out.println("token = " + token);
        System.out.println("id = " + id);

        if (!validateToken(token)) { return null; }

        userService.deactiveUser(id);
        return ResponseEntity.noContent().build();
    }





}
