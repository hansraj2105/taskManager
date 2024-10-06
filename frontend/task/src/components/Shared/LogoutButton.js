import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear user data from local storage or context
        localStorage.removeItem('data');

        // Redirect to login page or home
        navigate('/');
    };

    return (
        <Button
            variant="contained"
            color="error"
            onClick={handleLogout}
            sx={{ marginLeft: 'auto', display: 'block',marginRight:"20px", marginTop:"20px" }} // Align to the right

        >
            Logout
        </Button>
    );
};

export default LogoutButton;
