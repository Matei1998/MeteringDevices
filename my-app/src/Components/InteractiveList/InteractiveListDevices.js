import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const InteractiveListDevices = ({ devices = [], onDeleteDevice, onUpdateDevice }) => { 
  console.log('Device-uri primite:', devices);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h6" component="div" sx={{ mt: 2 }}>
        Lista Device-uri
      </Typography>
      <Demo>
        <List>
          {devices && devices.length > 0 ? (
            devices.map(device => (
              <ListItem key={device.id} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar>{device.description ? device.description.charAt(0) : '?'}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={device.description || "Descriere necunoscută"}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="text.secondary">
                        <strong>Adresa:</strong> {device.address || "Adresa necunoscută"}
                      </Typography>
                      <br />
                      <Typography component="span" variant="body2" color="text.secondary">
                        <strong>UserID:</strong> {device.userId || "ID necunoscut"}
                      </Typography>
                    </>
                  }
                />
                <IconButton edge="end" aria-label="edit" onClick={() => onUpdateDevice(device)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => onDeleteDevice(device.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="Nu sunt device-uri disponibile" />
            </ListItem>
          )}
        </List>
      </Demo>
    </Box>
  );
};

export default InteractiveListDevices;
