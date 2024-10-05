package com.taskmanagement.repo;

import com.taskmanagement.modal.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<Users,Long> {

    Users  findByUsernameAndPassword(String username,String password);
}
