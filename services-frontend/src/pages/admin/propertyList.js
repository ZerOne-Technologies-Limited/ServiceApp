import React, { useEffect, useState } from 'react';
import ReusableGridList from '../../components/ReusableGridList'; // Import the reusable grid list
import { getProperties } from '../../services/apiService'; // Import your API function
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom'; // For navigation
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import AddProperty from '../admin/addProperty';
import Divider from '@mui/material/Divider';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const response = await getProperties(); // Replace with your API call
      setProperties(response.data);
      setFilteredProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties(); // Initial fetch
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = properties.filter(
      (property) =>
        property.name.toLowerCase().includes(query) ||
        property.address.toLowerCase().includes(query)
    );
    setFilteredProperties(filtered);
  };

  const handleItemClick = (item) => {
    navigate(`property/${item.id}`); // Navigate to the item's link
  };

  // Callback to reload properties after a new one is added
  const reloadProperties = () => {
    fetchProperties(); // Reload the list from the database
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Button onClick={handleOpen} variant="text">Add Property</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddProperty onPropertyAdded={reloadProperties} onClose={handleClose} />
      </Modal>

      <Divider></Divider>

      <TextField
        label="Search by Name or Address"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearch}
        sx={{ marginBottom: 2 }}
      />

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <ReusableGridList
          items={filteredProperties.map((property) => ({
            label: `${property.name} - ${property.address}`,
            id: property.id, // Include the id for navigation
          }))}
          onClick={(item) => handleItemClick(item)} // Pass the click handler
        />
      )}
    </Box>
  );
};

export default PropertyList;
