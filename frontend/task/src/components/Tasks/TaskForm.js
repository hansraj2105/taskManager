import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    FormControlLabel,
} from '@mui/material';
import axios from "axios";
import {useNavigate} from "react-router-dom";


const priorities = ['HIGH', 'MEDIUM', 'LOW'];
const statuses = ['NEW', 'PENDING', 'INPROGRESS', 'COMPLETED'];

function TaskForm({initialValues,openFormDta,iseneedrefresh,dataLoadingRefresh}) {
    const useridcurrent = JSON.parse(localStorage.getItem('data'))?.id || 0;

    const [task, setTask] = useState({
        name: '',
        description: '',
        comments: '',
        isBlocked: false,
        assignedBy: '',
        assignedTo: '',
        priority: '',
        status: '',
        dueDate: '',
        createdBy:useridcurrent
    });
const [initialAssignedUsers,setUserList]=useState([]);
    const [isedit,setIsEdit]=useState(false);

    useEffect(()=>{
          axios
            .get('user')
            .then((response) => {
                setUserList(response.data);
            })
            .catch((error) => {
                console.error('Error logging in:', error.response.data);

                alert(JSON.stringify(error.response.data));
            });

        if(initialValues!=null){
            setIsEdit(true)
            setTask({
                name: initialValues.name,
                description: initialValues.description,
                comments: initialValues.comments,
                isBlocked: initialValues.isBlocked,
                assignedBy: initialValues?.assignedBy?.id,
                assignedTo: initialValues?.assignedTO?.id,
                priority: initialValues.priority,
                status: initialValues.status,
                dueDate: initialValues.dueDate,
                createdBy:initialValues?.createdBy?.id
            })
        }else {
            setIsEdit(false)
        }
    },[]);


    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTask((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Task submitted:', task);
        if(isedit){
            axios
                .put('tasks?taskid='+initialValues.id,task)
                .then((response) => {
                    openFormDta(false)
                    dataLoadingRefresh();
                })
                .catch((error) => {
                    console.error('Error logging in:', error.response.data);

                    alert(JSON.stringify(error.response.data));
                });
        }else {
        axios
            .post('tasks',task)
            .then((response) => {
                iseneedrefresh(true)
                setTask({
                    name: '',
                    description: '',
                    comments: '',
                    isBlocked: false,
                    assignedBy: '',
                    assignedTo: '',
                    priority: '',
                    status: '',
                    dueDate: '',
                    createdBy:useridcurrent
                });

            })
            .catch((error) => {
                    console.error('Error logging in:', error.response.data);

                alert(JSON.stringify(error.response.data));
            });
        }


    };

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                <Typography variant="h5" gutterBottom>
                    Create Task
                </Typography>

                <TextField
                    label="Name"
                    name="name"
                    fullWidth
                    margin="normal"
                    value={task.name}
                    onChange={handleChange}
                    required
                />

                <TextField
                    label="Description"
                    name="description"
                    fullWidth
                    margin="normal"
                    value={task.description}
                    onChange={handleChange}
                    required
                />

                <TextField
                    label="Comments"
                    name="comments"
                    fullWidth
                    margin="normal"
                    value={task.comments}
                    onChange={handleChange}
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={task.isBlocked}
                            onChange={handleChange}
                            name="isBlocked"
                        />
                    }
                    label="Is Blocked"
                />

                <FormControl fullWidth margin="normal">
                    <InputLabel>Assigned By</InputLabel>
                    <Select
                        label="Assigned By"
                        name="assignedBy"
                        value={task.assignedBy}
                        onChange={handleChange}
                        required
                    >
                        {initialAssignedUsers.map((user) => (
                            <MenuItem key={user.id} value={user.id}>
                                {user.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <InputLabel>Assigned To</InputLabel>
                    <Select
                        label="Assigned To"
                        name="assignedTo"
                        value={task.assignedTo}
                        onChange={handleChange}
                        required
                    >
                        {initialAssignedUsers.map((user) => (
                            <MenuItem key={user.id} value={user.id}>
                                {user.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <InputLabel>Priority</InputLabel>
                    <Select
                        label="Priority"
                        name="priority"
                        value={task.priority}
                        onChange={handleChange}
                        required
                    >
                        {priorities.map((priority) => (
                            <MenuItem key={priority} value={priority}>
                                {priority}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <InputLabel>Status</InputLabel>
                    <Select
                        label="Status"
                        name="status"
                        value={task.status}
                        onChange={handleChange}
                        required
                    >
                        {statuses.map((status) => (
                            <MenuItem key={status} value={status}>
                                {status}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    label="Due Date"
                    name="dueDate"
                    type="date"
                    fullWidth
                    margin="normal"
                    value={task.dueDate}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    required
                />


                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{ marginTop: '20px' }}
                >
                    Submit Task
                </Button>
            </Box>
        </form>
    );
}

export default TaskForm;
