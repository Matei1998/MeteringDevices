import React, { useState, useEffect } from 'react';
import DeviceService from '../services/DeviceService';
import { List, ListItem, ListItemText, Typography, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import "./User.scss"; // Asigură-te că importi stilurile corecte

const User = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDevices = async () => {
            if (!userId) {
                console.log("User ID is not valid.");
                setLoading(false);
                return;
            }
            console.log("Fetching devices for user ID:", userId);
            try {
                const fetchedDevices = await DeviceService.getDevicesByUserId(userId);
                console.log("Fetched devices:", fetchedDevices);
                setDevices(fetchedDevices);
            } catch (error) {
                console.error('Eroare la obținerea dispozitivelor:', error);
                setError("Eroare la obținerea dispozitivelor.");
            } finally {
                setLoading(false);
            }
        };

        fetchDevices();
    }, [userId]);

    if (loading) return <Typography variant="body1">Încărcare...</Typography>;
    if (error) return <Typography variant="body1">{error}</Typography>;

     const handleLogout = () => {
        localStorage.clear(); 
        
        navigate('/'); 
    };

    return (
        <div className="user-container">
            <Button 
                variant="contained" 
                color="primary" 
                onClick={handleLogout}
                className="back-button"
            >
                Logout
            </Button>

            <div className="device-list-container"> {/* Container pentru lista de dispozitive */}
                <h1>Dispozitivele tale</h1>
                {devices.length === 0 ? (
                    <Typography variant="body1">Nu ai niciun dispozitiv asociat.</Typography>
                ) : (
                    <List>
                        {devices.map(device => (
                            <ListItem key={device.id}>
                                <ListItemText 
                                    primary={<><strong>Descriere device:</strong>{device.description || "Descriere necunoscută"} </>} 
                                    secondary={
                                        <>
                                            <Typography component="span" variant="body2" color="text.secondary">
                                              <strong>Adresa device : </strong>  {device.address || "Adresa necunoscută"}
                                            </Typography>
                                            <br />
                                            <Typography component="span" variant="body2" color="text.secondary">
                                                <strong>Consum max. : </strong> {device.maxHourlyEnergyConsumption || "N/A"}
                                            </Typography>
                                        </>
                                    } 
                                />
                            </ListItem>
                        ))}
                    </List>
                )}
            </div>
        </div>
    );
};

export default User;
