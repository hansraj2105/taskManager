package com.taskmanagement.service;

import com.taskmanagement.exception.TaskManagementException;
import com.taskmanagement.modal.Users;
import com.taskmanagement.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

   @Autowired
   private UserRepo userRepo;
    public String  registration(Users users) {
            userRepo.save(users);
        return "success";
    }

    public String update(Users users) {

            if(users.getId()== null || users.getId()==0l)
                throw new TaskManagementException("userID not be null or zero ");
            userRepo.save(users);


        return "success";
    }

    public String delete(Long id) {

            if(id== null || id==0l)
                throw new TaskManagementException("userID not be null or zero ");
            userRepo.deleteById(id);

        return "success";
    }

    public Users getById(Long id) {

            if(id== null || id==0l)
                throw new TaskManagementException("userID not be null or zero ");
            Optional<Users> byId = userRepo.findById(id);
            if(byId.isPresent())
                return byId.get();
            else
                throw new TaskManagementException("user not found. ");

    }

    public List<Users> getAllUsers() {
        return userRepo.findAll();
    }

    public Users login(String username, String password) {

             Users users = userRepo.findByUsernameAndPassword(username, password);
             if(users==null)
                    throw new TaskManagementException("invalid username password");
             users.setPassword(null);
             return users;

    }
}
