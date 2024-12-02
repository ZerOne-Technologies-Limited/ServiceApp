import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, CardMedia } from '@mui/material';
import mtnlogo from '../../media/mtnlogo.jpg'
import airtellogo from '../../media/airtellogo.png'

const PaymentMethodSelector = ({ item }) => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentMade, setPaymentMade] = useState(false);

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
    setPhoneNumber('');
    setPaymentMade(false);
  };

  const handlePayment = () => {
    if (!phoneNumber) {
      alert('Please enter a valid phone number.');
      return;
    }
    // Simulate payment process
    setPaymentMade(true);
    alert(`Payment made successfully using ${selectedMethod}!`);
  };

  return (
    <Box sx={{ padding: 2, backgroundColor: 'white', maxWidth: 400, margin: '0 auto' }}>
      <Typography variant="h6" gutterBottom>
        Select Payment Method
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', marginBottom: 2 }}>
        <Card
          sx={{
            cursor: 'pointer',
            border: selectedMethod === 'Airtel' ? '4px solid green' : '1px solid gray',
          }}
          onClick={() => handleMethodSelect('Airtel')}
        >
        <CardContent >
            <CardMedia
                component="img"
                image={airtellogo}
                alt="Airtel Logo"
                sx={{ width: 100, height: 100, marginBottom: 1 }} // MUI's system props for styling
            />
            <Typography  variant="h6">Airtel</Typography>
        </CardContent>

        </Card>
        <Card
          sx={{
            cursor: 'pointer',
            border: selectedMethod === 'MTN' ? '4px solid green' : '1px solid gray',
          }}
          onClick={() => handleMethodSelect('MTN')}
        >
          <CardContent>
          <CardMedia
                component="img"
                image={mtnlogo}
                alt="MTN Logo"
                sx={{ width: 100, height: 100, marginBottom: 1 }} // MUI's system props for styling
            />
            <Typography variant="h6">MTN</Typography>
          </CardContent>
        </Card>
      </Box>
      {selectedMethod && (
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            label="Enter Phone Number"
            variant="outlined"
            fullWidth
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Box>
      )}
      {selectedMethod && (
        <Button
          
          color="primary"
          onClick={handlePayment}
          fullWidth
        >
          Make Payment
        </Button>
      )}
      {paymentMade && (
        <Typography
          variant="body1"
          color="green"
          align="center"
          sx={{ marginTop: 2 }}
        >
          Payment successful for ID: {item}
        </Typography>
      )}
    </Box>
  );
};

export default PaymentMethodSelector;
