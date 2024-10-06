import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "../../pages/Login";
import TaskList from "../Tasks/TaskList";
import ManageUsers from "../Admin/ManageUsers";
import HomePage from "../Admin/HomePage";
import ProtectedRoute from "./ProtectedRoute";

function RouterCommon() {
    const userRole = JSON.parse(localStorage.getItem('data'))?.role || null;
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/manage-users" element={<ProtectedRoute  allowedRoles={['ADMIN']} userRole={userRole}><ManageUsers/></ProtectedRoute>} />
                <Route path="/manage-tasks" element={<ProtectedRoute  allowedRoles={['ADMIN','USER']} userRole={userRole} ><TaskList/></ProtectedRoute>} />
                <Route path="/home" element={< ProtectedRoute  allowedRoles={['ADMIN']} userRole={userRole} ><HomePage/></ProtectedRoute>} />
            </Routes>
        </Router>
    );
}

export default RouterCommon;
