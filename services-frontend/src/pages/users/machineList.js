import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReusableGridList from '../../components/ReusableGridList';
import { getMachines } from '../../services/apiService';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import AddMachine from '../admin/addMachine';
import PaymentMethodSelector from './payments';

const MachineList = () => {
  const { id } = useParams();
  const [machines, setMachines] = useState([]);
  const [filteredMachines, setFilteredMachines] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [addMachineModalOpen, setAddMachineModalOpen] = useState(false);

  const handleOpenAddMachineModal = () => setAddMachineModalOpen(true);
  const handleCloseAddMachineModal = () => setAddMachineModalOpen(false);

  const handleOpenPaymentModal = (machine) => {
    setSelectedMachine(machine);
    setModalOpen(true);
  };

  const handleClosePaymentModal = () => {
    setModalOpen(false);
    setSelectedMachine(null);
  };

  const fetchMachines = async () => {
    setLoading(true);
    try {
      const response = await getMachines(id); // Replace with your API call
      setMachines(response.data);
      setFilteredMachines(response.data);
    } catch (error) {
      console.error('Error fetching machines:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMachines();
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = machines.filter((machine) =>
      machine.name.toLowerCase().includes(query)
    );
    setFilteredMachines(filtered);
  };

  const reloadMachines = () => {
    fetchMachines(); // Reload the list after adding a new machine
  };

  return (
    <Box sx={{ padding: 2 }}>
      {/* Add Machine Button */}
      <Button onClick={handleOpenAddMachineModal} variant="text">
        Add Machine
      </Button>
      <Modal
        open={addMachineModalOpen}
        onClose={handleCloseAddMachineModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddMachine onMachineAdded={reloadMachines} id={id} />
      </Modal>

      {/* Search Bar */}
      <TextField
        label="Search by Name"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearch}
        sx={{ marginBottom: 2 }}
      />

      {/* Machine List */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <ReusableGridList
          items={filteredMachines.map((machine) => ({
            label: `${machine.name} - ${machine.status}`,
            id: machine.id,
          }))}
          onClick={(item) => handleOpenPaymentModal(item)} // Open payment modal on click
        />
      )}

      {/* Payment Modal */}
      <Modal
        open={modalOpen}
        onClose={handleClosePaymentModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ padding: 2, maxWidth: 400, margin: 'auto', marginTop: '10%' }}>
          {selectedMachine && (
            <PaymentMethodSelector id={selectedMachine.id} />
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default MachineList;
