package com.taskmanagement.service;

import com.taskmanagement.dto.Task;
import com.taskmanagement.exception.TaskManagementException;
import com.taskmanagement.modal.Roles;
import com.taskmanagement.modal.Tasks;
import com.taskmanagement.modal.Users;
import com.taskmanagement.repo.TaskRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    @Autowired
    private TaskRepo  taskRepo;
    @Autowired
    private ModelMapper modelMapper;
    public List<Tasks> getAllTaskList(Roles roles, Long userid) {
        switch (roles){
            case USER:
               return taskRepo.findByAssignedTOIdOrCreatedById(userid,userid);
            case ADMIN:
               return taskRepo.findAll();
            default:
                throw new TaskManagementException("Role not found");
        }
    }

    public String addTask(Task task){
        Tasks map = modelMapper.map(task, Tasks.class);
        if(task.getAssignedBy()!=null)
        map.setAssignedBy(new Users(task.getAssignedBy()));
        if(task.getAssignedTo()!=null)
        map.setAssignedTO(new Users(task.getAssignedTo()));
        if(task.getCreatedBy()!=null)
        map.setCreatedBy(new Users(task.getCreatedBy()));
       taskRepo.save(map);
       return "success";
    }

    public String update(Task task,Long id){
        Optional<Tasks> byId = taskRepo.findById(id);
        byId.ifPresentOrElse(data->{
           modelMapper.map(task, data);
           if(task.getAssignedBy()!=null)
            data.setAssignedBy(new Users(task.getAssignedBy()));
            if(task.getAssignedTo()!=null)
            data.setAssignedTO(new Users(task.getAssignedTo()));
            taskRepo.save(data);
        },()->{throw new TaskManagementException("Task not found for update");});

        return "success";
    }
    public String delete(Long id){
        if(id== null || id==0l)
            throw new TaskManagementException("TaskID not be null or zero ");
        taskRepo.deleteById(id);
        return "success";
    }

    public Tasks getById(Long id) {
        if(id== null || id==0l)
            throw new TaskManagementException("TaskID not be null or zero ");
        Optional<Tasks> byId = taskRepo.findById(id);
        if(byId.isPresent())
            return byId.get();
        else  throw new TaskManagementException("Task not found. ");
    }
}
