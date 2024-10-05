package com.taskmanagement.exception;

public class TaskManagementException extends RuntimeException{
    public TaskManagementException(Throwable e) {
        super(e);
    }
    public TaskManagementException(String message,Throwable e) {
        super(message,e);
    }
    public TaskManagementException(String message) {
        super(message);
    }
}
