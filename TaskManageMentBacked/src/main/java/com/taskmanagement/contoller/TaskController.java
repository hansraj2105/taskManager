package com.taskmanagement.contoller;

import com.taskmanagement.dto.Task;
import com.taskmanagement.modal.Roles;
import com.taskmanagement.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("tasks")
@CrossOrigin("*")
public class TaskController {
    @Autowired
    private TaskService taskService;
    @GetMapping
    public ResponseEntity<?> findAll(@RequestParam("role")Roles roles,@RequestParam(value = "userid",required = false)Long userid){
        return new ResponseEntity<>(taskService.getAllTaskList(roles,userid), HttpStatus.OK);
    }
    @GetMapping("/{taskid}")
    public ResponseEntity<?> getById(@PathVariable("taskid") Long id){
        return new ResponseEntity<>(taskService.getById(id), HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<?> create(@Validated @RequestBody Task task){
        return new ResponseEntity<>(taskService.addTask(task), HttpStatus.CREATED);
    }
    @PutMapping
    public ResponseEntity<?> update(@Validated @RequestBody Task task,@RequestParam("taskid") Long id){
        return new ResponseEntity<>(taskService.update(task,id), HttpStatus.OK);
    }
    @DeleteMapping("/{taskid}")
    public ResponseEntity<?> delete(@PathVariable("taskid") Long id){
        return new ResponseEntity<>(taskService.delete(id), HttpStatus.OK);
    }

}
