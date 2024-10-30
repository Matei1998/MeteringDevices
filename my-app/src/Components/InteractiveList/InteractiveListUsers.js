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

const InteractiveListUsers = ({ users = [], onDeleteUser, onUpdateUser }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h6" component="div" sx={{ mt: 2 }}>
        Lista Utilizatori
      </Typography>
      <Demo>
        <List>
          {users && users.length > 0 ? (
            users.map(user => (
              <ListItem key={user.id}>
                <ListItemAvatar>
                  <Avatar>{user.name ? user.name.charAt(0) : '?'}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={user.name || "Nume necunoscut"}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="text.secondary">
                      <strong> UserID:</strong> {user.id} 
                      </Typography>
                      <br />
                      <Typography component="span" variant="body2" color="text.secondary">
                      <strong>Rol:</strong> {user.role || "Rol necunoscut"}
                      </Typography>
                    </>
                  }
                />
                <IconButton edge="end" aria-label="edit" onClick={() => onUpdateUser(user)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => onDeleteUser(user.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="Nu sunt utilizatori disponibili" />
            </ListItem>
          )}
        </List>
      </Demo>
    </Box>
  );
};

export default InteractiveListUsers;
