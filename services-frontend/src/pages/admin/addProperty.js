import React, { useState } from 'react';
import { createProperty } from '../../services/apiService'; // API function to add a property
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const AddProperty = ({ onPropertyAdded, onClose }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const handleAdd = async () => {
    try {
      const newProperty = { name, address }; // Replace with your property schema
      await createProperty(newProperty); // Call API to add property
      onPropertyAdded(); // Trigger reload of the properties list
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error adding property:', error);
    }
  };

  return (
    <Box sx={{ padding: 2, backgroundColor: 'white', margin: 'auto', width: '300px', borderRadius: 2 }}>
      <TextField
        label="Name"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Address"
        fullWidth
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <Button onClick={handleAdd}>
        Add Property
      </Button>
    </Box>
  );
};

export default AddProperty;
