package com.taskmanagement.testCases;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.taskmanagement.contoller.UserController;
import com.taskmanagement.modal.Roles;
import com.taskmanagement.modal.Users;
import com.taskmanagement.service.UserService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testUserRegistration() throws Exception {
        Users user = new Users(1L, "Hansraj", "hans@example.com", "password123",Roles.USER);

        Mockito.when(userService.registration(Mockito.any(Users.class))).thenReturn(user);

        mockMvc.perform(post("/user/registration")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.name").value("Hansraj"))
                .andExpect(jsonPath("$.username").value("hans@example.com"));
    }

    @Test
    public void testGetUserById() throws Exception {
        Users user = new Users(1L, "Hansraj", "hans@example.com", "password123",Roles.USER);

        Mockito.when(userService.getById(1L)).thenReturn(user);

        mockMvc.perform(get("/user/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.name").value("Hansraj"))
                .andExpect(jsonPath("$.username").value("hans@example.com"));
    }

    @Test
    public void testUpdateUser() throws Exception {
        Mockito.when(userService.update(Mockito.any(Users.class))).thenReturn("success");

        mockMvc.perform(put("/user/update")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void testDeleteUser() throws Exception {
        Mockito.when(userService.delete(1L)).thenReturn("success");

        mockMvc.perform(delete("/user/delete/1"))
                .andExpect(status().isOk())
                .andExpect(content().string("success"));
    }

    @Test
    public void testLogin() throws Exception {
        String username = "hans@example.com";
        String password = "password123";
        Users user = new Users(1L, "Hansraj", "hans@example.com", "password321", Roles.USER);

        Mockito.when(userService.login(username, password)).thenReturn(user);

        mockMvc.perform(post("/user/login")
                        .param("username", username)
                        .param("password", password))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.name").value("Hansraj"))
                .andExpect(jsonPath("$.username").value("hans@example.com"));
    }
}
