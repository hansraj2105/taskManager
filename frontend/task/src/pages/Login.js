import React, {useEffect, useState} from 'react';
import axios from "axios";
import '../components/Shared/Login.css';
import {useNavigate} from "react-router-dom";  // Import custom CSS

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        axios
            .post('user/login?username=' + username + "&password=" + password)
            .then((response) => {
                localStorage.setItem("data", JSON.stringify(response.data));
                window.location.reload();
            })
            .catch((error) => {
                console.error('Error logging in:', error);
                alert("Invalid Username or Password. Please try again.");
            });
    };

    useEffect(()=>{
        let item = localStorage.getItem("data");
        if(item) {
           item = JSON.parse(item);
            item?.role=="ADMIN"? navigate('/home'): navigate('/manage-tasks');
        }

    },[])

    return (
        <div className="login">
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;
