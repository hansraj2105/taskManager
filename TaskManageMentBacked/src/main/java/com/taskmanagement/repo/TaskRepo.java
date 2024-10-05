package com.taskmanagement.repo;

import com.taskmanagement.modal.Tasks;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepo extends JpaRepository<Tasks,Long> {

    List<Tasks> findByAssignedTOIdOrCreatedById(Long userid,Long createdByid);
}
