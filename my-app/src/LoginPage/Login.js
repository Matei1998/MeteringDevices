import React, { useState } from 'react';
import InputWithIcon from '../Components/InputWithIcon/InputWithIcon';
import PasswordInput from '../Components/PasswordInput/PasswordInput';
import Button from '@mui/material/Button';
import "./Login.scss";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8080/User/login', {
                name: username,
                password: password
            });

            console.log(response.data); 
            const { message, role, userId } = response.data; // Obține userId din răspuns
            alert(message);

            localStorage.setItem('role', role);
            localStorage.setItem('userId', userId);

            // Redirecționează pe baza rolului
            if (role === 'administrator') {
                navigate('/administrator');
            } else if (role === 'user') {
                // Transmite userId către pagina utilizatorului
                navigate(`/user/${userId}`); 
            }
        } catch (error) {
            alert('Autentificare eșuată. Verifică datele introduse.');
            console.error('Error during login:', error);
        }
    };
    const handleRegister = () =>{

        navigate('/register');

    }

    return (
        <div className="login-container">
            <div className="inputLogin"> 
                <InputWithIcon 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder="Enter username"
                />
                <PasswordInput 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="button-container"> 
                    <Button 
                        variant="contained" 
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleRegister}
                    >
                        Register
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Login;
