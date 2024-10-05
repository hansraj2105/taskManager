package com.taskmanagement.modal;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;

@Getter
@Setter
@Entity
public class Tasks {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String comments;

    private Boolean isBlocked;

    @ManyToOne
    private Users assignedBy;
    @ManyToOne
    private Users assignedTO;
    @ManyToOne
    private Users createdBy;

    @Enumerated(EnumType.STRING)
    private Priority priority;
    @Enumerated(EnumType.STRING)
    private  Status status;

    @Temporal(TemporalType.DATE)
    private Date dueDate;

    @CreationTimestamp
    private Date createdAt;

    @UpdateTimestamp
    private Date updateAt;
}
