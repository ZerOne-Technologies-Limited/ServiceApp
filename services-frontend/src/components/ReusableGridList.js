import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  '&:hover': {
    cursor: 'pointer',
    backgroundColor: '#f0f0f0', // Optional hover effect
  },
}));

const ReusableGridList = ({ items, onClick, size = 4 }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {items.map((item, index) => (
          <Grid key={index} size={size}>
            <Card variant="outlined">
              <Item onClick={() => onClick(item)}>{item.label}</Item>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ReusableGridList;
