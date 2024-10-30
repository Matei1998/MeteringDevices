import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Administrator.scss";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InteractiveListDevices from '../Components/InteractiveList/InteractiveListDevices'; 
import InteractiveListUsers from '../Components/InteractiveList/InteractiveListUsers';
import UserService from '../services/UserService';
import DeviceService from '../services/DeviceService';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const Administrator = () => {

    const navigate = useNavigate();     // State pentru utilizatori
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [userRole, setUserRole] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    // State pentru device-uri
    const [deviceId, setDeviceId] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [maxHourlyEnergyConsumption, setMaxHourlyEnergyConsumption] = useState('');
    const [userIdForDevice, setUserIdForDevice] = useState('');
    const [devices, setDevices] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState(null);

    // Funcția pentru adăugare utilizator
    const handleAddUser = async () => {
        if (!userName || !userRole || !userPassword) {
            alert('Te rog completează toate câmpurile!');
            return;
        }
        const user = { name: userName, role: userRole, password: userPassword };
        try {
            await UserService.register(user);
            setUserName('');
            setUserRole('');
            setUserPassword('');
            handleShowUserList();
            alert('Utilizator înregistrat cu succes!');
        } catch (error) {
            console.error('Error adding user', error);
        }
    };

    // Funcția pentru adăugare device
    const handleAddDevice = async () => {
        if (!description || !address || !maxHourlyEnergyConsumption || !userIdForDevice) {
            alert('Te rog completează toate câmpurile!');
            return;
        }
        const device = {
            description,
            address,
            maxHourlyEnergyConsumption,
            userId: userIdForDevice
        };
        try {
            await DeviceService.add(device);
            setDescription('');
            setAddress('');
            setMaxHourlyEnergyConsumption('');
            setUserIdForDevice('');
            handleShowDeviceList();
            alert('Device înregistrat cu succes');
        } catch (error) {
            console.error('Error adding device', error);
        }
    };

    // Funcția pentru ștergere utilizator
    const handleDeleteUser = async (userId) => {
        try {
            await UserService.delete(userId);
            handleShowUserList();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    // Funcția pentru actualizare utilizator
    const handleUpdateUser = async () => {
        if (!userId || !userRole || !userPassword) {
            alert('Te rog completează toate câmpurile pentru actualizare!');
            return;
        }
        const userToUpdate = {
            id: userId,
            name: userName,
            role: userRole,
            password: userPassword
        };
        try {
            await UserService.update(userToUpdate);
            handleShowUserList();
            setUserId('');
            setUserName('');
            setUserRole('');
            setUserPassword('');
            setSelectedUser(null);
        } catch (error) {
            console.error('Error updating user: ', error);
        }
    };

    // Funcția pentru selectare utilizator
    const handleSelectUser = (user) => {
        setUserId(user.id);
        setUserName(user.name);
        setUserRole(user.role);
        setUserPassword('');
        setSelectedUser(user);
    };

    // Funcția pentru ștergere device
    const handleDeleteDevice = async (deviceId) => {
        try {
            await DeviceService.delete(deviceId);
            handleShowDeviceList();
        } catch (error) {
            console.error('Error deleting device', error);
        }
    };

    // Funcția pentru actualizare device
    const handleUpdateDevice = async () => {
        if (!description || !address || !maxHourlyEnergyConsumption || !userIdForDevice) {
            alert('Te rog completează toate câmpurile pentru actualizare!');
            return;
        }
        const deviceToUpdate = {
            id: deviceId,
            description,
            address,
            maxHourlyEnergyConsumption,
            userId: userIdForDevice
        };
        try {
            await DeviceService.update(deviceToUpdate);
            handleShowDeviceList();
            setDeviceId('');
            setDescription('');
            setAddress('');
            setMaxHourlyEnergyConsumption('');
            setUserIdForDevice('');
            setSelectedDevice(null);
        } catch (error) {
            console.error('Error updating device: ', error);
        }
    };

    // Funcția pentru selectare device
    const handleSelectDevice = (device) => {
        setDeviceId(device.id);
        setDescription(device.description);
        setAddress(device.address);
        setMaxHourlyEnergyConsumption(device.maxHourlyEnergyConsumption);
        setUserIdForDevice(device.userId);
        setSelectedDevice(device);
    };

    // Funcții pentru obținerea listei de utilizatori și device-uri
    const handleShowUserList = async () => {
        try {
            const response = await UserService.getAllUsers();
            const filteredUsers = response.filter(user => user.name && user.role);
            setUsers(filteredUsers);
        } catch (error) {
            console.error('Error fetching users', error);
        }
    };

    const handleShowDeviceList = async () => {
        try {
            const response = await DeviceService.getAllDevices();
            const filteredDevices = response.filter(device => device.description && device.address && device.maxHourlyEnergyConsumption);
            setDevices(filteredDevices);
        } catch (error) {
            console.error('Error fetching devices', error);
        }
    };

    useEffect(() => {
        handleShowUserList();
        handleShowDeviceList();
    }, []);

    const handleLogout =() =>{
        localStorage.clear();
        navigate('/');
    };

    return (
        <div className="administrator-container">
            <Button 
                variant="contained" 
                color="primary" 
                onClick={handleLogout}
                style={{ position: 'absolute', top: '20px', right: '20px' }}
            >
                Logout
            </Button>
            
            <div className="management-wrapper">
                {/* Secțiune Utilizatori */}
                <div className="management-section">
                    <h1>CRUD UTILIZATORI</h1>
                    <div className="user-management">
                        <TextField label="Nume" variant="outlined" value={userName} onChange={(e) => setUserName(e.target.value)} />
                        <Select value={userRole} onChange={(e) => setUserRole(e.target.value)} displayEmpty variant="outlined">
                            <MenuItem value="" disabled>Selectează rolul</MenuItem>
                            <MenuItem value="administrator">Administrator</MenuItem>
                            <MenuItem value="user">User</MenuItem>
                        </Select>
                        <TextField label="Parola" variant="outlined" type="password" onChange={(e) => setUserPassword(e.target.value)} />
                        <div className="buttons-container">
                            <Button variant="outlined" onClick={handleAddUser}>Adaugă Utilizator</Button>
                            <Button variant="outlined" onClick={handleUpdateUser}>Update Utilizator</Button>
                        </div>
                    </div>
                    
                    {/* Lista Utilizatori */}
                    <div className="list-container">
                        <InteractiveListUsers users={users} onDeleteUser={handleDeleteUser} onUpdateUser={handleSelectUser} />
                    </div>
                </div>

                {/* Secțiune Dispozitive */}
                <div className="management-section">
                    <h1>CRUD DISPOZITIVE</h1>
                    <div className="device-management">
                        <TextField label="Descriere" variant="outlined" value={description} onChange={(e) => setDescription(e.target.value)} />
                        <TextField label="Adresă" variant="outlined" value={address} onChange={(e) => setAddress(e.target.value)} />
                        <TextField label="Consum orar max." variant="outlined" value={maxHourlyEnergyConsumption} onChange={(e) => setMaxHourlyEnergyConsumption(e.target.value)} />
                        <TextField label="ID Utilizator" variant="outlined" value={userIdForDevice} onChange={(e) => setUserIdForDevice(e.target.value)} />
                        <div className="buttons-container">
                            <Button variant="outlined" onClick={handleAddDevice}>Adaugă Device</Button>
                            <Button variant="outlined" onClick={handleUpdateDevice}>Update Device</Button>
                        </div>
                    </div>

                    {/* Lista Dispozitive */}
                    <div className="list-container">
                        <InteractiveListDevices devices={devices} onDeleteDevice={handleDeleteDevice} onUpdateDevice={handleSelectDevice} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Administrator;