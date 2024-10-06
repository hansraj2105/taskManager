import React from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LogoutButton from "../Shared/LogoutButton"; // Import useNavigate if you're using React Router

function HomePage() {
    const navigate = useNavigate();

    return (
        <>
            <LogoutButton/>
        <Container maxWidth="md" style={{ marginTop: "12vh" }}>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minHeight="50vh"
                sx={{ backgroundColor: '#f0f2f5', borderRadius: '10px', padding: '50px' }}
            >
                <Typography variant="h3" gutterBottom>
                    Welcome to Task Management System
                </Typography>

                <Typography variant="h6" color="textSecondary" paragraph>
                    Choose an option to manage Users or Tasks
                </Typography>

                <Box display="flex" justifyContent="center" gap={2} marginTop={4}>
                    {/* Manage User Button */}
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => navigate('/manage-users')}
                        sx={{ padding: '10px 20px' }}
                    >
                        Manage User
                    </Button>

                    {/* Manage Task Button */}
                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        onClick={() => navigate('/manage-tasks')}
                        sx={{ padding: '10px 20px' }}
                    >
                        Manage Task
                    </Button>
                </Box>
            </Box>
        </Container></>
    );
}

export default HomePage;
