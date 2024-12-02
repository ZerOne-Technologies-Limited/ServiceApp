import React, { useState } from 'react';
import { createMachine } from '../../services/apiService'; // API call to create a machine
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const AddMachine = ({ id, onMachineAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    qrCodeUrl: '',
    propertyId: id, // Directly use propertyId passed as prop
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const machine = {
        name: formData.name,
        qrCodeUrl: formData.qrCodeUrl,
        propertyId: formData.propertyId,
        createdAt: new Date(),
        updatedAt: new Date(),
        };
      await createMachine(machine);
      setStatus('Machine created successfully!');
      setFormData({ name: '', qrCodeUrl: '', propertyId: '' }); // Clear form

      // Trigger the callback to reload the machines list
      if (onMachineAdded) {
        onMachineAdded();
      }
    } catch (error) {
      setStatus('Failed to create machine.');
    }
  };

  return (
    <div>
      
      <Box sx={{ padding: 2, backgroundColor: 'white', margin: 'auto', width: '300px', borderRadius: 2 }}>
      <h2>Create Machine</h2>
          <TextField
            label="Machine Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="QR Code URL"
            name="qrCodeUrl"
            value={formData.qrCodeUrl}
            onChange={handleChange}
            fullWidth
            required
            sx={{ marginBottom: 2 }}
          />
        <Button  onClick={handleSubmit}>
          ADD MACHINE
        </Button>
        </Box>
      {status && <p>{status}</p>}
    </div>
  );
};

export default AddMachine;
