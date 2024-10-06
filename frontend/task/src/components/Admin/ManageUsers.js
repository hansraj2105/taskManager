import React, {useEffect, useState} from 'react';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Modal,
    Box,
    TextField,
    Typography, Select, MenuItem, FormControl, InputLabel,
} from '@mui/material';
import axios from "axios";
import LogoutButton from "../Shared/LogoutButton";

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

function ManageUsers() {
    const [users, setUsers] = useState([]);
    useEffect(()=>{
        getDatahandler();
    },[]);
    const getDatahandler = () => {
        axios
            .get('user')
            .then((response) => {
                console.log(response);
                setUsers(response.data);
            })
            .catch((error) => {
                console.error('Error logging in:', error);
            });

    };
    const [open, setOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState({ id: '', name: '', username: '', password: '', role: '' });
    const [isEdit, setIsEdit] = useState(false);

    // Handle Modal Open/Close
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Handle input changes for the current user being added or edited
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentUser({ ...currentUser, [name]: value });
    };

    // Add a new user
    const handleAddUser = () => {
        if(currentUser.role.length<3){
            alert("Role is mendtory");
            return;
        }
        axios
            .post('user/registration',currentUser)
            .then((response) => {
                console.log(response);
                setUsers([...users, {...response.data }]);
                handleClose();
                setCurrentUser({ id: '', name: '', username: '', password: '', role: '' });
            })
            .catch((error) => {
                console.error('Error logging in:', error.response.data);

                alert(JSON.stringify(error.response.data));
            });

    };

    // Edit an existing user
    const handleEditUser = () => {
        if(currentUser.role.length<3){
            alert("Role is mendtory");
            return;
        }
        axios
            .put('user/update',currentUser)
            .then((response) => {
                setUsers(users.map(user => (user.id === currentUser.id ? currentUser : user)));
                handleClose();
                setIsEdit(false);
                setCurrentUser({ id: '', name: '', username: '', password: '', role: '' });
            })
            .catch((error) => {
                console.error('Error logging in:', error.response.data);
                alert(JSON.stringify(error.response.data));

            });
    };

    // Delete a user
    const handleDeleteUser = (id) => {
        axios
            .delete('user/delete/'+id)
            .then((response) => {
                setUsers(users.filter(user => user.id !== id));
            })
            .catch((error) => {
                console.error('Error logging in:', error);
                alert(JSON.stringify(error.response.data));
            });
    };

    // Open the modal in edit mode
    const handleEditClick = (user) => {
        setCurrentUser(user);
        setIsEdit(true);
        handleOpen();
    };

    return (
        <>
        <LogoutButton/>
        <div style={{ padding: '30px' }}>
            <Typography variant="h4" gutterBottom>
                User Management
            </Typography>
            {/*<Box display="flex" style={{    marginRight: "38px"}} justifyContent="flex-end" mb={2}>*/}
                <Button variant="contained" color="primary" style={{marginBottom:"10px"}} onClick={handleOpen}>
                    Add User
                </Button>
            {/*</Box>*/}
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="secondary" onClick={() => handleEditClick(user)} style={{ marginRight: '10px' }}>
                                        Edit
                                    </Button>
                                    <Button variant="contained" color="error" onClick={() => handleDeleteUser(user.id)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Modal for Add/Edit User */}
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={modalStyle}>
                    <Typography variant="h6" component="h2" gutterBottom>
                        {isEdit ? 'Edit User' : 'Add User'}
                    </Typography>
                    <TextField
                        label="Name"
                        name="name"
                        fullWidth
                        margin="normal"
                        value={currentUser.name}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Username"
                        name="username"
                        fullWidth
                        margin="normal"
                        value={currentUser.username}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={currentUser.password}
                        onChange={handleChange}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Role</InputLabel>
                        <Select
                            label="Role"
                            name="role"
                            value={currentUser.role}
                            onChange={handleChange}
                        >
                            <MenuItem value="ADMIN">Admin</MenuItem>
                            <MenuItem  value="USER">User</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={isEdit ? handleEditUser : handleAddUser}
                        style={{ marginTop: '20px', width: '100%' }}
                    >
                        {isEdit ? 'Update' : 'Add'}
                    </Button>
                </Box>
            </Modal>
        </div>
            </>
    );
}

export default ManageUsers;
