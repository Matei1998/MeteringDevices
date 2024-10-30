import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputWithIcon from '../Components/InputWithIcon/InputWithIcon';
import PasswordInput from '../Components/PasswordInput/PasswordInput';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import UserService from '../services/UserService'; // Importă UserService
import "./Register.scss"; // pentru fundalul login

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (!username || !password || !role) {
            alert('Te rog completează toate câmpurile!');
            return;
        }

        try {
            const response = await UserService.register({
                name: username,
                password: password,
                role: role
            });

            alert('Utilizator creat cu succes! Redirectionare spre pagina de login');
            navigate('/'); 
        } catch (error) {
            alert('Înregistrare eșuată. Încearcă din nou.');
            console.error('Error during registration:', error);
        }
    };

    return (
        <div className="login-container"> 
            <div className="inputLogin">
                <h2>Înregistrare Utilizator Nou</h2>
                <InputWithIcon 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder="Enter username"
                />
                <PasswordInput 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Select 
                    value={role} 
                    onChange={(e) => setRole(e.target.value)} 
                    displayEmpty 
                    variant="outlined"
                    fullWidth
                >
                    <MenuItem value="" disabled>Selectează rolul</MenuItem>
                    <MenuItem value="administrator">Administrator</MenuItem>
                    <MenuItem value="user">User</MenuItem>
                </Select>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleRegister}
                    style={{ marginTop: '20px' }}
                >
                    Înregistrează
                </Button>
            </div>
        </div>
    );
}

export default Register;
