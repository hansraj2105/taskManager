package com.taskmanagement.contoller;

import com.taskmanagement.modal.Users;
import com.taskmanagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("user")
@CrossOrigin("*")
public class UserController {
    @Autowired
    private UserService userService;
    @PostMapping("registration")
    public ResponseEntity registration(@Validated @RequestBody Users users) {
        return new ResponseEntity<>(userService.registration(users), HttpStatus.CREATED);
    }

    @PutMapping("update")
    public ResponseEntity update(@Validated @RequestBody Users users) {
        return new ResponseEntity<>(userService.update(users), HttpStatus.OK);
    }
    @DeleteMapping("delete/{id}")
    public ResponseEntity delete(@PathVariable("id") Long id) {
        return new ResponseEntity<>(userService.delete(id), HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity getById(@PathVariable("id") Long id) {
        return new ResponseEntity<>(userService.getById(id), HttpStatus.OK);
    }
    @GetMapping()
    public ResponseEntity getAllUsers() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }
    @PostMapping("login")
    public ResponseEntity registration(@RequestParam("username") String username,@RequestParam("password") String password) {
        return new ResponseEntity<>(userService.login(username,password), HttpStatus.OK);
    }
}
