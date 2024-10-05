package com.taskmanagement.modal;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.Constraint;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter@Setter
@NoArgsConstructor
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Name is mandatory")
    private String name;
    @NotBlank(message = "Username is mandatory")
    @Column(unique = true)
    private String username;
    @NotBlank(message = "Password is mandatory")
    private String password;
    @NotNull(message = "Role is mandatory")
    @Enumerated(EnumType.STRING)
    private  Roles role;

    public Users(Long id){
        this.id=id;
    }

}
