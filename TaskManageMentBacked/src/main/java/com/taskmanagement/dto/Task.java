package com.taskmanagement.dto;

import com.taskmanagement.modal.Priority;
import com.taskmanagement.modal.Status;
import com.taskmanagement.modal.Users;
import jakarta.persistence.*;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.util.Date;

@Data
public class Task {

    @NotBlank(message = "Name is mandatory")
    private String name;
    @NotBlank(message = "Description is mandatory")
    private String description;

    private String comments;

    private Boolean isBlocked;

    private Long assignedBy;
    @NotNull(message = "Assigned tO is mandatory")
    @Min(value = 1, message = "To must be greater than zero")
    private Long assignedTO;
    private Long createdBy;
    @NotBlank(message = "Priority is mandatory")
    private Priority priority;
    @NotBlank(message = "Status is mandatory")
    private Status status;
    @NotNull(message = "Due Date is mandatory")
    private Date dueDate;
}
