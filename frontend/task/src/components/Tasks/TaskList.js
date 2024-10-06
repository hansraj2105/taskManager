import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Typography,
} from '@mui/material';
import TaskForm from './TaskForm';
import axios from "axios";
import LogoutButton from "../Shared/LogoutButton"; // Import the TaskForm component


function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [openForm, setOpenForm] = useState(false);
    const [iseneedrefrest, iseneedrefrestSEt] = useState(false);


    useEffect(()=>{
        dataLoading();
    },[]);

    const  dataLoading = () =>{
        let item =JSON.parse(localStorage.getItem("data"))
        console.log(item);
        axios
            .get('tasks?userid='+item.id+"&role="+item.role)
            .then((response) => {
                setTasks(response.data);
            })
            .catch((error) => {
                console.error('Error logging in:', error.response.data);

                alert(JSON.stringify(error.response.data));
            });
    }
    const handleAddTask = (task) => {
        setTasks((prevTasks) => [
            ...prevTasks,
            { ...task, id: prevTasks.length + 1 },
        ]);

        setOpenForm(false);
    };

    const handleEditTask = (task) => {
        setTasks((prevTasks) =>
            prevTasks.map((t) => (t.id === task.id ? task : t))
        );
        setEditingTask(null);
        setOpenForm(false);
    };

    const handleDeleteTask = (id) => {
        axios
            .delete('tasks/'+id)
            .then((response) => {
                setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
            })
            .catch((error) => {
                console.error('Error logging in:', error.response.data);
                alert(JSON.stringify(error.response.data));
            });
    };

    return (
        <>
        <LogoutButton/>
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h5" gutterBottom>
                Task List
            </Typography>
            {!openForm &&(<Button
                variant="contained"
                color="primary"
                onClick={() => {
                    setEditingTask(null);
                    setOpenForm(!openForm);
                }}
            >
                Add Task
            </Button>)}
            { openForm && (
            <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    setEditingTask(null);
                    setOpenForm(!openForm);
                    if(iseneedrefrest){
                        iseneedrefrestSEt(false)
                        dataLoading();
                    }
                }}
            >
                Back
            </Button>
            )}
            {openForm && (
                <TaskForm
                    onSubmit={editingTask ? handleEditTask : handleAddTask}
                    initialValues={editingTask}
                    openFormDta={setOpenForm}
                    iseneedrefresh={iseneedrefrestSEt}
                    dataLoadingRefresh={dataLoading}
                    onClose={() => setOpenForm(false)}
                />
            )}

            {!openForm && (<TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Comments</TableCell>
                            <TableCell>Is Blocked</TableCell>
                            <TableCell>Assigned By</TableCell>
                            <TableCell>Assigned To</TableCell>
                            <TableCell>Priority</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Due Date</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map((task) => (
                            <TableRow key={task.id}>
                                <TableCell>{task.name}</TableCell>
                                <TableCell>{task.description}</TableCell>
                                <TableCell>{task.comments}</TableCell>
                                <TableCell>{task.isBlocked ? 'Yes' : 'No'}</TableCell>
                                <TableCell>{task.assignedBy?.name}</TableCell>
                                <TableCell>{task.assignedTO?.name}</TableCell>
                                <TableCell>{task.priority}</TableCell>
                                <TableCell>{task.status}</TableCell>
                                <TableCell>{task.dueDate}</TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() => {
                                            setEditingTask(task);
                                            setOpenForm(true);
                                        }}
                                        color="primary"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() => handleDeleteTask(task.id)}
                                        color="secondary"
                                        style={{ marginLeft: '10px' }}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>)}
        </Box>
        </>
    );
}

export default TaskList;
