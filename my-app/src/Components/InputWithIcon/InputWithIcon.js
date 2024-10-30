import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import "./InputWithIcon.scss";

export default function InputWithIcon({ value, onChange, placeholder }) {
  return (
    <div className="inputWithIcon">
      <Box>
        <div className="input-container">
          <AccountCircle className="icon" />
          <TextField 
            className="text-field" 
            value={value} 
            onChange={onChange} 
            placeholder={placeholder} 
            variant="standard" 
          />
        </div>
      </Box>
    </div>
  );
}
